// Esta librer�a tiene funciones para presentar una secuencia de diapositivas en una p�gina. Funciona con capas o "div".
// ESTE JAVASCRIPT TIENE FALLOS Y TODAV�A NO TIRA EL POBRE XDDD
// VARIABLES GLOBALES
// Definimos unas variables para las layers o capas (<div>)
var dWidLyr = 450;
var dHgtLyr = 450;
var layerActual = 0;
var zIdx = -1;

// Reajustamos las variables de las layers a la resoluci�n de pantalla del usuario
var sWidPos = screen.availWidth / 2 - dWidLyr / 2;
var sHgtPos = screen.availHeight / 2 - dHgtLyr / 2;
var ocultarDIV = 'hidden';
var mostrarDIV = 'visible';
var cuenta, temporiz, diaposelec = 0;

//=====================================================================================

function anchoPantalla() {
  return screen.availWidth;
}
function altoPantalla() {
  return screen.availHeight;
}

// Funci�n que genera layers o capas
function genLayer(sName, sLeft, sTop, sWdh, sHgt, sVis, chica) {
  document.writeln('<div id="' + sName + '" style= "position: absolute; overflow: none; left: ' + sLeft + 
  'px; top: ' + sTop + 'px; width: ' + sWdh + 'px; height: ' + sHgt + 'px; visibility: ' + sVis + 
  '; z-Index = ' + (++ zIdx) + '">' + chica + '</div>');
} 
//=====================================================================================
// Funci�n que genera diapositivas (como un constructor o as�)
function diapositiva(nombreFoto) {
  this.nombreFoto = nombreFoto;
  //this.personaje = personaje;
  
  this.contenido =
    '<table width="500" cellpadding="10">' + '<tr>' + 
    '<td width="100%" valign="top" align = "center">' + 
    '<img src="chicas/' + document.title + '/' + nombreFoto + '.jpg" ' + 
    + 'onMouseOver="clearTimeout(temporiz); clearInterval(cuenta);" onMouseOut="temporiz = setTimeout(function(){imgAuto()}, 1000);"' + 
    'style="heigth:200px; width:400px;">' +
    '</td>' +
    '</tr>' +
    '</table>'
  //window.alert('<img src="../chicas/' + nombreImagen + '.jpg" ' + 'heigth="200" width="400">');
  return this;
}
//============================================================================================
// Creamos un array con objetos "diapositiva" que se ir�n viendo en la p�gina
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
  //menuStr += '<ul style="list-style-type:none;"><br />';
  for(var i = 0; i < juegoDiap.length; i ++) {
    // Creamos los layers para cada personaje
    genLayer('diapositiva' + i, sWidPos, 45, dWidLyr, dHgtLyr, (i == 0 ? mostrarDIV : ocultarDIV), juegoDiap[i].contenido);
    //window.alert('<img src="chicas/' + document.title + '/' + juegoDiap[i].nombreFoto + '.jpg" ');
    // Creamos el men� para navegar por los layers
    menuStr += '<img class="thumbnail" src="chicas/' + document.title + '/' + juegoDiap[i].nombreFoto + '.jpg"' + 'onMouseOver="clearTimeout(temporiz); clearInterval(cuenta); selectDIV(' + i + '); diaposelec = i;'
      + 'onMouseOut="temporiz = setTimeout(function(){imgAuto()}, 1000);">';  
    /*menuStr += '<li><a ' + 'onMouseOver="clearTimeout(temporiz); clearInterval(cuenta); selectDIV(' + i + '); diaposelec = i;' + 
    'return true;" ' +
    'onClick="return false;" ' + 'onMouseOut="temporiz = setTimeout(function(){imgAuto()}, 1000);">' + 
    '<img src="chicas/' + document.title + '/' + juegoDiap[i].nombreFoto + '.jpg" ' + 'style="heigth:50px; width:100px;"></a></li><br />';*/
  }
  //menuStr += '</ul><br />';
  // Creamos el layer del men�
  document.writeln(
    '<div style= "position: absolute; top: 20%; width: 30%; overflow: none;">' + menuStr + '<div>'
  );
    document.writeln(
    '<div style= "position: absolute; right: 50%; width: 25%; overflow: none;">' + '<p>tu madre meaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>' + '<div>'
  );
  //genLayer('menu_guia', sWidPos - 204, 43, 200, 200, mostrarDIV, '<div id="menu_guia">' + '<b>' + document.title + '</b><br />' + menuStr + '</div>');
  imgAuto();
  genLayer('datosChica', sWidPos, 500, 200, 200, mostrarDIV, '<p id="campo">joder vaya basura</p>');
  //document.getElementById("campo").innerHTML = ;
}

function datosChica(archivo) {
  //var arch = '../' + archivo; 
  var longitud_archivo = flength(archivo); 
  var contenido = fread(archivo, longitud_archivo);
  window.alert(contenido);
}

/*function pruebas(archivo) {
var linea;
var linea1;
var myFileSysObj = new ActiveXObject("Scripting.FileSystemObject");
var myInputTextStream = myFileSysObj.OpenTextFile(archivo, 1, true);

while (!myInputTextStream.AtEndOfStream) {
linea = myInputTextStream.ReadLine();//Tratamiento personalizado para cada variable de salida
linea1 = linea.split(':');
alert(linea1[1]);
}
myInputTextStream.Close();
}*/
//================================================================================================================
function imgAuto() {
  cuenta = setInterval(function(){if(diaposelec == juegoDiap.length) {diaposelec = 0;} selectDIV(diaposelec ++)}, 2000);
}
// Funci�n para ocultar las layers
function ocultarLayer(name) {
  refLayer(name).visibility = ocultarDIV;
}
//==================================================================================================================
// Funci�n para mostrar las layers
function mostrarLayer(name) {
  refLayer(name).visibility = mostrarDIV;
}
//=====================================================================================================================
// Funci�n que referencia las layers
function refLayer(name) {
  return eval('document.getElementById("' + name + '").style');
}
//====================================================================================================================
// Funci�n para seleccionar una diapositiva cuando el usuario navega por el men�
function selectDIV(ref) {
  ocultarLayer('diapositiva' + layerActual);
  layerActual = ref;
  mostrarLayer('diapositiva' + layerActual);
}
//=======================================================================================================================
// Colocamos un mensaje de estado en la parte inferior del navegador
function statusInf() {
  window.status = 'Personajes de anime';
}