function tituloBlanco(elemento){
  $('.main-titulo').animate(
    {
      color: '#fff'
    }, 1000, function(){
      tituloAmarillo(elemento);
    });
}
function tituloAmarillo(elemento){
  $('.main-titulo').animate(
    {
      color: '#DCFF0E'
    }, 1000, function(){
      tituloBlanco(elemento);
    });
}
$(document).ready(function(){
  tituloBlanco($('.main-titulo'));
});
