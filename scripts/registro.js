let listadeUsuarios = [];   // Este es el nombre que se le dio a la lista

class Usuario{
    constructor(nombre,apellido,telefono,correo,password){
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.correo = correo;
        this.password = password;
    }
   
}

function agregarRegistro(){
    let nombre= document.getElementById("nombre").value;
    let apellido = document.getElementById("apellidos").value;
    let telefono = document.getElementById("telefono").value;
    let correo = document.getElementById("correo").value;
    let password = document.getElementById("password").value;
    
    let usuario1 = new Usuario(nombre,apellido,telefono,correo,password);
    listadeUsuarios.push(usuario1);            
    console.log(usuario1.nombre + " Se agrego ");            
    console.log(listadeUsuarios);
    alert("El usuario " + usuario1.nombre + " se agrego correctamente");
    return false;
    
}
// FUNCION FILTRA CORREOS GMAIL.COM
function filtrarCorreo(){
    let gmail = listadeUsuarios.filter(UsuarioGmail => UsuarioGmail.correo.includes('@gmail.com'));
    console.log(gmail);
}

module.exports={agregarRegistro,filtrarCorreo};