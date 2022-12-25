const $botonEncriptar = document.querySelector("#boton-encriptar");
const $botonDesencriptar = document.querySelector("#boton-desencriptar");
const CODIFICACION = {
    VOCAL_A_CODIGO : {
        "a": "ai",
        "e": "enter",
        "i":"imes",
        "o":"ober",
        "u": "ufat"
    },
    CODIGO_A_VOCAL : {
        "ai":"a",
        "enter":"e",
        "imes":"i",
        "ober":"o",
        "ufat": "u"
    }
}

$botonEncriptar.onclick = manejarEncriptado;
$botonDesencriptar.onclick = manejarDesencriptado;

function manejarEncriptado(){
    const textoIngresado = document.querySelector("#textarea-ingreso").value;
    const esExito = verificar(textoIngresado) === "";
    
    if(esExito){
        mostrarResultado(encriptarTexto(textoIngresado));
    } else {
        const errorInput = verificar(textoIngresado)
        mostrarError(errorInput); 
    }
}

function manejarDesencriptado(){
    const textoIngresado = document.querySelector("#textarea-ingreso").value;
    const esExito = verificar(textoIngresado) === "" && verificarEncriptado(textoIngresado) === "";

    if(esExito){
        mostrarResultado(desencriptarTexto(textoIngresado));
        //aprovecho que un String completo sea truthy:
        // Boolean("El mensaje no está encriptado.") --> truthy, entonces entra en esa condición
    } else if (verificar(textoIngresado)) {
        const error = verificar(textoIngresado)
        mostrarError(error);  
    } else if((verificarEncriptado(textoIngresado))){
        const error = verificarEncriptado(textoIngresado);
        mostrarError(error); 
    }

}

function mostrarError (textoError){
    const SIGNO_INFORMACION = "🛈";
    const error = document.querySelector("#error");

    error.classList.remove("oculto");
    error.textContent = SIGNO_INFORMACION + textoError;
}

function encriptar (){
const textoIngresado = document.querySelector("#textarea-ingreso").value;
let textoEncriptado = "";
function encriptarTexto(textoIngresado) {
    let textoEncriptado = textoIngresado;

    vocales = Object.keys(CODIFICACION.VOCAL_A_CODIGO);
    vocales.forEach(vocal => {
        if(textoIngresado.includes(vocal)){
            const encriptado = CODIFICACION.VOCAL_A_CODIGO[vocal];
            textoEncriptado= textoEncriptado.replaceAll(vocal, encriptado);
        }
    });

    return textoEncriptado;
}

function desencriptarTexto(textoIngresado){
    let textoDesencriptado = textoIngresado;

    codigosVocales = Object.keys(CODIFICACION.CODIGO_A_VOCAL);
    codigosVocales.forEach(codigo => {
        if(textoDesencriptado.includes(codigo)){
            const traduccion = CODIFICACION.CODIGO_A_VOCAL[codigo];
            textoDesencriptado= textoDesencriptado.replaceAll(codigo, traduccion);
        }
    });

    return textoDesencriptado;
}


function verificar(textoIngresado){
    if(textoIngresado.trim() === ""){
        return "El texto debe contener un carácter o más.";
    } else if(! /^[a-z1-9+-¿?¡!.,]*$/.test(textoIngresado)){
        return "Solo puedes ingresar letras en minúsculas y sin acentos.";
    } else {
        return "";
    }
}

function verificarEncriptado(textoIngresado){
    if (!/(ai)|(enter)|(imes)|(ober)|(ufat)/.test(textoIngresado)){
        return "El mensaje no está encriptado."
    } 
    return "";
}

function mostrarResultado(traduccion){
        //esconder sin resultado
    const $contenedorSinTexto = document.querySelector("#no-encontrado");
    $contenedorSinTexto.classList.add("oculto")
        //mostrar resultado
    const $contenedorTexto = document.querySelector("#encontrado");
    $contenedorTexto.classList.remove("oculto");
        //rellenar el p
    const textoFinal = document.querySelector("#texto-final");
    textoFinal.textContent = traduccion;
}


