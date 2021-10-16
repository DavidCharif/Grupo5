class Book{
    constructor(nombre,autor,descripcion,fechapublicacion, urlImg){
        this._nombre = nombre;
        this._autor = autor;
        this._descripcion = descripcion;
        this._fechapublicacion = fechapublicacion;
        this._urlImg = urlImg;
    }     
}



let listalibros = [];
const edipo = new Book("Edipo Rey", "Sofocles" , "Esta es una novela del género de tragedias que ha sido conocida por ser unas de las mejores obras de Sófocles, si bien es cierto que no tiene una fecha específica de cuando fue creada, se considera que pudo ser escrita alrededor del año 430 a. C, la misma pudo ser representada teatralmente hacia el año 429 a. C.", "429 a. C", "/img/edipo.jpg");
const milyuna = new Book("Las mil y una noches", "Anonimo", "es una recopilación medieval de cuentos tradicionales del Oriente Medio, que utiliza la forma del relato enmarcado. El núcleo de estas historias está formado por un antiguo libro persa llamado Hazâr afsâna (mil leyendas)", "850 d. C","/img/MILYUNA.jpg");
const divinacomedia = new Book("La divina comedia", "Dante Alighieri" ,"La Divina comedia se considera una de las obras maestras de la literatura italiana y universal. Dante resume en ella todo el amplio conocimiento acumulado durante siglos, desde los antiguos clásicos hasta el mundo medieval; su fe religiosa y sus convicciones morales y filosóficas. " , "1304- 1321","/img/divina.jpg" )
listalibros.push(edipo);
listalibros.push(milyuna);
listalibros.push(divinacomedia);


export {listalibros};