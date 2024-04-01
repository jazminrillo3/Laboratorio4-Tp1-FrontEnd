/*
contador de horas perdidas en el buscador:
Julian: 3:30
*/

function cargarBuscador() {
	const urlParams = new URLSearchParams(window.location.search);
	const palabraClave = urlParams.get("buscar");
	const id = urlParams.get("id");

	const idForm = document.getElementById("form-id");
	idForm.value = id;

	const idTitle = document.getElementById("textoBuscado");
	idTitle.textContent = palabraClave;

	cargarDatosEmpresaBuscador(id);

	fetch(
		`http://localhost:8080/noticias/empresa/${id}/buscar?textoBusqueda=${palabraClave}&page=0&size=20`
	)
		.then((response) => response.json())
		.then((data) => {
			const noticiasFiltradasArray = data.content;

			if (!noticiasFiltradasArray) {
				const notFound = `<p style="font-weight: bold; color: red">
					Ups! No hemos encontrado ninguna noticia que coincida con el patrón ingresado.</p>`;

				document.getElementById("contenedor-noticias").innerHTML += notFound;
				return;
			}

			for (i = 0; i < noticiasFiltradasArray.length; i++) {
				const noticia = noticiasFiltradasArray[i];

				const date = new Date(noticia.fechaPublicacion);
				const options = { year: "numeric", month: "long", day: "numeric" };
				const fechaFormateada = date.toLocaleDateString("es-ES", options);

				const imagenHtml = `
       			<td>
          			<a href="detalle.html?id=${noticia.id}">
            			<div style="width: 250px; height: 180px; overflow: hidden;">
                			<img src="${noticia.imagen}" alt="Imagen de la noticia" 
							style="width: 100%; height: 100%; object-fit: cover;">
            			</div>
          			</a>
        		</td>`;
				const espacioHtml = `<td width="25"></td>`;
				const contenidoHtml = `
        		<td style="text-align: justify" valign="top">
          			<a href="detalle.html?id=${noticia.id}" class="banner">${noticia.titulo}</a>
          			<div class="verOcultar">
            			<span>${noticia.resumen}</span>
           				<p><a href="detalle.html?id=${noticia.id}" style="color: blue;">Leer Más
            			<span> - ${fechaFormateada}</span></a></p>
         			</div>
        		</td>`;

				const trHtml = `<tr style="display: flex; align-items: center; margin-bottom: 16px">
				${imagenHtml}${espacioHtml}${contenidoHtml}
				</tr>`;
				document.getElementById("contenedor-noticias").innerHTML += trHtml;
			}
		})
		.catch((error) => {
			console.error("Error al cargar las noticias:", error);
		});
}
