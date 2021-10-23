
import express from 'express';
import {insertar_registro, conexion} from './db.js';
import path from 'path';
import session from 'express-session';
import bodyParser from 'body-parser';
let connection = conexion;

let usuario;
let boolLog = false;
let nombre;
let libros;
let libro;

const app = express();
const dirForm = path.resolve("frontend/")
// Iniciamos el servidor en la carpeta con los archivos necesarios
app.use(express.static("frontend"));
// Se inicia el servidor
app.listen("8080", function(){
    console.log("servidor iniciado ");
    
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());




app.set('view engine','ejs');
app.set('views', dirForm);
//Primer request del usuario que retorna el index
app.get("/", function (petition,respuesta){
        
    setTimeout(()=>{
        connection.query('SELECT * FROM libros',function(req,res){
    libros = res;
    
})},300)
    setTimeout(()=>{if (boolLog == false){
    nombre =  "";
    respuesta.render("index", {libros, nombre, boolLog});
} else {
    respuesta.render("index", {libros,nombre, boolLog});
}},320)
});

//Pasos necesarios para hacer la web de vista Libros dinamica 


//Duncion que redirecciona segun el numero que recibe de la funcion interna del onclick ejemplo onClick("click_libro(1)")
app.get('/recibir/:number', function(petition, respuesta){
//recibimos el numero lo agregamos con el index a la lista importada
    var number = petition.params.number;   
    console.log(number);
    setTimeout(()=>{conexion.query('SELECT * FROM libros WHERE idlibro = ?',[number],function(req,res){
        libro = JSON.parse(JSON.stringify(res[0]));}
         
        
        )},300)
        // Se coloca el nombre del archivo ejs vistaInterna y se envia el objeto a ese pagina
        setTimeout(() => {
            console.log(libro[0])
    respuesta.render('vistainterna', {libro, nombre, boolLog}) ;
        },310)
      }
);

// Devuelve al inicio despues de dar click en inicio en la barra de navegacion


app.get("/registrar", function (petition,respuesta){
   
    respuesta.sendFile(dirForm + "/registro.html");
});

app.post('/post', function(request, respuesta)
{
    let nombre = request.body.user_name;
    let apellido = request.body.user_last_name;
    let telefono = request.body.user_phone_number;
    let correo = request.body.user_email;
    let contrasena = request.body.user_password;
    
    if (correo.length > 0) {
        conexion.query('SELECT Correo FROM Usuarios WHERE Correo = ?',[correo],function(error, results, fields) {
            
            if (results.length > 0){
                
                console.log("El usuario ya existe")
                
                return false;
            } else {
                insertar_registro(nombre, apellido, telefono, correo, contrasena);
                console.log("Ingresando a URL agregar");
                boolLog = true;
                
                respuesta.render('index',{nombre,boolLog});            
            }
        })
        // body...
    }
    
});



app.get("/login", function (petition,respuesta){
    
    respuesta.render("login",{nombre,boolLog});
});


app.post('/auth', function(request, response) {
    console.log("Se ingreso a validar el usuario y contrasena");
    
	var username = request.body.username;
	var password = request.body.password;
	
	if (username && password) {
		connection.query('SELECT * FROM Usuarios WHERE Correo = ? AND Contrasena = ?', [username, password], function(error, results, fields) {
		    if (error){console.log(error)}
		 
			if (results.length > 0) {
				usuario = username;
				boolLog = true;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	}else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/home', function(request, response) {
    console.log(`se ingresa al home y la variable empieza siendo ${usuario}`)
    if (boolLog) {
    connection.query('SELECT Nombre FROM Usuarios WHERE Correo = ?', [usuario],function(error, results) {
		      nombre = JSON.parse(JSON.stringify(results[0])); 
		      nombre = nombre.Nombre;
		      boolLog = true;
            response.redirect('/');
    })}})
    
app.get('/logout', function(req,res){
        nombre = ""
        boolLog = false;
        console.log("Loggin out")
        res.redirect('/');
    })
    /*

app.get('/employee/salary', (req, res) => {
  
    // Render method takes two parameter
    // first parameter is the ejs file to 
    // render second parameter is an 
    // object to send to the ejs file
    res.render('index.ejs', { empSalary: empSalary });
})
*/
export {nombre};

app.get("/perfil",function(req,res){
    res.render('vistaUsuario',{nombre,boolLog});
} )




