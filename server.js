
var express = require("express");
var dbFiles = require("./db.js");
var insertar_registro = dbFiles.insertar_registro
var conexion = dbFiles.conexion;
var path = require("path"); 
var session = require("express-session");
var bodyParser = require('body-parser');


var wikipediaParser = require('./WikipediaParser');
let linia;

let usuario;
let boolLog = false;
let nombre;
let libros;
let libro;
let autores;
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
        conexion.query('SELECT * FROM libros',function(req,res){
    libros = res;
    
})},350)
    setTimeout(()=>{if (boolLog == false){
    nombre =  "";
    respuesta.render("index", {libros, nombre, boolLog});
} else {
    respuesta.render("index", {libros,nombre, boolLog});
}},370)
});

//Pasos necesarios para hacer la web de vista Libros dinamica 


//Duncion que redirecciona segun el numero que recibe de la funcion interna del onclick ejemplo onClick("click_libro(1)")
app.get('/recibir/:number', function(petition, respuesta){
//recibimos el numero lo agregamos con el index a la lista importada
    var number = petition.params.number;   
    /*console.log(number);*/
    setTimeout(()=>{conexion.query('SELECT * FROM libros WHERE idlibro = ?',[number],function(req,res){
        libro = JSON.parse(JSON.stringify(res[0]));}
         
        
        )},300)
        // Se coloca el nombre del archivo ejs vistaInterna y se envia el objeto a ese pagina
        setTimeout(() => {
            
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
		conexion.query('SELECT * FROM Usuarios WHERE Correo = ? AND Contrasena = ?', [username, password], function(error, results, fields) {
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
    conexion.query('SELECT Nombre FROM Usuarios WHERE Correo = ?', [usuario],function(error, results) {
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
//Wiki



app.get("/perfil",function(req,res){
    res.render('vistaUsuario',{nombre,boolLog});
} )

app.get("/autores",function(req,res){
    setTimeout(()=>{
           conexion.query("SELECT author FROM libros ORDER BY author  Asc", function(error,resultado){
            if(error){
                console.log(error)
                
            } else {
              autores   = resultado
               process.nextTick(() => {
        res.render('autores',{nombre,boolLog,autores});
    })
            }
        
           })},100)
    
   
 }) 
app.get("/biografia/:author",function(petition, respuesta) {
    let author = petition.params.author;
    setTimeout(()=>{
            
    wikipediaParser.fetchArticleElements(author).then(function(result)
{
   linia = result;
   process.nextTick(() => {
  //do something
  respuesta.render("biografias",{nombre,boolLog,linia});
})
}).catch(function(error)
{
  console.log(error);
}) },250)


    
})






