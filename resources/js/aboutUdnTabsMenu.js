
function openMobileBu(evt, taxonomyId) {
	var targetMenu = $(evt.currentTarget.closest(".udnContent")).find(".tabsMenuPc");
	var target = targetMenu.find("[taxonomyId="+taxonomyId+"]");
	target.click();
}

function openBu(evt, taxonomyUid, taxonomyId, taxonomyAbbrName, contentClass, tabClass, tabActiveClass) {
	// js呼叫   or 滑鼠點擊
	var event = evt.currentTarget == undefined ? evt.target : evt.currentTarget;
	var currentBlock = event.closest(".udnContent");
	openArticleBlock(event, taxonomyUid, taxonomyId, contentClass, tabClass, tabActiveClass, currentBlock);
	// 手機版menu
	$(currentBlock).find(".droupDownMenuInner span").first().text(taxonomyAbbrName);
}

function openSubBu(evt, taxonomyUid, taxonomyId, contentClass, tabClass, tabActiveClass) {
	// js呼叫   or 滑鼠點擊
	var event = evt.currentTarget == undefined ? evt.target : evt.currentTarget;
	var currentBlock = event.parentNode.parentNode;
	openArticleBlock(event, taxonomyUid, taxonomyId, contentClass, tabClass, tabActiveClass, currentBlock);
}

/**
 * 取文章及調整顯示tab及block(對應內容)
 * @param evt
 * @param taxonomyUid  		分類UID，用來查詢文章
 * @param taxonomyId  		分類ID，指定分類內容(文章)放的位置
 * @param contentClass		所有分類內容所放位置
 * @param tabClass			切換按鈕class
 * @param tabActiveClass	切換按鈕active的class
 * @returns
 */
function openArticleBlock(event, taxonomyUid, taxonomyId, contentClass, tabClass, tabActiveClass, currentBlock) {

	/**
	 * 內容呈現
	 */
	
	// 查文章放入指定tab內容位子
	if(taxonomyUid!=""){
		getTaxonomyArticles(taxonomyUid, taxonomyId, currentBlock);
	}
	
	// 隱藏其他tab內容
	if(contentClass!=""){
		$(currentBlock).find("."+contentClass).hide();
		$(currentBlock).find("."+contentClass).next(".openBox").removeClass("now");
	}
	// 顯示指定tab內容
	$("#"+taxonomyId).show();
	$("#"+taxonomyId).next(".openBox").addClass("now");
  
	/**
	 * 顯示目前選項
	 */
	var activeTarget = $(event);
	if(tabClass!=""){
		$(currentBlock).find("."+tabClass).removeClass(tabActiveClass);
		
		if(!activeTarget.hasClass(tabClass)){
			activeTarget = $(event).find("."+tabClass);
		}
		
		activeTarget.addClass(tabActiveClass);
	}

}

function getTaxonomyArticles(taxonomyUid, taxonomyId, currentBlock) {
	var sildeBtn = $(currentBlock).first().prev(".MediaplusSlidesBox");
	var draftUrl = ServiceUrl["taxonomiesArticlesSearch"](taxonomyUid);
	var target = $("#"+taxonomyId).find(".articleContent");	
	
	$.getJSON(draftUrl, function(data) {
		var articleList = data.result;
		if(articleList.length > 0){
			target.empty();
			// 顯示左右按鈕
			if(articleList.length > 1){
				sildeBtn.attr("targetId", taxonomyId);
				sildeBtn.attr("nowIndex", 0);
				sildeBtn.removeClass("singleArticle");
				sildeBtn.find(".prev").hide();
			} else {
				sildeBtn.addClass("singleArticle");
			}
			
			var $row = $($("#articleTemplate").html());

			$.each(articleList, function() {
				var $itemRow = $($("#articleItemTemplate").html());
				$itemRow.find(".article").html(this.articleContent);
				$itemRow.find(".description").html(this.articleAbstract);
				
				// todo : local
				var localItemRow = $itemRow.html().replaceAll('<img alt="" src="', '<img alt="" src="http://wwwlab.udngroup.com')
				$row.append(localItemRow);
			});
			target.append($row);
		}

	});
}

function openMedia(evt, taxonomyUid, taxonomyId) {
	var event = evt.currentTarget == undefined ? evt.target : evt.currentTarget;
	var currentBlock = event.parentNode;
	
	// data
	getMediaTaxonomyArticles(taxonomyUid, taxonomyId, currentBlock);
	
}

function getMediaTaxonomyArticles(taxonomyUid, taxonomyId, currentBlock) {
	var sildeBtn = $(currentBlock).prev(".MediaplusSlidesBox");
	var draftUrl = ServiceUrl["taxonomiesArticlesSearch"](taxonomyUid);
	var targetId = "media_"+taxonomyId;
	var target = $("#"+targetId);
	var mobileTarget = $("#"+targetId+"_mobile");
	
	$.getJSON(draftUrl, function(data) {
		var articleList = data.result;
		var random = Math.floor(Math.random() * articleList.length);
		if(articleList.length > 0){
			target.empty();
			// 顯示左右按鈕
			if(articleList.length > 1){
				sildeBtn.attr("targetId", targetId);
				sildeBtn.attr("nowIndex", random);
				sildeBtn.removeClass("singleArticle");
			} else {
				sildeBtn.addClass("singleArticle");
			}
			
			$.each(articleList, function() {
				// 背景
				var imageUrl = "http://wwwlab.udngroup.com/articles/" + this.articleUid + "/featureImage";
				
				var $row = $($("#mediaTemplate").html());
				$row.find(".article").css("background-image","url(" + imageUrl + ")");
				// 標題
				$row.find(".article .titleText").html(this.articleTitle);
				// 內文
				$row.find(".article .content").html(this.articleContent);

				target.append($row.html());
				
				var $mobileRow = $($("#mediaMobileTemplate").html());
				// 標題
				$mobileRow.find(".article .titleText").html(this.articleTitle);
				// 內文
				$mobileRow.find(".article .content").html(this.articleContent);
				$mobileRow.find(".article .title").css("background-image","url(" + imageUrl + ")");
				$mobileRow.find(".article .content").css("background-image","url(" + imageUrl + ")");
				
				mobileTarget.append($mobileRow.html());
			});
			target.append(target.html());
		}
		
		target.css({left: -target.children().eq(random).position().left});

	});
}
