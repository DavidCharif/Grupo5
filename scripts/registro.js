let registros = [];   // Nombre según nuevo instructivo

// Se cambian algunos id a los nuevos según comentario en clase
function agregarRegistro() {
    let usuario = {
        first_name: document.getElementById("nombre").value,
        last_name: document.getElementById("apellido").value,
        phone_number: document.getElementById("telefono").value,
        email: document.getElementById("correo").value,
        user_password: document.getElementById("contrasena").value
    }
    registros.push(usuario);
    // document.forms[0].reset(); lo dejamos comentado para que no moleste
}

// FUNCION FILTRA CORREOS GMAIL.COM
function filtrarCorreo(){
    let gmail = registros.filter(UsuarioGmail => UsuarioGmail.correo.includes('@gmail.com'));
    console.log(gmail);
}

module.exports.registros = registros; // Este no me cuadra
module.exports.filtrarCorreo = filtrarCorreo;
module.exports.ordenarArreglo = ordenarArreglo;
module.exports.agregarRegistro = agregarRegistro;