function checkTelefono(){
    /*y = x.value;*/
    let x = document.getElementById("telefono");
    let y = document.getElementById("telefono").value;
    if (y.length > 7 || y.length < 7){
        x.style.background = "red";
        return false;}
    else if (y.length == 7){
        x.style.background = "lightgreen";
        return true; }
    }

function checkContrasena() {
    let x = document.getElementById("password");
    let password = document.getElementById("password").value;


    let upperCaseValidation = /[A-Z]/g;
    let lowerCaseValidation = /[a-z]/g;
    let numberValidation = /[0-9]/g;
 
    if (password.length != 0) {

        if (password.match(upperCaseValidation)) {
            if (password.match(lowerCaseValidation)) {
                if (password.match(numberValidation)) {
                    if (password.length >= 8) {

                        x.style.background = "lightgreen";
                        alert("Contraseña ingresada correctamente");
                        return true;

                }
            }
        }
    } else {

    x.style.background = "red";
    alert("La contraseña debe contener mínimo:\nUna (1) mayúscula,\nUna (1) minúscula,\nUn (1) número,\nOcho (8) ó más caracteres.");
    return false;
    }

    }
}

//Funcion para validar Apellido

function checkApellido(){
    let valor = document.getElementById("apellidos");
    let lastname = document.getElementById("apellidos").value;
    /*let lastname = valor.value;*/
    let alphabet = /^[A-Za-z]+$/;
    if (lastname != ""){
        if(lastname.match(alphabet)) {
            if(lastname.length >=4 && lastname.length<=30){
                alert("APELLIDO CORRECTO");
                valor.style.background = "lightgreen";
                return true; 
            }
            else{
                alert("DEBE SER MAYOR DE 4 Y MENOR DE 7 ");
                valor.style.background = "red";
                return false;
            }
        }
        else {
            alert("INGRESE SOLO ALFABETO");
            valor.style.background = "red";
            return false;
        }
    }
    else{
        alert("CAMPO NULO");
        valor.style.background = "red";
        return false;
    }
}


module.exports= {checkApellido, checkContrasena,checkTelefono};