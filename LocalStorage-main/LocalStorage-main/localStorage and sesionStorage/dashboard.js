let nombreInput = document.querySelector('#nombre-input');
let tipoIdInput = document.querySelector('#tipo-id-input');
let numeroInput = document.querySelector('#numero-input');
let areaInput = document.querySelector('#area-input');
let salarioInput = document.querySelector('#salario-input');
let btnAgregar = document.querySelector('.btn-agregar');
let tabla = document.querySelector("#datos-tabla tbody");
let buscarNombreInput = document.querySelector('#buscar-nombre');
let btnBuscar = document.querySelector('#btn-buscar');

// Evento al botón de agregar
btnAgregar.addEventListener('click', () => {
    let empleadoForm = validarForm();
    if (empleadoForm) {
        guardarDatos(empleadoForm);
        // Limpiar la tabla después de agregar un nuevo empleado
        tabla.innerHTML = ""; 
    }
});

// Función para validar los campos del formulario
function validarForm() {
    let datosForm;
    if (nombreInput.value && tipoIdInput.value && numeroInput.value && areaInput.value && salarioInput.value) {
        datosForm = {
            nombre: nombreInput.value,
            tipoId: tipoIdInput.value,
            numeroId: numeroInput.value,
            area: areaInput.value,
            salario: salarioInput.value
        }
        // Limpiar los campos después de la validación
        nombreInput.value = "";
        tipoIdInput.value = "";
        numeroInput.value = "";
        areaInput.value = "";
        salarioInput.value = "";
    } else {
        alert("Debes llenar todos los campos, son obligatorios");
        return null;
    }
    return datosForm;
}

// Función para guardar datos en localStorage
function guardarDatos(datos) {
    let todosEmpleados = JSON.parse(localStorage.getItem("empleados")) || [];
    todosEmpleados.push(datos); // Agregamos los datos al array
    localStorage.setItem("empleados", JSON.stringify(todosEmpleados));
    alert("Datos guardados con éxito");
}

// Función para mostrar datos en la tabla
function mostrarDatos(empleados) {
    tabla.innerHTML = ""; // Limpiar la tabla antes de mostrar nuevos datos
    empleados.forEach((dato, pos) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${pos}</td>
            <td>${dato.nombre}</td>
            <td>${dato.tipoId}</td>
            <td>${dato.numeroId}</td>
            <td>${dato.area}</td>
            <td>${dato.salario}</td>
        `;
        tabla.appendChild(fila);
    });
}

// Evento al botón de búsqueda
btnBuscar.addEventListener('click', () => {
    let nombreBuscado = buscarNombreInput.value.toLowerCase();
    buscarNombreInput.value = "";
    buscarEmpleado(nombreBuscado);
});

// Función para buscar empleados
function buscarEmpleado(nombre) {
    let empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    let resultados = empleados.filter(empleado => empleado.nombre.toLowerCase().includes(nombre));
    
    // Mostrar resultados en la tabla
    mostrarDatos(resultados);

    if (resultados.length === 0) {
        alert("No se encontraron resultados.");
    }
}

// Limpiar la tabla al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    tabla.innerHTML = "";
});
