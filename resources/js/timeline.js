var headerMenuHeight = 73;
if ($(window).width() < 641) {
	headerMenuHeight = 5;
};
var dropdownYearHeight = 37;
var articleBoxDateHeight= 25;
var topSpaceHeight = headerMenuHeight+dropdownYearHeight+articleBoxDateHeight;
var lazyLoadPeriod = 10;



//建中間的year menu
function yearMenu(target){
	var fragment = document.createDocumentFragment();
	var years = new Array();
	target.find("dl.clearfix").find("dt").each(function(){
		var y = $(this).text().substring(0,4);
		
		if( $.inArray( y ,years ) != -1 ){return;}
		years.push( y );
		$(fragment).append("<li>" + y + "</li>");
	});
	target.find(".year").children("ul").append(fragment);

	// 設定timeline的頂點(當滑動時保持在頂點)
	var sortYears = years.sort(function(a,b){return a-b});
	target.find(".maxYear").data("years",years);
	target.find(".maxYear").data("sortYears",sortYears);
	
	$(window).scroll(function(){
		// 僅調整目前顯示分類的時間軸
		if(target.css("display")=="none"){
			return;
		}
		var $h2 = target.find("h2");
		var $event = target.find(".event");
		var $year = target.find(".year");
		var $yearOffsetTop = [];

		var yy=target.find(".maxYear").data("years");
		var yy2=target.find(".maxYear").data("sortYears");
		
		for (var i=0; i < yy.length; i++) {
			//若尚未顯示的資料，以無限大代表其定位
			if($event.find("dt:contains('" + yy[i] + "')").closest("li:not([style$='display: none;'])").length>0){
				$yearOffsetTop[yy[i]] = $event.find("dt:contains('" + yy[i] + "')").closest("li").offset().top;
			}else{$yearOffsetTop[yy[i]] = Number.MAX_VALUE; }

		}				

		if ($(this).scrollTop()+headerMenuHeight > ($h2.offset().top + $h2.height())) {
			$year.css({
				"width": target.find(".time-content").width(),
				"position": "fixed",
				"top": headerMenuHeight,
				"z-index": 1
			});
			//下滑時，自動調整中間year menu的年份
			for (var j=0; j < yy2.length; j++) {
				//135為上方menu+年分下拉選單+日期與文章的間隔
				if ($(this).scrollTop()+topSpaceHeight+1 > $yearOffsetTop[ yy2[j] ] ) {					
					$year.find(".maxYear").text(yy2[j]);
					break;
				}
			}
		} else {
			$year.removeAttr("style");
		}
	});
};

// 依照中間year menu所選移動畫面
function yearView(target){
	target.find(".year")
		.children("div").click(function(){
			$(this).siblings().toggle().end().find(".fa").toggleClass("fa-caret-down fa-caret-up");
		})
		.end().find("li").click(function(){
			var $targetDt = target.find("dt:contains(" + $(this).text() + ")").eq(0).closest("li");
			var index = $targetDt.index()+lazyLoadPeriod;
			target.find(".event").data("target",index);
			target.find(".event").children("li:lt("+index+")").fadeIn(1000);
			
			
			$(window).scrollTop(target.find("dt:contains(" + $(this).text() + ")").closest("li").offset().top - topSpaceHeight );

			$(this).parent().hide()
				.siblings().children(".fa").toggleClass("fa-caret-down fa-caret-up");
			
			if ($(this).is(":first-child")) {
				target.find(".year").find(".maxYear").text($(this).text());
			}
		});
};


//顯示前10個，滑到底再顯示接下來的10個
function topEvents(target){
	target.find(".event").children("li:gt(9)").hide();
	var $base = 1;
	
	$(window).scroll(function(){
		if ($(this).scrollTop() > ($(document).height() - $(window).height() - (headerMenuHeight+3))) {
			var $goal = Math.round($(target.find(".event")[0]).data("target")/lazyLoadPeriod);
			if( $goal - $base > 1){
				$base = $goal+1;
			}else{
				target.find(".event").children().slice($base *lazyLoadPeriod, ($base+1)*lazyLoadPeriod).fadeIn(1000);
				$base++;
			}
		}
	});
};

// adjust width of #year dynamically
$(window).resize(function(){
	if ($(".year").attr("style") != "") {
		$(".year").width($($(".time-content")[0]).width());
	}
});

// lazyload
function lazyLoad(target){
	/** 延遲載入lazyload is not a function?
	target.find(".event").find("img").lazyload({
		effect: "fadeIn",
		threshold: -30
	});
	**/
};

// adjust height of sildebar
function adjustSildebar(){
	if ($(window).width() > 640) {
		$("#sub-nav").height($("#flip").height() - 60);
	}
	
	$(window).on("scroll resize", function(){
		if ($(window).width() > 640) {
			$("#sub-nav").height($("#flip").height() - 60);
		} else
			$("#sub-nav").removeAttr("style");
	});
};

function clearYearEvent(target){
	target.find(".year").children("ul").empty();
	target.find(".year").children("div").unbind().end().find("li").unbind();
}

