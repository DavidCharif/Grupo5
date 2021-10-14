let registros = [];

function login() {

}

function agregarRegistro() {

}

function validarCAPTCHA(valor) {

    valor = document.getElementById("captcha").value;

    let correctAnswer = 1000;

    if (valor.match(correctAnswer)) {
        return verdadero;
    } else {
    return falso;
    }



}

module.exports.login = login;
module.exports.registros = registros;
module.exports.validarCAPTCHA = validarCAPTCHA;
module.exports.agregarRegistro = agregarRegistro;