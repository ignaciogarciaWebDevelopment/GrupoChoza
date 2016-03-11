// Esta librer�a tiene funciones para presentar una secuencia de diapositivas en una p�gina. Funciona con capas o "div".

// VARIABLES GLOBALES
// ==================
// 
// MEDIDAS DE LA VENTANA
// // �STAS NO SE PUEDEN USAR PORQUE NO SON UNIVERSALES, NO FUNCIONAN EN IE.
//var anchoVentana = window.innerWidth; // el ancho de la ventana del navegador
//var altoVentana = window.innerHeight; // el alto de idem
// �STAS PARECE QUE S�...
var anchoVentana = screen.availWidth * 0.88; // el ancho de la ventana del navegador
var altoVentana = screen.availHeight * 0.88; // el alto de idem
var altoancho = altoVentana / anchoVentana; // proporci�n alto/ancho.


// MEDIDAS Y POSICIONES DE LAS DIVISIONES O CAPAS
var anchoDiap = anchoVentana * 0.5; // el ancho de la <div> de la diapositiva
var altoDiap = anchoDiap * altoancho; //el alto de idem
//var anchoDivThumbnails = anchoVentana * 0.2; // el alto de la <div> de las thumbnails
var anchoDivThumbnails = (anchoVentana - anchoDiap) / 2;
var anchoDivTexto = anchoDivThumbnails;
var izdaDiap = (anchoVentana - anchoDiap) / 2;
var arribaDiap = altoVentana * 0.05; // posici�n arriba (top) de idem
var altoDivThumbnails = altoDiap + arribaDiap; // el alto de la <div> de las thumbnails; hacemos que coincida su parte de abajo con la de la otra div.
var altoDivTexto = altoDivThumbnails; // el alto de la div de la derecha con el texto sobre la chica
var arribaDivThumbnails = 0;
var arribaDivTexto = 0;
var izdaDivTexto = anchoDivThumbnails + anchoDiap;

// MEDIDAS Y POSICIONES DE LAS THUMBNAILS
var anchoThumbnail = anchoDivThumbnails * 0.4; // el ancho para las thumbnails
var altoThumbnail = anchoThumbnail * altoancho; // el alto para idem.
var paddingVThumbnails = 5;
var nThumbnails = Math.floor(anchoDivThumbnails / (anchoThumbnail + paddingVThumbnails * 2)); 
var paddingHThumbnails = (anchoDivThumbnails / nThumbnails - anchoThumbnail) / 2;

// VARIABLES PARA LAS CAPAS
var divActual = 0; // la capa o div activa o visible ahora.
var coordenadaZ = -1; // profundidad de una capa o <div>, para que est� por encima o por debajo de otra.
var oculta = 'hidden';
var visible = 'visible';

// VARIABLES PARA EL TEMPORIZADOR
var cuenta, temporiz;

// PARA LA TABLA DE LA DIAPOSITIVA
var paddingTabla = anchoVentana * 0.02; // padding para la tabla que contiene la diapositiva

//=====================================================================================

// Funci�n que genera layers o capas
function creaDiv(idDiv, izda, arriba, ancho, alto, visibilidad, contenido) {
  document.writeln('<div id="' + idDiv + '" style="position: absolute; overflow: none; left: ' + izda + 
  'px; top: ' + arriba + 'px; width: ' + ancho + 'px; height: ' + alto + 'px; visibility: ' + visibilidad + 
  '; z-Index = ' + (++ coordenadaZ) + '">' + contenido + '</div>');
} 
//=====================================================================================
// Funci�n que genera diapositivas (como un constructor o as�)
function diapositiva(nombreFoto) {
  this.nombreFoto = nombreFoto;
  //this.personaje = personaje;
  this.contenido =
    '<table width="' + anchoDiap + '" cellpadding="' + paddingTabla + 'px">' + '<tr>' + 
    '<td width="100%" valign="top" align = "center">' + 
    '<img src="chicas/' + document.title + '/' + nombreFoto + '.jpg" ' + 'onMouseOver="clearTimeout(temporiz); clearInterval(cuenta);" ' + 
    'onMouseOut="temporiz = setTimeout(function(){imgAuto()}, 1000);" style="heigth:' + (altoDiap - 2 * paddingTabla) + 
    'px; width:' + (anchoDiap - 2 * paddingTabla) + 'px;">' +
    '</td>' +
    '</tr>' +
    '</table>'
  return this;
}
//============================================================================================
// Creamos un array con objetos "diapositiva" que se ir�n viendo en la p�gina. Esto en una futura versi�n hay que hacerlo tomando los nombres de los .jpg's
// o algo as�, que sea autom�tico.
var juegoDiap = new Array(
  new diapositiva('foto1'),
  new diapositiva('foto2'),
  new diapositiva('foto3'),
  new diapositiva('foto4'),
  new diapositiva('foto5')
);
//============================================================================================
// Funci�n que convierte un texto en may�sculas
function mayusculas(str) {return str.toUpperCase();}
//===============================================================================================


// Funci�n que crea todas las layers y el men�
function generarPantalla() {
  var menuStr = '';
  menuStr += '<p style="font-size: 20px; text-align: center;">' + document.title + '<br /><br /></p>';
  // aqu� en un futuro hay que automatizarlo con el directorio y tal...
  for(var i = 0; i < juegoDiap.length; i ++) {
    // Creamos los layers para cada personaje
    creaDiv('diapositiva' + i, izdaDiap, arribaDiap, anchoDiap, altoDiap, (i == 0 ? visible : oculta), juegoDiap[i].contenido);
    // Creamos el men� para navegar por los layers
    menuStr += '<img class="thumbnail" src="servicios/' + document.title + '/' + juegoDiap[i].nombreFoto + '.jpg"' + 
      'onMouseOver="clearTimeout(temporiz); clearInterval(cuenta); selectDIV(' + i + ');"' 
      + 'onMouseOut="temporiz = setTimeout(function(){imgAuto()}, 1000);" ' + 
    'style="heigth:' + altoThumbnail + 'px; width:' + anchoThumbnail + 'px; ' +
      'padding: ' + paddingVThumbnails + 'px ' + paddingHThumbnails + 'px" >';
  }
  // Creamos el layer del men�
  creaDiv('menuThumbnails', 0, arribaDivThumbnails, anchoDivThumbnails, altoDivThumbnails, visible, menuStr);
  // y ahora el del texto
  creaDiv('textoChica', izdaDivTexto, arribaDivTexto, anchoDivTexto, altoDivTexto, visible, '<p id="campo1"></p>');
  // metemos el texto de la chica desde un archivo .txt us�ndolo como un script.
  document.writeln(
    '<script src="' + document.title + '.txt"></script>' /*+
    '<script>' +
    'window.alert(registro1); ' +
      'document.getElementById("campo1").innerHTML = registro1;' +
    '</script>'*/
  /* Esto de arriba he tenido que cambiarlo xq parece que en IE no se pueden acceder variables de scripts desde el documento html.*/
  );
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