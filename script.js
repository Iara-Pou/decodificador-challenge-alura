function copiarTexto() {
    let texto = document.querySelector('#texto-final').textContent;
    navigator.clipboard.writeText(texto);
}

function manejar(tarea) {
    const textoIngresado = document.querySelector("#textarea-ingreso").value;
    const esExito = verificar(textoIngresado) === "";

    if (esExito) {
        reiniciarTextarea();
        esconderErrores();
        manejarResultado(tarea(textoIngresado));
    } else {
        const errorInput = verificar(textoIngresado)
        mostrarError(errorInput);
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
    const $error = document.querySelector("#error");

    $error.classList.remove("oculto");
    $error.textContent = SIGNO_INFORMACION + textoError;
}

function encriptarTexto(textoIngresado) {
    let textoEncriptado = "";

    for (let indiceLetra = 0; indiceLetra < textoIngresado.length; indiceLetra++) {
        const letra = textoIngresado[indiceLetra];
        const esVocal = avisarSiEsVocal(letra);
        if (esVocal) {
            const codigoVocal = VOCAL_A_CODIGO[letra];
            textoEncriptado += codigoVocal;
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
        const esVocal = avisarSiEsVocal(letra);
        const letraEmpiezaEncriptado = verificarEncriptado(indiceLetra, textoIngresado);

        if (esVocal && letraEmpiezaEncriptado) {
            const vocal = letra;
            const codigoVocal = VOCAL_A_CODIGO[vocal];

            /*al indiceLetra que itera el textoIngresado, le sumo la longitud del códigoVocal, para saltear la parte encriptada y no desencriptar más veces que las necesarias al texto original. 
            (Le resta uno al total del length del código, porque en cada iteración el for ya suma uno al índiceLetra)
                
                Por ejemplo de "enter" sale "e", solo tiene que contar la primera e, la segunda no. 
                (e)nter -> e
                (e)nt(e)r -> ee
            */

            indiceLetra += codigoVocal.length - 1;

        }

        textoDesencriptado += letra;

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

function verificarEncriptado(indiceLetra, textoIngresado) {
    const ENCRIPTADO_ORIGINAL = VOCAL_A_CODIGO[textoIngresado[indiceLetra]];
    const encriptadoTexto = textoIngresado.slice(indiceLetra, indiceLetra + ENCRIPTADO_ORIGINAL.length);
    //sumo el índiceLetra a la longitud porque tengo que comparar los dos resultados desde el índice, que varía según la iteración.

    return ENCRIPTADO_ORIGINAL === encriptadoTexto;
}

function manejarResultado(traduccion) {
    esconderMensajeDefault();
    mostrarResultado(traduccion);
}

function esconderMensajeDefault() {
    const $contenedorSinTexto = document.querySelector("#no-encontrado");
    $contenedorSinTexto.classList.add("oculto");
}

function mostrarResultado(resultado) {
    const textoResultado = document.querySelector("#texto-final");
    textoResultado.textContent = resultado;
    //mostrar contenedor
    document.querySelector("#encontrado").classList.remove("oculto");
}

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
