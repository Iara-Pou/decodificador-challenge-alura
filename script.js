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

$botonEncriptar.onclick = encriptar;

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

function avisarSiEsVocal (letraComparada){
    return letraComparada === "a" || letraComparada==="e"|| letraComparada==="i"|| letraComparada==="o"|| letraComparada==="u";
}
