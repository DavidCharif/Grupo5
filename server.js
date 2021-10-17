import express from "express" ;
import path from "path";
import { addAbortSignal } from "stream";

//Lista importada de libros.js Contiene un array con todos los libros
import { listalibros } from "../srint1/frontend/scripts/libros.js";
const app = express();
const dirForm = path.resolve("../srint1")
// Iniciamos el servidor en la carpeta con los archivos necesarios
app.use(express.static("frontend"));
// Se inicia el servidor
app.listen("3000", function(){
    console.log("servidor iniciado");
}
);

//Primer request del usuario que retorna el index
app.get("/", function (petition,respuesta){
    respuesta.sendFile(dirForm + "/index.html");
});

//Pasos necesarios para hacer la web de vista Libros dinamica 
app.set('view engine','ejs');
app.set('views', dirForm);

//Duncion que redirecciona segun el numero que recibe de la funcion interna del onclick ejemplo onClick("click_libro(1)")
app.get('/recibir/:number', function(petition, respuesta){
//recibimos el numero lo agregamos con el index a la lista importada
    let number = petition.params.number;   
    let objeto = listalibros[number];
    console.log("entre a la funcion");
    // Se coloca el nombre del archivo ejs vistaInterna y se envia el objeto a ese pagina
    respuesta.render('vistainterna', {mensaje:objeto}) ; 
    }
);

// Devuelve al inicio despues de dar click en inicio en la barra de navegacion
app.get("/inicio", function (petition,respuesta){
    respuesta.sendFile(dirForm + "/index.html");
});