<<<<<<< HEAD
var registros = [];   // Este es el nombre que se le dio a la lista
=======
let registros = [];   // Nombre según nuevo instructivo
>>>>>>> 8d62401657ed24a6e69205e605ecab9d4d700f39

// Se cambian algunos id a los nuevos según comentario en clase
function agregarRegistro() {
     
    let usuario = {
<<<<<<< HEAD
        nombre  : document.getElementById("nombre").value,
        apellido: document.getElementById("apellidos").value,
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("correo").value,
        contrasena: document.getElementById("password").value
    }
    listadeUsuarios.push(usuario);
     // Limpia los campos del registro
=======
        first_name: document.getElementById("nombre").value,
        last_name: document.getElementById("apellido").value,
        phone_number: document.getElementById("telefono").value,
        email: document.getElementById("correo").value,
        user_password: document.getElementById("contrasena").value
    }
    registros.push(usuario);
    // document.forms[0].reset(); lo dejamos comentado para que no moleste
>>>>>>> 8d62401657ed24a6e69205e605ecab9d4d700f39
}

// FUNCION FILTRA CORREOS GMAIL.COM
function filtrarCorreo(){
<<<<<<< HEAD
    let gmail = listadeUsuarios.filter(UsuarioGmail => UsuarioGmail.email.includes('@gmail.com'));
    console.log(gmail);
}

module.exports.registros = registros;
module.exports.ordenarArreglo = ordenarArreglo;
module.exports.filtrarCorreo = filtrarCorreo;
=======
    let gmail = registros.filter(UsuarioGmail => UsuarioGmail.correo.includes('@gmail.com'));
    console.log(gmail);
}

module.exports.registros = registros; // Este no me cuadra
module.exports.filtrarCorreo = filtrarCorreo;
module.exports.ordenarArreglo = ordenarArreglo;
>>>>>>> 8d62401657ed24a6e69205e605ecab9d4d700f39
module.exports.agregarRegistro = agregarRegistro;