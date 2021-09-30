let listadeUsuarios = [];


class Usuario{
    constructor(nombre,apellido,telefono,correo,password){
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.correo = correo;
        this.password = password;
    }
   
}

// FUNCION FILTRA CORREOS GMAIL.COM
function filtrarCorreo(){
    let gmail = listadeUsuarios.filter(UsuarioGmail => UsuarioGmail.correo.includes('@gmail.com'));
    console.log(gmail);
}