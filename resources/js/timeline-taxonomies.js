function getTaxonomies(evt, uid, startYear, finishYear, currentYear) {
	var event = evt.currentTarget == undefined ? evt.target : evt.currentTarget;

	var targetHtml = $(event).closest(".bu")[0];
	var target = $(targetHtml);
	
	target.find(".year").children("div").siblings().hide().end().find(".fa").removeClass("fa-caret-up").addClass("fa-caret-down");

	
	if(currentYear!=undefined){
		markCurrentYear(target, currentYear);
	}
	var draftUrl = ServiceUrl["taxonomiesArticlesSearchByYear"](uid,startYear,finishYear);
	target.find(".maxYear").html(finishYear);
	target.find(".rowEventDate").html(finishYear);
	
	var top = "";
	target.find(".event").empty();

	$.getJSON(draftUrl, function(data) {
		
		var articleList = data.result.taxonomyArticles.result;
		if(articleList.length>0){
			target.find(".time-period").show();
			target.find(".time-content").show();
			$.each(articleList, function() {
				var $row = $($("#template").html());
	
				var startOriDate=new Date(this.activityStartDate);
				var dateFomat = "yyyy-mm-dd";
				
				var year = startOriDate.getFullYear();
				var month = startOriDate.getMonth()+1;
				var date = startOriDate.getDate();
				
				var startDate=dateFomat.replace(/yyyy/,year).replace(/mm/,month).replace(/dd/,date);
				$row.find(".rowEventTitle").html(this.articleTitle);
				$row.find(".rowEventContent").html(this.articleAbstract);

				if(this.articleTaxonomies.length>0){
					$row.find(".rowEventUnit").html("單位："+this.articleTaxonomies[0].taxonomy.taxonomyAbbrName);
				}
				
				if(this.articleLinks.length>0){
					$row.find(".rowEventLink").children("a").attr("href",this.articleLinks[0].link.linkUrl);
					$row.find(".rowEventLink").css("display","block");
				}
				
				$row.find(".rowEventDate").html(startDate);
	
				if(this.featureImage!=undefined){
					$row.find(".rowImageUrl").attr("data-original",ServiceUrl["featureImagesSearch"](this.articleUid));
				}else{
					$row.find(".rowImageUrl").css("display","none");
					
				}
				target.find(".event").append($row);
			});
			addArticleInfo();
			clearYearEvent(target);
			yearMenu(target);
			yearView(target);
			topEvents(target);
			lazyLoad(target);
			adjustSildebar();
		}

	});
};

function setMaxYear(target, uid) {
	var draftUrl = ServiceUrl["taxonomiesArticlesSearchMaxYear"](uid);
	$.getJSON(draftUrl, function(data) {
		target.find(".maxYear").html(data.result);
	});
};

function markCurrentYear(target, currentYear){
	target.find(".codrops-demos").find("a").removeClass("current-demo");
	target.find("."+currentYear).addClass("current-demo");
}

function addArticleInfo(){
	$(".awardWinner").prepend("得獎者：");
	$(".awardWork").prepend("得獎作品：");
}