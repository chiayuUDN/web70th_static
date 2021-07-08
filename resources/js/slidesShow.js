/* 文章卡片輪轉 */
function slideCards(evt, order) {
	var controlBox = evt.currentTarget.parentNode;
	var nowIndex = $(controlBox).attr("nowIndex");
	var nextIndex = parseInt(nowIndex) + order;
	var target = $(controlBox).attr("targetId");
	
	var animateTarget = $("#"+target);
	// 文章總數
	var totalCard = animateTarget.children().length / 2;
	
	// 最後一個往後
	if (nextIndex >= totalCard) {
		animateTarget.animate({left: -animateTarget.children().eq(nextIndex).position().left}, "slow", function (){
			animateTarget.css({left: 0});
		});
		nextIndex = 0;
		
	// 第一個往前	
	} else if (nextIndex < 0) {
		nextIndex = totalCard - 1;
		animateTarget.css({left: -animateTarget.children().eq(totalCard).position().left});
		animateTarget.animate({left: -animateTarget.children().eq(nextIndex).position().left}, "slow");
	} else {
		animateTarget.animate({left: -animateTarget.children().eq(nextIndex).position().left}, "slow");		
	}
	
	$(controlBox).attr("nowIndex", nextIndex);
}

function slideArticles(evt, order) {
	var controlBox = evt.currentTarget.parentNode;
	var nowIndex = $(controlBox).attr("nowIndex");
	var nextIndex = parseInt(nowIndex) + order;
	var target = $(controlBox).attr("targetId");
	
	articleSlides(controlBox, target, nextIndex);
	
	$(controlBox).attr("nowIndex", nextIndex);
}

function articleSlides(controlBox, target, n) {
	var animateTarget = $("#"+target).find(".articleContentInner").first();
	animateTarget.animate({left: -animateTarget.children().eq(n).position().left}, "slow");
	
	if(n == animateTarget.children().length -1 ){
		$(controlBox).find(".next").hide();
	} else {
		$(controlBox).find(".next").show(); 
	}
	
	if(n == 0){
		$(controlBox).find(".prev").hide();
	} else {
		$(controlBox).find(".prev").show(); 
	}
}
