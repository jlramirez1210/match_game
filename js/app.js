//Animacion de cambio de color
function tituloBlanco(){
  $('.main-titulo').animate(
    {
      color: '#fff'
    }, 1000, function(){
      tituloAmarillo();
    });
}
function tituloAmarillo(){
  $('.main-titulo').animate(
    {
      color: '#DCFF0E'
    }, 1000, function(){
      tituloBlanco();
    });
}
//Ordenar aleatoriamente los dulces
function ordenarBloques(){
  $('div[class ^= col]').each(function(item){
    var num;
    for (var i = 0; i < 7; i++) {
      num = makeUniqueRandom();
      $('<img src="image/'+(num+1)+'.png" class="elemento" alt="img">').appendTo($(this));
    }
  });
}
var uniqueRandoms = [];
var numRandoms = 4;
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
    $('.btn-reinicio').text("Reiniciar");
  }else{
    location.href = "index.html";
  }
}
//Efecto aparecer
function aparecer(){
  $('.desaparecer').css('opacity','1.0');
}
//Efecto desaparecer
var n=1;
function desaparecer(){
  if(n>3){
    clearInterval(x);
    sumarPuntuacion();
    completar();
  }else{
    $('.desaparecer').animate(
      {
        opacity: 0.0
      }, 250, function(){
        aparecer();
    });
  }
  n++;
}
//Sumar sumar puntuacion
function sumarPuntuacion(){
  puntuacion = $('.desaparecer').length;
  $('#score-text').text(puntuacion);
}
//Comparar imagenes
function comparar(){
  for (var j = 1; j < 8; j++) {
    for (var k = 1; k < 6; k++) {
      var res1=$(".col-"+k).children("img:nth-last-child("+j+")").attr("src");
      var res2=$(".col-"+(k+1)).children("img:nth-last-child("+j+")").attr("src");
      var res3=$(".col-"+(k+2)).children("img:nth-last-child("+j+")").attr("src");
      if(res1==res2 && res1==res3 && res2==res3){
        $(".col-"+k).children("img:nth-last-child("+j+")").attr("class","desaparecer");
        $(".col-"+(k+1)).children("img:nth-last-child("+j+")").attr("class","desaparecer");
        $(".col-"+(k+2)).children("img:nth-last-child("+j+")").attr("class","desaparecer");
      }
    }
  }
}
//Rellenar espacios en blanco
function completar(){
  $('.desaparecer').each(function(){
    var num = makeUniqueRandom();
    $(this).attr('src','image/'+(num+1)+'.png');
    $('.desaparecer').attr('class','elemento');
  });
}
//Tiempo de Juego
function tiempo(){
  var newYear = new Date();
  newYear.setMinutes(newYear.getMinutes()+2);
  $('#timer').countdown({until: newYear, compact: true, format: 'MS', description: '', onExpiry: liftOff, onTick: customTimer});
  $('#timer').removeClass('is-countdown');
}
//Cuando se acaba el tiempo
function liftOff(){
  alert("termino!!!");
}
//Quitamos estilos predertinados del plugin
function customTimer(){
  $('#timer span').removeClass('countdown-row');
  $('#timer span').removeClass('countdown-amount');
}
var x;
var puntuacion=0;
$(document).ready(function(){
  tituloBlanco();
  $('.btn-reinicio').on('click', function(){
    ordenarBloques();
    comparar();
    iniciar();
    tiempo();
    x = setInterval(function(){ desaparecer(); },500);
  });
});
