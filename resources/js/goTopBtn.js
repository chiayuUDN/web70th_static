//Get the button
var btnGoTop = document.getElementById("btnGoTop");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    btnGoTop.style.display = "block";
  } else {
    btnGoTop.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
//  document.body.scrollTop = 0;
//  document.documentElement.scrollTop = 0;
	$('html,body').animate({ scrollTop: 0 }, 'slow');
}