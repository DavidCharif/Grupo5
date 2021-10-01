var registros = [];   // Este es el nombre que se le dio a la lista

/* La siguiente es una forma de crear objetos y hacer arrays que me pareció más
eficiente, comentarios son siempre bienvenidos. Aclarar si los id están correctos */
function agregarRegistro() {
     
    let usuario = {
        nombre  : document.getElementById("nombre").value,
        apellido: document.getElementById("apellidos").value,
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("correo").value,
        contrasena: document.getElementById("password").value
    }
    listadeUsuarios.push(usuario);
     // Limpia los campos del registro
}

// FUNCION FILTRA CORREOS GMAIL.COM
function filtrarCorreo(){
    let gmail = listadeUsuarios.filter(UsuarioGmail => UsuarioGmail.email.includes('@gmail.com'));
    console.log(gmail);
}

module.exports.registros = registros;
module.exports.ordenarArreglo = ordenarArreglo;
module.exports.filtrarCorreo = filtrarCorreo;
module.exports.agregarRegistro = agregarRegistro;