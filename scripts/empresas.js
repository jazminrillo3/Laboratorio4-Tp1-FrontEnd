function cargarEmpresas() {
    fetch("http://localhost:8080/empresas")
        .then(response => response.json()) 
        .then(data => {
            const tabla = document.getElementById('tabla-empresas');

            // Limpiar la tabla
            tabla.innerHTML = '';

            // Iterar sobre los datos recibidos y generar las filas de la tabla
            data.forEach(empresa => {
                const fila = document.createElement('tr');
                const celdaEmpresa = document.createElement('td');
                celdaEmpresa.textContent = empresa.denominacion; 
                const celdaPagina = document.createElement('td');
                const enlace = document.createElement('a');
                enlace.href = `home.html?id=${empresa.id}`; 
                enlace.textContent = 'URL PAGINA HOME';
                celdaPagina.appendChild(enlace);
                fila.appendChild(celdaEmpresa);
                fila.appendChild(celdaPagina);
                tabla.appendChild(fila);
            });
        })
        .catch(error => {
            console.error('Error al cargar las empresas:', error);
        });
}