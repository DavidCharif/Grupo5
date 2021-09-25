function checkTelefono(x){
    y = x.value;
    if (y.length > 7 || y.length < 7){
        x.style.background = "red";
        return false;}
    else if (y.length == 7){
        x.style.background = "lightgreen";
        return true; }
    }
/*
export { checkTelefono}
*/
function checkContrasena(x) {
    let password = x.value;
    /*let password = document.getElementById("pswd").value;*/


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

function checkApellido(valor){
    let lastname = valor.value;
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