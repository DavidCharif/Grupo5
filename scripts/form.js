<<<<<<< HEAD
// Aquí comienza la validación de la contraseña
function checkContrasena() {
    
    let password = document.getElementById("pswd").value;
    let upperCaseValidation = /[A-Z]/g;
    let lowerCaseValidation = /[a-z]/g;
    let numberValidation = /[0-9]/g;

    if (password.length != 0) {
        if (password.match(upperCaseValidation)) {
            if (password.match(lowerCaseValidation)) {
                if (password.match(numberValidation)) {
                    if (password.length >= 8) {
                        alert("Contraseña ingresada correctamente");
                    }
                }
            }
        }
    } else {
        alert("La contraseña debe contener mínimo:\nUna (1) mayúscula,\nUna (1) minúscula,\nUn (1) número,\nOcho (8) ó más caracteres.");
    }
}
=======
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
>>>>>>> 0426bd462e633821d4716156105975f86b4798b8
