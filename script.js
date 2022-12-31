const $botonEncriptar = document.querySelector("#boton-encriptar");
const $botonDesencriptar = document.querySelector("#boton-desencriptar");
const $botonCopiar = document.querySelector("#boton-copiar");
const VOCAL_A_CODIGO = {
    "a": "ai",
    "e": "enter",
    "i": "imes",
    "o": "ober",
    "u": "ufat"
}

$botonEncriptar.onclick = manejarEncriptado;
$botonDesencriptar.onclick = manejarDesencriptado;
$botonCopiar.onclick = copiarTexto;

function copiarTexto(){
    let texto = document.querySelector('#texto-final').textContent;
    navigator.clipboard.writeText(texto);
}

function manejarEncriptado() {
    const textoIngresado = document.querySelector("#textarea-ingreso").value;
    const esExito = verificar(textoIngresado) === "";

    if (esExito) {
        reiniciarTextarea();
        esconderErrores();
        mostrarResultado(encriptarTexto(textoIngresado));
    } else {
        const errorInput = verificar(textoIngresado)
        mostrarError(errorInput);
    }
}

function manejarDesencriptado() {
    const textoIngresado = document.querySelector("#textarea-ingreso").value;
    const esExito = verificar(textoIngresado) === "" && verificarEncriptado(textoIngresado) === "";

    if (esExito) {
        reiniciarTextarea();
        esconderErrores();
        mostrarResultado(desencriptarTexto(textoIngresado));
        //aprovecho que un String completo sea truthy:
        // Boolean("El mensaje no está encriptado.") --> truthy, entonces entra en esa condición
    } else if (verificar(textoIngresado)) {
        const error = verificar(textoIngresado)
        mostrarError(error);
    } else if ((verificarEncriptado(textoIngresado))) {
        const error = verificarEncriptado(textoIngresado);
        mostrarError(error);
    }

}

function esconderErrores() {
    const error = document.querySelector("#error");
    error.classList.add("oculto");
}

function reiniciarTextarea() {
    const textoIngresado = document.querySelector("#textarea-ingreso");
    textoIngresado.value = "";
    textoIngresado.focus();
}

function mostrarError(textoError) {
    const SIGNO_INFORMACION = "🛈";
    const error = document.querySelector("#error");

    error.classList.remove("oculto");
    error.textContent = SIGNO_INFORMACION + textoError;
}

function encriptarTexto(textoIngresado) {
    let textoEncriptado = "";

    for(let indiceLetra = 0; indiceLetra< textoIngresado.length; indiceLetra++){
        const letra = textoIngresado[indiceLetra];
        if(avisarSiEsVocal(letra)){
            const codigo = VOCAL_A_CODIGO[letra];
            textoEncriptado += codigo;
        } else {
            textoEncriptado += letra;
        }

    }

    return textoEncriptado;

    }

function avisarSiEsVocal(letra) {
    return letra === "a" || letra === "e" || letra === "i" || letra === "o" || letra === "u";
}

function desencriptarTexto(textoIngresado) {
    let textoDesencriptado = "";

    for (let indiceLetra = 0; indiceLetra < textoIngresado.length; indiceLetra++) {
        const letra = textoIngresado[indiceLetra];

        if (avisarSiEsVocal(letra)) {
        const vocal = letra;
        const codigoVocal = VOCAL_A_CODIGO[vocal];

        /*al indiceLetra que itera, le sumo la longitud del códigoVocal en el textoIngresado, para saltear la parte encriptada y no desencriptar más veces que las necesarias. Le resta uno al total del length del código, porque en cada iteración el for ya suma uno al índice por default.
            
            Por ejemplo de "enter" sale "e", solo tiene que contar la primera e, la segunda no. 
            (e)nter -> e
            (e)nt(e)r -> ee

        */
       
        indiceLetra += codigoVocal.length - 1;

        } 

        textoDesencriptado+= letra;

    }

    return textoDesencriptado;
}

function verificar(textoIngresado) {
    if (textoIngresado.trim() === "") {
        return "El texto debe contener un carácter o más.";
    } else if (! /^[a-z1-9¿?¡!.,\n ]*$/.test(textoIngresado)) {
        return "Puedes ingresar letras en minúsculas y sin acentos, espacios, saltos de líneas, números y carácteres especiales ('¿', '?', '¡', '!', '.', ',').";
    } else {
        return "";
    }
}

function verificarEncriptado(textoIngresado) {
    if (!/(ai)|(enter)|(imes)|(ober)|(ufat)/.test(textoIngresado)) {
        return "El mensaje no está encriptado."
    }
    return "";
}

function mostrarResultado(traduccion) {
    //esconder sin resultado
    const $contenedorSinTexto = document.querySelector("#no-encontrado");
    $contenedorSinTexto.classList.add("oculto")
    //mostrar resultado

    const $contenedorTexto = document.querySelector("#encontrado");
    $contenedorTexto.classList.remove("oculto");

    //rellenar resultado
    const textoFinal = document.querySelector("#texto-final");
    textoFinal.textContent = traduccion;
}



