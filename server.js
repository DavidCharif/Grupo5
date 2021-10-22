
import express from 'express';
import {insertar_registro, conexion} from './db.js';
import path from 'path';
import session from 'express-session';
import listalibro from "./frontend/scripts/libros.js"
import bodyParser from 'body-parser';
let connection = conexion;

let usuario;
let boolLog = false;
let nombre;



//Lista importada de libros.js Contiene un array con todos los libros
var listaImportado = listalibro;

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
if (boolLog == false){
    console.log(`boolLog is ${boolLog}`);
    boolLog = false;
    nombre =  "";
    respuesta.render("index", {nombre, boolLog});
} else {
    console.log(`boolLog is ${boolLog}`)
    console.log(`${nombre}`)
    
    respuesta.render("index", {nombre, boolLog});
}

    
});

//Pasos necesarios para hacer la web de vista Libros dinamica 


//Duncion que redirecciona segun el numero que recibe de la funcion interna del onclick ejemplo onClick("click_libro(1)")
app.get('/recibir/:number', function(petition, respuesta){
//recibimos el numero lo agregamos con el index a la lista importada

    let number = petition.params.number;   
    let objeto = listalibros[number];
    
    
    // Se coloca el nombre del archivo ejs vistaInterna y se envia el objeto a ese pagina
    respuesta.render('vistainterna', {mensaje:objeto, nombre,boolLog}) ; 
   
    }
    
);

// Devuelve al inicio despues de dar click en inicio en la barra de navegacion


app.get("/registrar", function (petition,respuesta){
    console.log("Se ingreso al registro");
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
    console.log("Se accedio al login");
    respuesta.render("login",{nombre,boolLog});
});


app.post('/auth', function(request, response) {
    console.log("Se ingreso a validar el usuario y contrasena");
    
	var username = request.body.username;
	var password = request.body.password;
	console.log(username, password);
	if (username && password) {
		connection.query('SELECT * FROM Usuarios WHERE Correo = ? AND Contraseña = ?', [username, password], function(error, results, fields) {
		 
			if (results.length > 0) {
				usuario = username;
				boolLog = true;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
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
		      
            response.render('index',{nombre, boolLog});
    })}})
    
app.get('/logout', function(req,res){
        nombre = ""
        boolLog = false;
        console.log("Loggin out")
        res.render('index',{nombre, boolLog});
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








/* lista */

class Book{
    constructor(nombre,autor,descripcion,fechapublicacion, urlImg,urlLibro){
        this._nombre = nombre;
        this._autor = autor;
        this._descripcion = descripcion;
        this._fechapublicacion = fechapublicacion;
        this._urlImg = urlImg;
        this._urlLibro = urlLibro;
    }     
}



let listalibros = [];
const edipo = new Book("Edipo Rey", "Sofocles" , "Esta es una novela del género de tragedias que ha sido conocida por ser unas de las mejores obras de Sófocles, si bien es cierto que no tiene una fecha específica de cuando fue creada, se considera que pudo ser escrita alrededor del año 430 a. C, la misma pudo ser representada teatralmente hacia el año 429 a. C.", "429 a. C", "/img/edipo.jpg","/librosHtml/Sofocles/63509-h.htm");
const milyuna = new Book("Las mil y una noches", "Anonimo", "es una recopilación medieval de cuentos tradicionales del Oriente Medio, que utiliza la forma del relato enmarcado. El núcleo de estas historias está formado por un antiguo libro persa llamado Hazâr afsâna (mil leyendas)", "850 d. C","/img/MILYUNA.jpg","/librosHtml/Anonimo/Milyunanoches1/47287-h.htm");
const divinacomedia = new Book("La divina comedia", "Dante Alighieri" ,"La Divina comedia se considera una de las obras maestras de la literatura italiana y universal. Dante resume en ella todo el amplio conocimiento acumulado durante siglos, desde los antiguos clásicos hasta el mundo medieval; su fe religiosa y sus convicciones morales y filosóficas. " , "1304- 1321","/img/divina.jpg" , "/librosHtml/Dante/divinaComedia/57303-h.htm" );
const azul = new Book("Azul","Ruben Dario", "Azul... es un libro de cuentos y poemas del poeta nicaragüense Rubén Darío, considerada una de las obras más relevantes del modernismo hispánico. ", "1888","/img/rubendario.jpg","/librosHtml/RubenDario/Azul/52894-h.htm");
const poemas = new Book("Poemas","Edgar Allan Poe","La influencia de Poe en el arte universal ha sido suficientemente honda y transcendente para que su nombre y su obra no sean a la continua recordados. Desde su muerte acá, no hay año casi en que, ya en el libro o en la revista, no se ocupen del excelso poeta americano, críticos, ensayistas y poetas. La obra de Ingram iluminó la vida del hombre; nada puede aumentar la gloria del soñador maravilloso. Por cierto que la publicación de aquel libro, cuya traducción a nuestra lengua hay que agradecer al Sr. Mayer, estaba destinada al grueso público.","1919", "/img/poemasEdgar.jpg","/librosHtml/EdgarAllanPoe/Poemas/25807-h.htm");
const HistoriaDeDosCiudades = new Book("Historia de dos ciudades", "Charles Dickenks", "Historia de dos ciudades (título original, A Tale of Two Cities) es una novela del escritor británico Charles Dickens. En esta novela histórica se narra la vida en el siglo XVIII, en la época de la Revolución francesa. La historia se desarrolla en dos países: Inglaterra y Francia, y en las ciudades de Londres y París en la época de los albores de la Revolución francesa. La primera ciudad simbolizaría de algún modo la paz y la tranquilidad, la vida sencilla y ordenada; mientras la segunda representaría la agitación, el desafío y el caos, el conflicto entre dos mundos en una época en la que se anuncia drásticos cambios sociales.", "1859","/img/historiadesosciudades.jpg","/librosHtml/CharlesDIckens/HistoriaDeDosCiudades/new61887-h.htm")
const GoyaDesastres = new Book("Los desastres de la guerra","Goya","El nombre de Goya es bien conocido de todos los amantes de las Artes, y ha volado por España y fuera de ella acompañado de una fama merecida: á pesar de la poca justicia con que generalmente son juzgados los hombres de mérito verdadero por sus contemporáneos, la generación que concluye, que le conoció y trató en su vigor, la que hoy média su camino, que le alcanzó en sus últimos años, y la que comienza su carrera artística y ha visto sus obras y oido hablar do él á sus padres y á sus maestros, todas unánimes le conceden un honroso lugar en la série larga y brillante de los artistas españoles.","1863","/img/desastresGuerra.jpg","/librosHtml/Goya/LosdesastresDeLaGuerra/60117-h.htm");
const LadronesDeLondres = new Book("Los ladrones de Londres - OliverTwist","Charles Dickens","ENTRE las concepciones mas celebradas del genio literario moderno, merece sin disputa lugar preferente la novela del fecundo y fantástico autor cuya version hemos osado hacer en el lenguage patrio. En efecto, con ella el célebre inglés Cárlos Díckens ha hecho inmarcescible la corona gloriosa que ciñe su frente. Digno discípulo del gran Schakspeare y émulo aventajado del inmortal Cervantes, ha logrado reunir en la presente obra los dos tipos sublimes de estos padres de la literatura actual.","1857","/img/ladroneslondres.jpg","/librosHtml/CharlesDIckens/LadronesdeLondres/62201-h.htm");
const Salambo = new Book("Salambo","Gustave Flaubert","Casi todos los personajes principales de la novela son históricos. Del lado cartaginés sobresalen Amílcar Barca y su joven hijo Aníbal, y los generales Hannón y Giscón. Por parte los mercenarios, tanto sus jefes, Matho, Espendio, Autarito como el númida Narr'Havas también existieron. Solo la protagonista principal, Salambó, supuesta hija de Amílcar y hermana mayor de Aníbal, es ficticia. Es un personaje que Flaubert tuvo que inventarse para poder articular en torno a ella una trama amorosa que animara la novela. Si bien trama amorosa es ficticia, no lo son así los hechos militares, con su sucesión de revueltas, batallas, asedios, armas y máquinas de guerra. Y en cuanto a los detalles geográficos y la reconstrucción del aspecto urbano de Cartago, Flaubert hace grandes esfuerzos por inventar lo menos posible, limitándose a dar vida a los datos históricos y a los restos arqueológicos","1862","/img/salambo.jpg","/librosHtml/GustaveFlaubert/Salambo/66285-h.htm");
const laIliada = new Book("La ilíada","Homero","No sin temor pongo en tus manos esta versión en prosa del inmortal poema homérico compuesto hace treinta siglos[1] y no superado aún por otro alguno; epopeya sin par y cuadro fiel de los orígenes históricos de aquella cultura helénica que tanto influyó en la romana, y más tarde, ya directamente, ya por medio de esta última, en la de casi todos los pueblos civilizados.","Desconocido","/img/lailiada.jpg","/librosHtml/homero/lailiada/57654-h.htm");
const CrimenYCastigo = new Book("Crimen y Castigo", "Fyodor Dostoyevsky", "Crimen y castigo es una novela de carácter psicológico escrita por el autor ruso Fiódor Dostoyevski. Fue publicada por primera vez, por entregas, en la revista El mensajero ruso, en 1866, en doce partes, y publicada después como libro.2​3​ Junto con Guerra y paz de León Tolstói, se considera una de las novelas más influyentes e internacionales de la literatura rusa. Asimismo, los diálogos mantenidos entre el protagonista, Raskólnikov, y el inspector de policía son considerados por algunos autores, como el prestigioso literato Stefan Zweig, una de las cimas de la literatura universal." , "1866", "/img/crimenycastigo.jpg","/librosHtml/FyodorDostoyvsky/CrimenYCastigo/61851-h.htm" );

listalibros.push(edipo);
listalibros.push(milyuna);
listalibros.push(divinacomedia);
listalibros.push(azul);
listalibros.push(poemas);
listalibros.push(HistoriaDeDosCiudades);
listalibros.push(GoyaDesastres);
listalibros.push(LadronesDeLondres);
listalibros.push(Salambo);
listalibros.push(laIliada);
listalibros.push(CrimenYCastigo);