$(window).scroll(function(){
	var nowScroll = $(this).scrollTop();
	var target = "";
	
	var anchors = $("a.anchor");
	anchors.each(function(){
		var tag = $(this).attr("id");
		if(nowScroll > $(this).offset().top-140){
			target = tag;
		} else {
			return false;
		}
	})
	if(target!=""){
		$("[hashTag]").removeClass("active");
		$("[hashTag=#"+target+"]").addClass("active");
	}
})

