/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
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
var anchoDiap = Math.round(anchoVentana * 0.4); // el ancho de la <div> de la diapositiva
var altoDiap = Math.round(anchoDiap * altoancho); //el alto de idem
var paddingH = Math.round(anchoVentana * 0.05); // padding para la tabla que contiene la diapositiva
var paddingV = Math.round(altoVentana * 0.05);
var oculta = 'hidden';
var visible = 'visible';
//======================================================================
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
  new diapositiva('Limpieza'),
  new diapositiva('Mantenimiento')
);
//============================================================================================
// Funci�n que convierte un texto en may�sculas
function mayusculas(str) {return str.toUpperCase();}
//============================================================================================
// Colocamos un mensaje de estado en la parte inferior del navegador
function statusInf() {
  window.status = 'Mensaajeeeeeeeeeeee';
}
//============================================================================================
function correoConsulta() {
  window.open('mailto:grupochoza@yahoo.com?subject=Consulta&body=' + escape('Nombre: \nDireccion: \nTelefono: \nCorreo electronico: \nConsulta: ').toString());
}

