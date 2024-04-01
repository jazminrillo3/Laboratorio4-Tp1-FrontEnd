function cargarEmpresas() {
	fetch("http://localhost:8080/empresas")
		.then((response) => response.json())
		.then((data) => {
			const tabla = document.getElementById("tabla-empresas");

			// Limpiar la tabla
			tabla.innerHTML = "";

			// Iterar sobre los datos recibidos y generar las filas de la tabla
			data.forEach((empresa) => {
				const fila = document.createElement("tr");
				const celdaEmpresa = document.createElement("td");
				celdaEmpresa.textContent = empresa.denominacion;
				const celdaPagina = document.createElement("td");
				const enlace = document.createElement("a");
				enlace.href = `home.html?id=${empresa.id}`;
				enlace.textContent = "URL PAGINA HOME";
				celdaPagina.appendChild(enlace);
				fila.appendChild(celdaEmpresa);
				fila.appendChild(celdaPagina);
				tabla.appendChild(fila);
			});
		})
		.catch((error) => {
			console.error("Error al cargar las empresas:", error);
		});
}

function cargarDatosEmpresa(id) {
	fetch(`http://localhost:8080/empresas/${id}`)
		.then((response) => response.json())
		.then((data) => {
			const inicioLink = document.getElementById("inicioLink");
			if (inicioLink) inicioLink.href = `home.html?id=${data.id}`;

            const linkEmpresa = document.getElementsByClassName("rd-navbar-brand")[0];
            if (linkEmpresa) linkEmpresa.href = `home.html?id=${data.id}`

			for (const key in data) {
				const elements = document.getElementsByClassName(key);
				if (!elements) continue;
				for (const element of elements) {
                    console.log(element);
					element.textContent += data[key];
				}
			}
			const link = document.getElementsByClassName("search-form_toggle")[0];
			if (link) link.href = `home.html?id=${data.id}`;

			const ubicacion = document.getElementById("ubicacion");
			if (ubicacion) {
				const url = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11270.125646913215!2d${data["longitud"]}!3d${data["latitud"]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1615335513448!5m2!1ses-419!2sar&q=${data["latitud"]},${data["longitud"]}`;
				ubicacion.src = url;
			}
		})
		.catch((error) => {
			console.error("Error al cargar la información:", error);
		});
}

function cargarDatosEmpresaBuscador(id) {
	fetch(`http://localhost:8080/empresas/${id}`)
		.then((response) => response.json())
		.then((data) => {
			const inicioLink = document.getElementById("inicioLink");
			if (inicioLink) inicioLink.href = `home.html?id=${data.id}`;

            const linkEmpresa = document.getElementsByClassName("rd-navbar-brand")[0];
            linkEmpresa.href = `home.html?id=${data.id}`

            const denominacionHeader = document.querySelector('header .denominacion');
            if (denominacionHeader) {
                denominacionHeader.textContent = data.denominacion;
            }

            const denominacionFooter= document.querySelector('footer .denominacion');
            if (denominacionFooter) {
                denominacionFooter.textContent = data.denominacion;
            }

            const telefono = document.getElementsByClassName("telefono")[0];
			if (telefono) telefono.textContent = data.telefono;

            const horario = document.getElementsByClassName("horarioAtencion")[0];
			if (horario) horario.textContent += data.horarioAtencion;
			
			const link = document.getElementsByClassName("search-form_toggle")[0];
			if (link) link.href = `home.html?id=${data.id}`;

			const ubicacion = document.getElementById("ubicacion");
			if (ubicacion) {
				const url = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11270.125646913215!2d${data["longitud"]}!3d${data["latitud"]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1615335513448!5m2!1ses-419!2sar&q=${data["latitud"]},${data["longitud"]}`;
				ubicacion.src = url;
			}
		})
		.catch((error) => {
			console.error("Error al cargar la información:", error);
		});
}
