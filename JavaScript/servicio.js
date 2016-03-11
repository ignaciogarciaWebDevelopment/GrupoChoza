// Esta librería tiene funciones para presentar una secuencia de diapositivas en una página. Funciona con capas o "div".

// VARIABLES GLOBALES
// ==================
// 
// MEDIDAS DE LA VENTANA
// // ÉSTAS NO SE PUEDEN USAR PORQUE NO SON UNIVERSALES, NO FUNCIONAN EN IE.
//var anchoVentana = window.innerWidth; // el ancho de la ventana del navegador
//var altoVentana = window.innerHeight; // el alto de idem
// ÉSTAS PARECE QUE SÍ...
var anchoVentana = screen.availWidth * 0.88; // el ancho de la ventana del navegador
var altoVentana = screen.availHeight * 0.88; // el alto de idem
var altoancho = altoVentana / anchoVentana; // proporción alto/ancho.


// MEDIDAS Y POSICIONES DE LAS DIVISIONES O CAPAS

var arribaDivTitulos = 0;
var altoDivTitulos = Math.round(altoVentana * 0.1);

var anchoDivTexto = Math.round(anchoVentana * 0.5); // el ancho de la <div> de la diapositiva
 //el alto de idem

var anchoDivImagen = Math.round((anchoVentana - anchoDivTexto) / 2);//Math.round(anchoVentana * 0.1); // el ancho de la <div> de la imagen que representa el servicio
var altoDivImagen = Math.round(anchoDivImagen * altoancho);//Math.round(anchoDivImagen * altoancho); //anchoDivImagen * altoancho; //el alto de idem
var altoDivTexto = altoDivImagen;
//var anchoDivThumbnails = anchoVentana * 0.2; // el alto de la <div> de las thumbnails
var izdaDivImagen = 10;//(anchoVentana - anchoDiap) / 2;
var arribaDivImagen = arribaDivTitulos + altoDivTitulos;//altoVentana * 0.05; // posición arriba (top) de idem
var paddingVImagen = Math.round(anchoVentana * 0.02);
var paddingHImagen = 0;//Math.round(anchoVentana * 0.03);
var anchoImagen = anchoDivImagen - 2*paddingHImagen; // - paddingHImagen * 2;
var altoImagen = anchoImagen * altoancho;//altoDivImagen - 2*paddingVImagen; //anchoImagen * altoancho;
//var altoDivThumbnails = altoDiap + arribaDiap; // el alto de la <div> de las thumbnails; hacemos que coincida su parte de abajo con la de la otra div.
//var anchoDivTexto = anchoVentana - 2 * anchoDivImagen;
//var altoDivTexto = altoDivImagen; // el alto de la div de la derecha con el texto sobre la chica
var arribaDivTexto = arribaDivImagen;
var izdaDivTexto = izdaDivImagen + anchoDivImagen + Math.round(anchoVentana * 0.015);

var anchoDivT1 = anchoDivImagen + anchoDivTexto;
var anchoDivT2 = anchoDivImagen - Math.round(anchoVentana * 0.01);

var anchoDivEnlaces = anchoDivT2;
var altoDivEnlaces = altoDivImagen;
var izdaDivEnlaces = izdaDivTexto + anchoDivTexto;
var arribaDivEnlaces = arribaDivTexto;

// MEDIDAS Y POSICIONES DE LAS THUMBNAILS
/*var anchoThumbnail = anchoDivThumbnails * 0.4; // el ancho para las thumbnails
var altoThumbnail = anchoThumbnail * altoancho; // el alto para idem.
var paddingVThumbnails = 5;
var nThumbnails = Math.floor(anchoDivThumbnails / (anchoThumbnail + paddingVThumbnails * 2)); 
var paddingHThumbnails = (anchoDivThumbnails / nThumbnails - anchoThumbnail) / 2;*/

//=====================================================================================

// Función que genera layers o capas
function creaDiv(idDiv, izda, arriba, ancho, alto, contenido) {
  document.writeln('<div id="' + idDiv + '" style="position: absolute; overflow: none; left: ' + izda + 
  'px; top: ' + arriba + 'px; width: ' + ancho + 'px; height: ' + alto + 'px">' + contenido + '</div>');
} 
//=====================================================================================

//============================================================================================
// Función que convierte un texto en mayúsculas
function mayusculas(str) {return str.toUpperCase();}
//===============================================================================================


// Función que crea todas las layers y el menú
function generarPantalla() {
  //window.alert(putaVaca);
  var str = '';
  //menuStr += '<p style="font-size: 30px; text-align: center;">' + document.title + '</p>';
  
  /*document.writeln('<div id="TituloServicio" style="position: absolute; overflow: none; left: ' + izdaDivImagen + 
  'px; top: 0px; width: ' + (anchoDivImagen + anchoDivTexto) + 'px' + '">' + 'perrilla' + '</div>');*/

  creaDiv('tituloServicio', izdaDivImagen, arribaDivTitulos, anchoDivImagen, altoDivTitulos, 
  '<br><span style="font-size: 30px;">' + mayusculas(document.title) + '</span><hr>');
  
  creaDiv('tituloEnlaces', izdaDivEnlaces, arribaDivTitulos, anchoDivT2, altoDivTitulos, 
  '<br><span style="font-size: 30px;">SERVICIOS</span><hr>');
  
  // aquí en un futuro hay que automatizarlo con el directorio y tal...
  // Creamos la div de la imagen
  //window.alert(anchoImagen + ", " + altoImagen + ", " + altoDivTexto);
  str += '<img src="servicios/' + document.title + '.jpg"' +  
  'style="heigth:' + altoImagen + 'px; width:' + anchoImagen + 'px; ' +
  'padding: ' + paddingVImagen + 'px ' + paddingHImagen + 'px" >';

  creaDiv('imagenServicio', izdaDivImagen, arribaDivImagen, anchoDivImagen, altoDivImagen, str);
  // y ahora la del texto
  //window.alert(izdaDivTexto + ", " + anchoDivTexto + ", " + arribaDivTexto);
  /*creaDiv('textoServicio', izdaDivTexto, arribaDivTexto, anchoDivTexto, altoDivTexto, '<br><br>' + 
  '<p style="font-size:1.1em;">Realizamos todo tipo de trabajos de albañilería para lograr un acabado perfecto.</p>' +
  '<ul style="font-size:1.1em;">' +
    '<li>Alicatados y solados</li>' +
    '<li>Tejados y falsos techos (de pladur y escayola)</li>' +
    '<li>Tabiquería: Derribos y levantamiento de muros</li>' +
    '<li>Enfoscados, ladrillo visto y colocación de piedra</li>' +
    '<li>Instalaciones de pladur o escayola (molduras de escayola)</li>' +
    '<li>Y cualquier trabajo de albañilería que se pueda necesitar en la reforma integral!</li>' +
  '</ul>');*/
  
  var menuStr = '<ul>';
  for(var i = 0; i < juegoDiap.length; i ++) {
    menuStr += '<li class="menuVertical">\n\
    <a href="' + juegoDiap[i].chica + '.html">' + juegoDiap[i].chica + '</a></li><br>';
  }
  menuStr += '</ul>';
  //window.alert((document.getElementById('imagenServicio').style.height + document.getElementById('tituloServicio').style.height));
  creaDiv('enlacesServicio', izdaDivEnlaces, arribaDivEnlaces, anchoDivEnlaces, altoDivEnlaces, menuStr);
  creaDiv('contacto', izdaDivImagen, altoDivTitulos + altoDivImagen + altoVentana * 0.1, anchoDivImagen, altoVentana * 0.3, 
  '<br><br>' + '<span style="font-size:2em;">Contáctanos</span><hr>' + 
  '<span style="font-size:1.1em;">Teléfonos:</span>' +
  '<ul style="font-size:1.1em;">' + 
  '<li>685004197</li><li>608165820</li></ul>' + 
  '<span style="font-size:1.1em;">Email: <a href="" onclick="correoConsulta();">grupochoza@yahoo.com</a></span>');
  
  //creaDiv('pruebaaa', izdaDivImagen, arribaDivImagen + altoImagen + 100, anchoDivImagen, 100, 'hola q tal pascual');
  // metemos el texto de la chica desde un archivo .txt usándolo como un script.
  /*document.writeln(
    '<script src="' + document.title + '.txt"></script>'*/ /*+
    '<script>' +
    'window.alert(registro1); ' +
      'document.getElementById("campo1").innerHTML = registro1;' +
    '</script>'*/
  /* Esto de arriba he tenido que cambiarlo xq parece que en IE no se pueden acceder variables de scripts desde el documento html.*/
  //);
  //var banerStr = 'mi perro toca el piano';
  //creaDiv('parteBaja', izdaDivImagen, arribaDivImagen + altoDivImagen, anchoVentana, 300, banerStr);
  
  document.writeln('<script src="JavaScript/' + document.title + '.js"></script>');
}
//=======================================================================================================================
