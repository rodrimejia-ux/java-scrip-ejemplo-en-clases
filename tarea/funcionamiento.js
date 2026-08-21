// Obtener referencias a los elementos del HTML
const padre = document.getElementById('contenedor-padre');
const btnPar = document.getElementById('btn-par');
const btnImpar = document.getElementById('btn-impar');
const btnAgregar = document.getElementById('btn-agregar');

// Función que recorre dinámicamente todos los hijos y aplica el filtro Par/Impar
function evaluarHijos(tipoSeleccion) {
    const hijos = padre.children; // HTMLCollection con los hijos actuales

    for (let i = 0; i < hijos.length; i++) {
        const posicionReal = i + 1; // La posición legible empieza en 1
        const hijoActual = hijos[i];

        // Quitar resaltados previos
        hijoActual.classList.remove('destacado-par', 'destacado-impar');

        // Evaluación lógica del operador Módulo %
        if (tipoSeleccion === 'par' && posicionReal % 2 === 0) {
            hijoActual.classList.add('destacado-par');
        } else if (tipoSeleccion === 'impar' && posicionReal % 2 !== 0) {
            hijoActual.classList.add('destacado-impar');
        }
    }
}

// Función para insertar nuevos elementos hijos dinámicamente
function agregarNuevoHijo() {
    const totalHijos = padre.children.length + 1;
    const nuevoHijo = document.createElement('div');

    nuevoHijo.className = 'hijo';
    nuevoHijo.textContent = `Hijo número ${totalHijos} (Posición ${totalHijos})`;

    padre.appendChild(nuevoHijo);
}

// Eventos de clic
btnPar.addEventListener('click', () => evaluarHijos('par'));
btnImpar.addEventListener('click', () => evaluarHijos('impar'));
btnAgregar.addEventListener('click', agregarNuevoHijo);
