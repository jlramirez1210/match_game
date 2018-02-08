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
    $("img").draggable({
      containment: "#containment-wrapper",
      scroll: false,
      grid: [120, 95],
      revert: true,
      zIndex: 10
    });
    $('img').droppable({
      drop: intercambio
    });
    $('.btn-reinicio').text("Reiniciar");
  }else{
    location.href = "index.html";
  }
}
//Intercambiar los dulces
function intercambio(event, ui){
  var drag = $(ui.draggable);
  var dragSrc = drag.attr('src');
  var drop = $(this);
  var dropSrc = drop.attr('src');
  drag.attr('src', dropSrc);
  drop.attr('src', dragSrc);
  //Evaluar
  comparar();
  x = setTimeout(function(){ desaparecer(); },2000);
  sumarMovimiento();
}
//Efecto aparecer
function aparecer(){
  $('.desaparecer').css('opacity','1.0');
  $('.elemento').css('opacity','1.0');
}
//Efecto desaparecer
var n=1;
function desaparecer(){
  if(n>3){
    clearInterval(x);
    sumarPuntuacion();
    completar();
    n=1;
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
//Sumar puntuacion
function sumarPuntuacion(){
  puntuacion += $('.desaparecer').length;
  $('#score-text').text(puntuacion);
}
//Sumar movimientos
var sumMov = 1;
function sumarMovimiento(){
  $('#movimientos-text').text(sumMov);
  sumMov++;
}
//Comparar imagenes
function comparar(){
  for (var j = 1; j < 8; j++) { //filas
    for (var k = 1; k < 6; k++) { //columnas
      //Compara filas
      var res1=$(".col-"+k).children("img:nth-last-child("+j+")").attr("src");
      var res2=$(".col-"+(k+1)).children("img:nth-last-child("+j+")").attr("src");
      var res3=$(".col-"+(k+2)).children("img:nth-last-child("+j+")").attr("src");
      if(res1==res2 && res1==res3 && res2==res3){
        $(".col-"+k).children("img:nth-last-child("+j+")").attr("class","desaparecer");
        $(".col-"+(k+1)).children("img:nth-last-child("+j+")").attr("class","desaparecer");
        $(".col-"+(k+2)).children("img:nth-last-child("+j+")").attr("class","desaparecer");
      }
      //Compara columnas
      var res4=$(".col-"+j).children("img:nth-last-child("+k+")").attr("src");
      var res5=$(".col-"+j).children("img:nth-last-child("+(k+1)+")").attr("src");
      var res6=$(".col-"+j).children("img:nth-last-child("+(k+2)+")").attr("src");
      if(res4==res5 && res4==res6 && res5==res6){
        $(".col-"+j).children("img:nth-last-child("+k+")").attr("class","desaparecer");
        $(".col-"+j).children("img:nth-last-child("+(k+1)+")").attr("class","desaparecer");
        $(".col-"+j).children("img:nth-last-child("+(k+2)+")").attr("class","desaparecer");
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
  comparar();
  x = setInterval(function(){ desaparecer(); },1000);
  aparecer();
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
  $('div[class ^= col]').hide();
  $('.panel-tablero').animate(
    {
      width: "-=900",
      height: "-=900",
      opacity: "-=0.9"
    }, 3000, function(){
      $(this).hide();
    });
    $('.panel-score').animate(
      {
        width: "+=900"
      }, 3000, function(){
        $('.main-titulo2').show();
    });
    $('.time').animate(
      {
        width: "-=100",
        height: "-=100",
        opacity: "-=0.9"
      }, 3000, function(){
        $(this).hide();
      });
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
