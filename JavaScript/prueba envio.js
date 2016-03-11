/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function revisarForma(forma) { // pretendo que revise el formato de los datos del formulario y además que los recoja y muestre.
  var f = document.forms[forma];
  
  var correo = f["correo"].value;
  if(!correo.match(/\w+@\w+\.(com|org|es|net)/)) {
    window.alert("revisa el formato del email");
    return false;
  }
  
  var telef = f["telefono"].value;
  if(!telef.match(/\d{9}/)) {
    window.alert("mal formato para el teléfono");
    return false;
  }
  
  var web = f.dirweb.value;
  if(!web.match(/\w+\.(com|org|es|net)/)) {
    window.alert("mal formato para la dirección web");
    return false;
  }
  
 var t = document.forms[forma].txt1.value;
  if(!t.match(/\w{1,40}/)) {
    window.alert("el texto no cumple el formato");
    return false;
  }

  var t1 = document.forms[forma].areatexto.value;
  if(!t1.match(/\w{1,60}/)) {
    window.alert("el texto no cumple el formato");
    return false;
  }
  
  /*window.alert(
    "area texto: " + document.forms[forma].areatexto.value + "\n"
  );*/
}

function correoConsulta(forma) {
  window.alert('funciona');
  var f = document.forms[forma];
  window.open('mailto:nash.makineta@gmail.com?subject=Consulta&body=' + escape('correo: ' + f["correo"].value + ' telefono: ' + f["telefono"].value + ' Consulta: ' + f.areatexto.value).toString());
}

function prueba() {
  window.open('mailto:grupochoza@yahoo.com?subject=Consulta&body=' + escape('Nombre: \nDireccion: \nTelefono: \nCorreo electronico: \nConsulta: ').toString());
  //var f = document.forms[forma];
  //window.alert(escape(' consulta: ' + f["areatexto"].value.toString()).toString());
  //window.open('mailto:nash.makineta@gmail.com?subject=Consulta&body=' + escape(' consulta: ' + f["areatexto"].value.toString()).toString());
  //window.alert('mailto:nash.makineta@gmail.com?subject=Consulta&body=' + escape('correo: ' + f["correo"].value + ' telefono: ' + f["telefono"].value + ' consulta: ' + f["areatexto"].value).toString());
  //window.open('mailto:nash.makineta@gmail.com?subject=Consulta&body=' + escape('correo: ' + f["correo"].value + ' telefono: ' + f["telefono"].value + ' consulta: ' + f["areatexto"].value).toString());
}

