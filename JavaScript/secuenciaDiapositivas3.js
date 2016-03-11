// Esta librería tiene funciones para presentar una secuencia de diapositivas en una página. Funciona con capas o "div".



// MEDIDAS Y POSICIONES DE LAS DIVISIONES O CAPAS
var arribaDivTitulos = 0;
var altoDivTitulos = Math.round(altoVentana * 0.1);


//var anchoDivThumbnails = anchoVentana * 0.2; // el alto de la <div> de las thumbnails
var anchoDivThumbnails = Math.round((anchoVentana - anchoDiap) / 2);
//var anchoDivThumbnails = anchoVentana - anchoDiap;
//var izdaDiap = anchoDivThumbnails; // posición izquierda (left) de la diapositiva
//var izdaDiap = anchoVentana - anchoDiap;
var izdaDiap = anchoDivThumbnails;
var arribaDiap = arribaDivTitulos + altoDivTitulos; //altoVentana * 0.05; // posición arriba (top) de idem
var altoDivThumbnails = altoDiap; // el alto de la <div> de las thumbnails; hacemos que coincida su parte de abajo con la de la otra div.
var arribaDivThumbnails = arribaDiap;
var izdaThumbnails = Math.round(anchoVentana * 0.01);
// MEDIDAS Y POSICIONES DE LAS THUMBNAILS
//var anchoThumbnail = anchoDivThumbnails;// * 0.3; // el ancho para las thumbnails
//var altoThumbnail = anchoThumbnail * altoancho; // el alto para idem.

// VARIABLES PARA LAS CAPAS
var divActual = 0;
var coordenadaZ = -1; // profundidad de una capa o <div>, para que esté por encima o por debajo de otra.


// VARIABLES PARA EL TEMPORIZADOR
var cuenta, temporiz;

// PARA LA TABLA DE LA DIAPOSITIVA


//=====================================================================================

// Función que genera layers o capas
function creaDiv(idDiv, izda, arriba, ancho, alto, visibilidad, contenido) {
  document.writeln('<div id="' + idDiv + '" style="position: absolute; overflow: none; left: ' + izda + 
  'px; top: ' + arriba + 'px; width: ' + ancho + 'px; height: ' + alto + 'px; visibility: ' + visibilidad + 
  '; z-Index = ' + (++ coordenadaZ) + '">' + contenido + '</div>');
} 
//=====================================================================================

// Función que crea todas las layers y el menú
function generarPantalla() {
  //window.alert(anchoVentana + ', ' + altoVentana + '; ' + screen.availWidth + ', ' + screen.availHeight);
  creaDiv('TituloServicio', izdaThumbnails, arribaDivTitulos, anchoDivThumbnails, altoDivTitulos, visible,
  '<br><span style="font-size: 30px; margin-left: ' + Math.round(0.018 * anchoVentana) + 'px;">' + 'NUESTROS SERVICIOS' + '</span><hr>');
  var menuStr = '';
  //menuStr += '<ul>';
  //menuStr += '<li style="font-size: 30px;">NUESTROS SERVICIOS<br /><br /></li>';
  // aquí en un futuro hay que automatizarlo con el directorio y tal...
  for(var i = 0; i < juegoDiap.length; i ++) {
    // Creamos los layers para cada personaje
    creaDiv('diapositiva' + i, izdaDiap, arribaDiap, anchoDiap, altoDiap, (i == 0 ? visible : oculta), juegoDiap[i].contenido);
    // Creamos el menú para navegar por los layers
    // recordar: esto era para ponerles un marco a las imagenes, se ponia en <li>:  y en style: padding-top: 10px;" 
    menuStr += '<p class="menuVerticalCentrado">\n\
    <a href="' + juegoDiap[i].chica + '.html" ' + 'onMouseOver="clearTimeout(temporiz); clearInterval(cuenta); selectDIV(' + i + ');"' 
      + 'onMouseOut="temporiz = setTimeout(function(){imgAuto()}, 1000);">' + juegoDiap[i].chica + '</a></p>';
  }
  //menuStr += '</ul>';
  // Creamos el layer del menú
  //document.writeln(
  creaDiv('menuThumbnails', izdaThumbnails, arribaDivThumbnails, anchoDivThumbnails, altoDivThumbnails, visible, menuStr);
  
  //window.alert((izdaDiap + anchoDiap));
  creaDiv('tituloEnlaces', izdaDiap + anchoDiap, arribaDivTitulos, anchoDivThumbnails, altoDivTitulos, visible, 
  '<br><span style="font-size: 30px;">CONÓCENOS</span><hr>');
  
  //window.alert(anchoVentana + ", " + (izdaDiap + anchoDiap) + ", " + Math.round(anchoVentana*3/4));
  
  creaDiv('quienesSomos', izdaDiap + anchoDiap, arribaDivThumbnails, anchoDivThumbnails, altoDiap, visible, 
  '<a style="font-size:1.5em;" href="Quiénes somos.html">Quiénes somos</a><br><br><br>' + 
  '<span style="font-size:2em;">Contáctanos</span><hr>' + 
  '<span style="font-size:1.1em;">Teléfonos:</span>' +
  '<ul style="font-size:1.1em;">' + 
  '<li>685004197</li><li>608165820</li></ul>' + 
  '<span style="font-size:1.1em;">Email: <a href="" onclick="correoConsulta();">grupochoza@yahoo.com</a></span>');
  //window.alert((izdaDiap + anchoDiap));
  //creaDiv('vaca', izdaDiap + anchoDiap, arribaDivThumbnails + altoDiap, anchoDivThumbnails, 50, visible,'<p style="text-align: center; background-color: yellow;">vacas</p>');
    //'<div style= "position: absolute; width: 40%; top: 0; text-align: center;">'//+ '<span style="text-align: center; margin-left: 50px; margin-right: 50px;">Nuestras Chicas</span><br />'
    //+ menuStr + '<div>'
  //);
  //genLayer('menu_guia', sWidPos - 204, 43, 200, 200, mostrarDIV, '<div id="menu_guia" style="tetx-align: center;">' + '<b>Nuestras chicas</b><br />' + menuStr + '</div>');
  imgAuto();
}
//================================================================================================================
function imgAuto() {
  cuenta = setInterval(function(){if(divActual == juegoDiap.length - 1) {selectDIV(0);} else {selectDIV(divActual + 1);}}, 2000);
}
// Función para ocultar las layers
function ocultarDiv(id) {
  refDiv(id).visibility = oculta;
}
//==================================================================================================================
// Función para mostrar las layers
function mostrarDiv(id) {
  refDiv(id).visibility = visible;
}
//=====================================================================================================================
// Función que referencia las divs
function refDiv(id) {
  return eval('document.getElementById("' + id + '").style');
}
//====================================================================================================================
// Función para seleccionar una diapositiva cuando el usuario navega por el menú
function selectDIV(nuevadiv) {
  ocultarDiv('diapositiva' + divActual);
  divActual = nuevadiv;
  mostrarDiv('diapositiva' + divActual);
}
//=======================================================================================================================
