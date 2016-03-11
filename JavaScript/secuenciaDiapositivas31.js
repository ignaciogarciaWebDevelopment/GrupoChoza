// Esta librer�a tiene funciones para presentar una secuencia de diapositivas en una p�gina. Funciona con capas o "div".

// VARIABLES GLOBALES
// ==================
// 
// MEDIDAS DE LA VENTANA
// �STAS NO SE PUEDEN USAR PORQUE NO SON UNIVERSALES, NO FUNCIONAN EN IE.
//var anchoVentana = window.innerWidth; // el ancho de la ventana del navegador
//var altoVentana = window.innerHeight; // el alto de idem
// �STAS PARECE QUE S�...
var anchoVentana = screen.availWidth * 0.88; // el ancho de la ventana del navegador
var altoVentana = screen.availHeight * 0.88; // el alto de idem
var altoancho = altoVentana / anchoVentana;

// MEDIDAS Y POSICIONES DE LAS DIVISIONES O CAPAS
var arribaDivTitulos = 0;
var altoDivTitulos = 80;
var anchoDiap = Math.round(anchoVentana * 0.4); // el ancho de la <div> de la diapositiva
var altoDiap = Math.round(anchoDiap * altoancho); //el alto de idem
//var anchoDivThumbnails = anchoVentana * 0.2; // el alto de la <div> de las thumbnails
var anchoDivThumbnails = Math.round((anchoVentana - anchoDiap) / 2);
//var anchoDivThumbnails = anchoVentana - anchoDiap;
//var izdaDiap = anchoDivThumbnails; // posici�n izquierda (left) de la diapositiva
//var izdaDiap = anchoVentana - anchoDiap;
var izdaDiap = anchoDivThumbnails;
var arribaDiap = arribaDivTitulos + altoDivTitulos; //altoVentana * 0.05; // posici�n arriba (top) de idem
var altoDivThumbnails = altoDiap; // el alto de la <div> de las thumbnails; hacemos que coincida su parte de abajo con la de la otra div.
var arribaDivThumbnails = arribaDiap;

// MEDIDAS Y POSICIONES DE LAS THUMBNAILS
var anchoThumbnail = anchoDivThumbnails;// * 0.3; // el ancho para las thumbnails
//var altoThumbnail = anchoThumbnail * altoancho; // el alto para idem.

// VARIABLES PARA LAS CAPAS
var divActual = 0;
var coordenadaZ = -1; // profundidad de una capa o <div>, para que est� por encima o por debajo de otra.
var oculta = 'hidden';
var visible = 'visible';

// VARIABLES PARA EL TEMPORIZADOR
var cuenta, temporiz;

// PARA LA TABLA DE LA DIAPOSITIVA
var paddingH = Math.round(anchoVentana * 0.05); // padding para la tabla que contiene la diapositiva
var paddingV = Math.round(anchoVentana * 0.03);

//=====================================================================================

// Funci�n que genera layers o capas
function creaDiv(idDiv, izda, arriba, ancho, alto, visibilidad, contenido) {
  document.writeln('<div id="' + idDiv + '" style="position: absolute; overflow: none; left: ' + izda + 
  'px; top: ' + arriba + 'px; width: ' + ancho + 'px; height: ' + alto + 'px; visibility: ' + visibilidad + 
  '; z-Index = ' + (++ coordenadaZ) + '">' + contenido + '</div>');
} 
//=====================================================================================
// Funci�n que genera diapositivas (como un constructor o as�)
function diapositiva(nombreChica) {
  this.chica = nombreChica;
  //this.personaje = personaje;
  this.contenido =
    '<table width="' + anchoDiap + '" style="padding: ' + paddingH + ' ' + paddingV + ';">' + '<tr>' + //'" cellpadding="' + paddingV + 'px ' + paddingH + 'px
    '<td width="100%" valign="top" align = "center">' + 
    '<a href="' + nombreChica + '.html" onMouseOver="clearTimeout(temporiz); clearInterval(cuenta);" ' + 
    'onMouseOut="temporiz = setTimeout(function(){imgAuto()}, 1000);"><img src="servicios/' + nombreChica + '.jpg" ' + 'style="heigth:' + (altoDiap - 2 * paddingV) + 
    'px; width:' + (anchoDiap - 2 * paddingH) + 'px;"></a>' +
    '<h3><i>' + nombreChica + '</i></h3>' +
    '</td>' +
    '</tr>' +
    '</table>'
  //window.alert('<img src="../chicas/' + nombreImagen + '.jpg" ' + 'heigth="200" width="400">');
  return this;
}
//============================================================================================
// Creamos un array con objetos "diapositiva" que se ir�n viendo en la p�gina. Esto en una futura versi�n hay que hacerlo tomando los nombres de los .jpg's
// o algo as�, que sea autom�tico.
var juegoDiap = new Array(
  new diapositiva('Alba�iler�a'),
  new diapositiva('Pintura'),
  new diapositiva('Electricidad'),
  new diapositiva('Fontaner�a'),
  new diapositiva('Carpinter�a'),
  new diapositiva('Arreglos en general'),
  new diapositiva('Limpieza'),
  new diapositiva('Mantenimiento')
);
//============================================================================================
// Funci�n que convierte un texto en may�sculas
function mayusculas(str) {return str.toUpperCase();}
//===============================================================================================


// Funci�n que crea todas las layers y el men�
function generarPantalla() {
  //window.alert(anchoVentana + ', ' + altoVentana + '; ' + screen.availWidth + ', ' + screen.availHeight);
  creaDiv('TituloServicio', 10, arribaDivTitulos, anchoDivThumbnails, altoDivTitulos, visible,
  '<p class="centrado" style="font-size: 30px;">' + 'NUESTROS SERVICIOS' + '</p><hr>');
  var menuStr = '<br>';
  //menuStr += '<ul style="list-style-type:none; text-align: center;">';
  //menuStr += '<li style="font-size: 30px;">NUESTROS SERVICIOS<br /><br /></li>';
  // aqu� en un futuro hay que automatizarlo con el directorio y tal...
  for(var i = 0; i < juegoDiap.length; i ++) {
    // Creamos los layers para cada personaje
    creaDiv('diapositiva' + i, izdaDiap, arribaDiap, anchoDiap, altoDiap, (i == 0 ? visible : oculta), juegoDiap[i].contenido);
    // Creamos el men� para navegar por los layers
    // recordar: esto era para ponerles un marco a las imagenes, se ponia en <li>:  y en style: padding-top: 10px;" 
    menuStr += '<p class="menuVerticalCentrado">\n\
    <a href="' + juegoDiap[i].chica + '.html" ' + 'onMouseOver="clearTimeout(temporiz); clearInterval(cuenta); selectDIV(' + i + ');"' 
      + 'onMouseOut="temporiz = setTimeout(function(){imgAuto()}, 1000);">' + juegoDiap[i].chica + '</a></p>';
  }
  //menuStr += '</ul>';
  // Creamos el layer del men�
  //document.writeln(
  creaDiv('menuThumbnails', 10, arribaDivThumbnails, anchoDivThumbnails, altoDivThumbnails, visible, menuStr);
  
  //window.alert((izdaDiap + anchoDiap));
  creaDiv('TituloEnlaces', izdaDiap + anchoDiap, arribaDivTitulos, anchoDivThumbnails, altoDivTitulos, visible, 
  '<p class="centrado" style="font-size: 30px;">CON�CENOS</p><hr>');
  
  //window.alert(anchoVentana + ", " + (izdaDiap + anchoDiap) + ", " + Math.round(anchoVentana*3/4));
  
  creaDiv('quienesSomos', izdaDiap + anchoDiap, arribaDivThumbnails, anchoDivThumbnails, altoDiap, visible, 
  '<br>' + 
  '<p class="menuVerticalCentrado">\n\
  <a href="Alba�ileria.html">Qui�nes somos</a></p>' + 
  '<p class="menuVerticalCentrado">\n\
  <a href="Alba�ileria.html">Cont�ctanos</a></p>');
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
// Funci�n para ocultar las layers
function ocultarDiv(id) {
  refDiv(id).visibility = oculta;
}
//==================================================================================================================
// Funci�n para mostrar las layers
function mostrarDiv(id) {
  refDiv(id).visibility = visible;
}
//=====================================================================================================================
// Funci�n que referencia las divs
function refDiv(id) {
  return eval('document.getElementById("' + id + '").style');
}
//====================================================================================================================
// Funci�n para seleccionar una diapositiva cuando el usuario navega por el men�
function selectDIV(nuevadiv) {
  ocultarDiv('diapositiva' + divActual);
  divActual = nuevadiv;
  mostrarDiv('diapositiva' + divActual);
}
//=======================================================================================================================
// Colocamos un mensaje de estado en la parte inferior del navegador
function statusInf() {
  window.status = 'Mensaajeeeeeeeeeeee';
}