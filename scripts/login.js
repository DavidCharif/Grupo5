let registros = [];

function login() {
    correo = document.getElementById("correo").value; 
    contrasena = document.getElementById("contrasena").value;
    
    let usuario = registros.some(usuario => usuario.correo === correo && usuario.contrasena === contrasena);
        if (usuario == true) {
            validarCAPTCHA();
            return true;
        }
        else {
        return false;
        }
}


function agregarRegistro() {
    
        nombre = document.getElementById("nombre").value,
        apellido = document.getElementById("apellido").value,
        telefono = document.getElementById("telefono").value,
        correo = document.getElementById("correo").value,
        contrasena = document.getElementById("contrasena").value
    let usuario = new Usuario(nombre,apellido,telefono,correo,contrasena);
    
    registros.push(usuario);
}

function validarCAPTCHA(valor) {

    valor = document.getElementById("captcha").value;

    let correctAnswer = 1000;

    if (valor.match(correctAnswer)) {
        return verdadero;
    } else {
    return falso;
    }



}

module.exports.login = login;
module.exports.registros = registros;
module.exports.validarCAPTCHA = validarCAPTCHA;
module.exports.agregarRegistro = agregarRegistro;
