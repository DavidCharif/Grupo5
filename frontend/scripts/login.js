let registros = [];

class Usuario{
    constructor(nombre,apellido,telefono,correo,contrasena){
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.correo = correo;
        this.contrasena = contrasena;
    };
}

function agregarRegistro() {
    
    nombre = document.getElementById("nombre").value,
        apellido = document.getElementById("apellido").value,
        telefono = document.getElementById("telefono").value,
        correo = document.getElementById("correo").value,
        contrasena = document.getElementById("contrasena").value
    let usuario = new Usuario(nombre,apellido,telefono,correo,contrasena);
    
    registros.push(usuario);
    // document.forms[0].reset(); lo dejamos comentado para que no moleste
}

function login(){ 
var correo = document.getElementById("correo").value;
var contrasena = document.getElementById("contrasena").value;
var captcha= document.getElementById("captcha").value;
    for(let i=0; i<registros.length;i++){
    if(registros[i].correo==correo && registros[i].contrasena==contrasena){
        validarCAPTCHA(captcha); 
        return true;
        
        }
    }
       
}

function validarCAPTCHA(valor){
    if (valor == (4/(3/12000))){
        return true;
    } else {
        return false;
    }
}


module.exports.login = login;
module.exports.registros = registros;
module.exports.validarCAPTCHA = validarCAPTCHA;
module.exports.agregarRegistro = agregarRegistro;
