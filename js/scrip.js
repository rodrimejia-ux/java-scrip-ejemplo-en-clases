// Función coderider
function coderider() {
    // Obtener las referencias a los elementos HTML
    const inputNombre = document.getElementById('name');
    const inputApellido = document.getElementById('lastname');

    // Extraer los valores eliminando espacios innecesarios
    const nombre = inputNombre ? inputNombre.value.trim() : '';
    const apellido = inputApellido ? inputApellido.value.trim() : '';

    // Lógica según si los campos están llenos o vacíos
    if (!nombre && !apellido) {
        console.log('CodeRider: Esperando datos de entrada...');
        alert('🚀 CodeRider: Por favor ingresa al menos un nombre o apellido.');
        return;
    }

    // Mostrar mensaje de éxito en consola y alerta
    const mensaje = `⚡ CodeRider ejecutado con éxito para: ${nombre} ${apellido}`.trim();
    
    console.log(mensaje);
    alert(mensaje);
}