import mysql from 'mysql';
var conexion = mysql.createConnection(
    {
        host:'localhost',
        database:'basedatoslibros',
        user:'root',
        password:''
    }
);

conexion.connect(function(error)
    {
        if(error)
        {
            throw error;
        }
        else 
        {
            console.log("Conexión exitosa al sql");
        }        
    }
);
;

/* Insertar Usuario */
function insertar_registro(nombre, apellido, telefono, correo, contrasena) {
    conexion.query("INSERT INTO Usuarios(Nombre, Apellido, Telefono, Correo, Contraseña) VALUES ('"+nombre+"' , '"+apellido+"', '"+telefono+"', '"+correo+"', '"+contrasena+"')", function(error, resultados)
        {
            if(error)
            {
                throw error;
            }
            else
            {
                console.log("Registro exitoso de parte del query");
            }        
        }
    );
}

/* Consultar tabla*/










export {insertar_registro,  conexion};
/*
conexion.end();*/