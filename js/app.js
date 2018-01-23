//Animacion de cambio de color
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
//Ordenar aleatoriamente los dulces
function ordenarBloques(){
  $('div[class ^= col]').each(function(item){
    $(this).css('order',makeUniqueRandom());
  })
}
var uniqueRandoms = [];
var numRandoms = 49;
function makeUniqueRandom() {
  // refill the array if needed
  if (!uniqueRandoms.length) {
    for (var i = 0; i < numRandoms; i++) {
      uniqueRandoms.push(i);
    }
  }
  var index = Math.floor(Math.random() * uniqueRandoms.length);
  var val = uniqueRandoms[index];
  // now remove that value from the array
  uniqueRandoms.splice(index, 1);
  return val;
}
//boton de iniciar
function iniciar(){
  var txt = $('.btn-reinicio').text();
  if(txt=='Iniciar'){
    $('.elemento').css('visibility','visible');
    $('.btn-reinicio').text("Reiniciar");
  }else{
    location.href = "index.html";
  }
}
$(document).ready(function(){
  tituloBlanco($('.main-titulo'));
  ordenarBloques();
  $('.btn-reinicio').on('click', function(){
    iniciar();
  });
});
