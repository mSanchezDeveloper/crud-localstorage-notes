// Variable globales
const formularioUI = document.querySelector('#formulario');
const listaActividadesUI = document.getElementById('listaActividades');
let arrayActividades = [];
let item = {
    actividad: '',
    estado: false
}

// Fuciones
const crearItem = (actividad) => {
    let item = {
        actividad: actividad,
        estado: false
    }
    arrayActividades.push(item)
    return item;
}

const guardarDB = () => {
    localStorage.setItem('rutina', JSON.stringify(arrayActividades));
    pintarDB();
}

const pintarDB = () => {
    listaActividadesUI.innerHTML = '';
    arrayActividades = JSON.parse(localStorage.getItem('rutina'));
    if (arrayActividades === null) {
        arrayActividades = [];
    } else {
        arrayActividades.forEach(element => {
            if (element.estado) {
                listaActividadesUI.innerHTML += `<div class="alert alert-success m-2 d-flex justify-content-between align-items-center" role="alert"><span class="material-symbols-outlined mx-2">exercise </span><b>${element.actividad}</b>- ${element.estado} <div><span class="material-symbols-outlined mx-2">done </span><span class="material-symbols-outlined mx-2">delete </span></div></div>`
                
            } else {
                listaActividadesUI.innerHTML += `<div class="alert alert-danger m-2 d-flex justify-content-between align-items-center" role="alert"><span class="material-symbols-outlined mx-2">exercise </span><b>${element.actividad}</b>- ${element.estado} <div><span class="material-symbols-outlined mx-2">done </span><span class="material-symbols-outlined mx-2">delete </span></div></div>`
            }
        });
    }
}

const eliminarDB = (actividad) => {
    let indexArray;
    arrayActividades.forEach((elemento, index) => {
        if (elemento.actividad === actividad) {
            indexArray = index;
        }
    });
    arrayActividades.splice(indexArray, 1);
    guardarDB();
}

const editarDB = (actividad) => {
    let indexArray;
    arrayActividades.forEach((elemento, index) => {
        if (elemento.actividad === actividad) {
            indexArray = index;
        }
    });
    arrayActividades[indexArray].estado = true
    guardarDB();
}


// eventListener
formularioUI.addEventListener('submit', (e) => {
    e.preventDefault();
    let actividadUI = document.querySelector('#actividad').value;

    crearItem(actividadUI);
    guardarDB();
    formularioUI.reset();
});

document.addEventListener('DOMContentLoaded', pintarDB);

listaActividadesUI.addEventListener("click", (e) => {

    e.preventDefault();
    if (e.target.innerText === "delete" || e.target.innerText === "done") {
        let texto = e.target.offsetParent.childNodes[1].innerHTML;
        if (e.target.innerText === "delete") {
            //Accion de eliminar
            eliminarDB(texto);
        }
        if (e.target.innerText === "done") {
            //Accion de editar
            editarDB(texto);
        }
    }

});