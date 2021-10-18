let registros = [{ correo: "juan@gmail.com", contrasena: "SecurePassword123" }];


function agregarRegistro() {
    
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let telefono = document.getElementById("telefono").value;
    let correo = document.getElementById("correo").value;
    let contrasena = document.getElementById("contrasena").value;
    let usuario = {nombre,apellido,telefono,correo,contrasena};
    
    registros.push(usuario);
    // document.forms[0].reset(); lo dejamos comentado para que no moleste
}

function login() {
    let correo = document.getElementById("correo").value; 
    let contrasena = document.getElementById("contrasena").value;    
    let usuario = registros.some(usuario => usuario.correo === correo && usuario.contrasena === contrasena);
        if (usuario === true) {            
            return true;
            
        }
        else {
            console.log("False");
        return false;
        }
}


function validarCAPTCHA(valor) {
   let correctAnswer = 1000;

    if (valor == correctAnswer) {
        return true;
    } else {
    return false;
    }



}

module.exports.registros = registros;
module.exports.login = login;

module.exports.validarCAPTCHA = validarCAPTCHA;
module.exports.agregarRegistro = agregarRegistro;
