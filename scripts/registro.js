let listadeUsuarios = [];   // Este es el nombre que se le dio a la lista

/* La siguiente es una forma de crear objetos y hacer arrays que me pareció más
eficiente, comentarios son siempre bienvenidos. Aclarar si los id están correctos */
function agregarRegistro() {
    let usuario = {
        first_name: document.getElementById("nombre").value,
        last_name: document.getElementById("apellidos").value,
        phone_number: document.getElementById("telefono").value,
        email: document.getElementById("correo").value,
        user_password: document.getElementById("password").value
    }
    listadeUsuarios.push(usuario);
    document.forms[0].reset();  // Limpia los campos del registro
}

// FUNCION FILTRA CORREOS GMAIL.COM
function filtrarCorreo(){
    let gmail = listadeUsuarios.filter(UsuarioGmail => UsuarioGmail.correo.includes('@gmail.com'));
    console.log(gmail);
}

module.exports={agregarRegistro,filtrarCorreo};