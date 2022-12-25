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

for(let i = 0; i<textoIngresado.length; i++){
    //distinguir si es vocal o no
    const letra = textoIngresado[i];
    const esVocal = avisarSiEsVocal(letra)
}

}

function avisarSiEsVocal (letraComparada){
    return letraComparada === "a" || letraComparada==="e"|| letraComparada==="i"|| letraComparada==="o"|| letraComparada==="u";
}
