//************************************** FILESYSTEM **************************************
const fs = require('fs');
let archivo = './data/contenido.json';
let fichero = fs.readFileSync(archivo);
let objeto = new Array();
objeto = JSON.parse(fichero);
fichero.close;

//************************************** DEFINICIONES **************************************
let pos;
let desplegable = document.getElementById("desplegable");
let txtDesplegable = document.getElementById("txtDesplegable");
let visorHTML = document.getElementById("visorHTML");
let main = document.getElementById("main");
let indexHTML = document.getElementById("indexHTML");
let functionsJS = document.getElementById("functionsJS");
let btnGuardar = document.getElementById("btnGuardar");
let btnNuevo = document.getElementById("btnNuevo");
let btnBorrar = document.getElementById("btnBorrar");

//MAIN
rellenaDesplegable();

//************************************** FUNCIONES **************************************
function actualiza(nombre) {
    txtDesplegable.value = desplegable.value + "-bis";
    for (let i = 0; i < objeto.length; i++) {
        if (nombre == objeto[i].nombre) {
            main.value = objeto[i].main;
            indexHTML.value = objeto[i].characters;
            pos = i;
        }
    }
}

//agregar varlores al desplegable ordenados alfabeticamente
function desplegableAdd(texto) {
    let opcion = document.createElement("option");
    opcion.text = texto;
    let totalOpciones = desplegable.options.length;
    // Recorre opciones y busca posición adecuada para la nueva opción
    for (let i = 0; i < totalOpciones; i++) {
        if (texto < desplegable.options[i].text) {
            desplegable.add(opcion, i);
            return; // Sal del bucle
        }
    }
    // Si la nueva opción debe ir al final
    desplegable.add(opcion);
}

function rellenaDesplegable() {
    desplegable.innerHTML = "";
    for (let i = 0; i < objeto.length; i++) {
        desplegableAdd(objeto[i].nombre);
    }
    actualiza(desplegable.value);
}

function borraPos(posicion){
    objeto.splice(posicion,1);
    fs.writeFileSync(archivo, JSON.stringify(objeto));
    fs.close;

    rellenaDesplegable();
}

//************************************** LISTENERS **************************************
btnBorrar.addEventListener('click', ()=>{
    borraPos(pos);
})

btnGuardar.addEventListener('click', () => {
    const nuevo = {
        "nombre": desplegable.value,
        "main": main.value,
        "characters": indexHTML.value,
    };
    objeto.splice(pos, 1, nuevo);

    fs.writeFileSync(archivo, JSON.stringify(objeto));
    fs.close;

    rellenaDesplegable();
})

btnNuevo.addEventListener('click', () => {
    const nuevo = {
        "nombre": txtDesplegable.value,
        "main": main.value,
        "characters": indexHTML.value,
    };
    objeto.splice(0, 0, nuevo)

    fs.writeFileSync(archivo, JSON.stringify(objeto));
    fs.close;

    rellenaDesplegable();
})

desplegable.addEventListener('change', () => {
    actualiza(desplegable.value);
})