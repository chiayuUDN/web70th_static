//Using jQuery

// $(".hamburguer").on("click", function(){
//  $(".fullMenu").toggleClass("active");
  
//  $(".hamburguer").toggleClass("close-hamburguer");
// });
//Using Vanilla JS
document.querySelector(".hamburguer").addEventListener("click", function(){
  document.querySelector(".fullMenu").classList.toggle("active");
  document.querySelector(".hamburguer").classList.toggle("close-hamburguer");

});