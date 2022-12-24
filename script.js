const $botonEncriptar = document.querySelector("#boton-encriptar");
const $botonDesencriptar = document.querySelector("#boton-desencriptar");

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
