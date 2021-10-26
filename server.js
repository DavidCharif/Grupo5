
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
let nombre = "";
let libros = null;
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
    // si ya esta cargada
    if(libros == null){
     conexion.query('SELECT * FROM libros',function(req,res){
    libros = res;})};
    process.nextTick(()=>{
    
        if (boolLog == false){
            nombre =  '';
            idUsuario = null;
            idLibro = null;
            console.log("no ha iniciado sesion")
        } else {
            nombre = nombre;
            idUsuario = idUsuario;
            idLibro = null;
            console.log("Ya ha iniciado sesion")
            
    }})
    process.nextTick(()=>{
       console.log("Segundo Proceso")
        respuesta.render("index", {libros, nombre, boolLog, isFav});    
      
    })
       });

//Pasos necesarios para hacer la web de vista Libros dinamica 


//Duncion que redirecciona segun el numero que recibe de la funcion interna del onclick ejemplo onClick("click_libro(1)")
app.get('/recibir/:number', function(petition, respuesta){
//recibimos el numero lo agregamos con el index a la lista importada
    idLibro = petition.params.number;   
    /*console.log(number);*/
    
        libro = libros[idLibro];
         console.log(libro);
        console.log(listFavbooks);
        if(listFavbooks != null){
        listFavbooks.forEach((fav) =>{
            console.log("Entro al for each de fav books")
            if (fav.idLibro == libro.idlibro){
                isFav = true;
                console.log("es un libro favorito!")
            }
        })    
        }
        
       
       console.log(`id libro es ${libro.Title}`)
       
               respuesta.render('vistainterna', {libro, nombre, boolLog, isFav})});
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
				nombre = results[0].Nombre;
				console.log(`idUsuario es ${idUsuario}`);
				response.render('index', {nombre,boolLog});
			} else {
				response.send('Incorrect Username and/or Password!');
			}
			process.nextTick(()=>{
        if (idUsuario != null){   
        conexion.query("SELECT * FROM favbooks WHERE idUsuario ='"+idUsuario+"'" ,function(error, resultado) {
                if(error){
                    console.log("No tiene en favoritos");
                } else {
                listFavbooks = resultado;
                    console.log(`El id del usuario es ${idUsuario}`)
                    console.log(`id libro es favorito? ${listFavbooks}`);
                }})
               }})
			response.end();
		});
	}else {
		console.log('Please enter Username and Password!');
		
	}
	 response.render("index", {libros, nombre, boolLog, isFav});
});


    
app.get('/logout', function(req,res){
        nombre = ""
        boolLog = false;
        idUsuario = null;
        console.log("Loggin out")
        res.redirect('/');
    })
//Wiki



app.get("/perfil",function(req,res){
    conexion.query("SELECT * FROM favbooks WHERE idUsuario ='"+idUsuario+"'" ,function(error, resultado) {
                if(error){
                    console.log("No tiene en favoritos");
                } else {
                listFavbooks = resultado;}})
    
    
    
   conexion.query("UPDATE favbooks SET Titulo = (SELECT title FROM libros WHERE favbooks.idLibro = libros.idlibro)",function(error,resultado){
       if(error)
       {console.log("error actualizando lista primera etapa")}
       else {
        console.log("cargando libros 1")}})
        
        process.nextTick(() => {
            conexion.query("UPDATE favbooks SET URLIMG = (SELECT urlImgLocal FROM libros WHERE favbooks.idlibro = libros.idlibro)",function(error, resultado){
            if(error){console.log(error)}
            else {
                console.log("cargando libros 2")
            }})})
        res.render('vistaUsuario',{nombre,boolLog,isFav,listFavbooks})})                            
   
    
    

   
            
        
    


  

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
            isFav = true;
            console.log(`id del libro despues de fav es ${idLibro}`);
            // Actualizamos la lista con informacion necesaria para el funcionamiento
 
        }
   respuesta.redirect("back");
    })
})

app.get("/delFav",function(petition, respuesta) {
     isFav = false;
     nombre = nombre;
     boolLog = boolLog;
     conexion.query("DELETE FROM favbooks WHERE idLibro = ('"+idLibro+"')", function(error, resultados){
        if(error){
            throw error
        } else {
            isFav = false;
            console.log("Eliminado");
            console.log(`id del libro despues de eliminar es ${idLibro}`);
            // Actualizamos la lista con informacion necesaria para el funcionamiento
 
        }
   respuesta.render("vistainterna",{libro,nombre,boolLog,isFav});
    })
})






