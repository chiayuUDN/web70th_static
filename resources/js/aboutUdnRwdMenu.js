function droupDownMenu(event) {
	var target = event.currentTarget;
    $(target).find(".imgDownArrow").toggleClass("rtoate180");
    $(target).find(".droupDownMenuContent").stop().slideToggle(500);
}

function toggleMediaContent(event) {
	var target = event.currentTarget;
    $(target).find(".plus").toggleClass("close-plus");
    $(target).find(".content").stop().slideToggle(500);
}

function showMore(event, taxonomyId) {
	$("#" + taxonomyId).css("height", "auto")
	$(event.currentTarget).addClass("opened");
}
