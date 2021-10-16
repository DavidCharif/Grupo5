import express from "express" ;
import path from "path";
import { addAbortSignal } from "stream";
import { listalibros } from "../srint1/frontend/scripts/libros.js";
const app = express();
const dirForm = path.resolve("C:/Users/David/Desktop/uda/UDEA/Ciclo 3/html/srint1")

app.use(express.static("frontend"));

app.listen("3000", function(){
    console.log("servidor iniciado");
}
);
app.get("/", function (petition,respuesta){
    respuesta.sendFile(dirForm + "/index.html");
});
app.set('view engine','ejs');
app.set('views', dirForm);


app.get('/recibir/:number', function(petition, respuesta){
    let number = petition.params.number;
    
    let objeto = listalibros[number];
    console.log("entre a la funcion");
    respuesta.render('vistainterna', {mensaje:objeto}) ;
    
    /* document.getElementById("fondolibros").innerHTML("<h1> Prueba 2 .0 </h1>");*/
}
);
app.get("/inicio", function (petition,respuesta){
    respuesta.sendFile(dirForm + "/index.html");
});

/*
app.get(`/agregar/:number`, function(petition, respuesta){
    let number = petition.params.number;
    console.log("click");
    console.log(number);
    respuesta.redirect("/");
    

   
})*/