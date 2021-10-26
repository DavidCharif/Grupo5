
var express = require("express");
var dbFiles = require("./db.js");
var insertar_registro = dbFiles.insertar_registro
var conexion = dbFiles.conexion;
var path = require("path"); 
var session = require("express-session");
var bodyParser = require('body-parser');


var wikipediaParser = require('./WikipediaParser');
let linia;
let idUsuario;
let usuario;
let boolLog = false;
let nombre;
let libros;
let libro;
let idLibro;
let autores;
let favbooks;
let listFavbooks;
let mensaje;
let isFav = false;
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
     conexion.query('SELECT * FROM libros',function(req,res){
    libros = res;})
    process.nextTick(()=>{
    console.log("Primer then")
        if (boolLog == false){
            nombre =  "";
            idUsuario = null;
            isFav = false;
        } else {
            nombre = nombre;
            idUsuario = idUsuario;
            
    }})
    process.nextTick(()=>{
       console.log("Segundo then")
        respuesta.render("index", {libros, nombre, boolLog, isFav});    
      
    })
       });

//Pasos necesarios para hacer la web de vista Libros dinamica 


//Duncion que redirecciona segun el numero que recibe de la funcion interna del onclick ejemplo onClick("click_libro(1)")
app.get('/recibir/:number', function(petition, respuesta){
//recibimos el numero lo agregamos con el index a la lista importada
    var number = petition.params.number;   
    /*console.log(number);*/
    conexion.query('SELECT * FROM libros WHERE idlibro = ?',[number],function(req,res){
        libro = res[0];
       idLibro = libro.idlibro;
       console.log(`id libro es ${idLibro}`)
        if (idUsuario != null){   
        process.nextTick(()=>{
        conexion.query("SELECT * FROM favbooks WHERE idLibro = '"+idLibro+"'AND idUsuario ='"+idUsuario+"'" ,function(error, resultado) {
                if(error){
                    console.log("No esta en favoritos");
                } else {
                    isFav = true;
                    console.log(`El id del usuario es ${idUsuario}`)
                    console.log(`id libro es favorito? ${isFav}`);
                }})
               })} 
               
                    
        })
        process.nextTick(()=>{
               respuesta.render('vistainterna', {libro, nombre, boolLog, isFav})})
});
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
				idUsuario = results[0].IdUsuario;
				console.log(`idUsuario es ${idUsuario}`);
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
        idUsuario = null;
        console.log("Loggin out")
        res.redirect('/');
    })
//Wiki



app.get("/perfil",function(req,res){
 
    if (isFav){
      conexion.query("UPDATE favbooks SET Titulo = (SELECT title FROM libros WHERE favbooks.idLibro = libros.idlibro)",
       function(error,resultado){
       if(error)
       {console.log("error actualizando lista primera etapa")}
       else {
        console.log("cargando libros 1")
        process.nextTick(() => {
        conexion.query("UPDATE favbooks SET URLIMG = (SELECT urlImgLocal FROM libros WHERE favbooks.idlibro = libros.idlibro)",function(error, resultado) {
            if(error){console.log(error)}
            else {console.log("cargando libros 2")
            favbooks = resultado; 
            process.nextTick(() => {
                       conexion.query("SELECT * FROM favbooks WHERE idUsuario = '"+idUsuario+"'",function(error,resultado){
                           process.nextTick(()=>{
                            favbooks = resultado;
                            console.log("Se termino de procesar la informacion");
                            res.render('vistaUsuario',{nombre,boolLog,isFav,favbooks});})})})}})})}})}
                            res.render('vistaUsuario',{nombre,boolLog,isFav,favbooks})
                            }
                            )
   
    
    

   
            
        
    


  

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
}) },250)})

app.get("/addFav",function(petition, respuesta) {
    conexion.query("INSERT INTO favbooks(idUsuario,idLibro) VALUES ('"+idUsuario+"','"+idLibro+"')", function(error, resultados){
        if(error){
            throw error
        } else {
            console.log("Agregado a fav");
            // Actualizamos la lista con informacion necesaria para el funcionamiento
 
        }
   respuesta.redirect("back");
    })
})

app.get("/delFav",function(petition, respuesta) {
     conexion.query("DELETE FROM favbooks WHERE idLibro = ('"+idLibro+"')", function(error, resultados){
        if(error){
            throw error
        } else {
            isFav = false;
            console.log("Eliminado");
            // Actualizamos la lista con informacion necesaria para el funcionamiento
 
        }
   respuesta.redirect("back");
    })
})






