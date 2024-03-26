function cargarHome() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get("id");

	fetch(`http://localhost:8080/empresas/${id}`)
		.then((response) => response.json())
		.then((data) => {
			for (const key in data) {
				const elements = document.getElementsByClassName(key);
				for (const element of elements) {
					element.textContent += data[key];
				}
			}
			const ubicacion = document.getElementById("ubicacion");
			const url = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11270.125646913215!2d${data["longitud"]}!3d${data["latitud"]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1615335513448!5m2!1ses-419!2sar&q=${data["latitud"]},${data["longitud"]}`;
			ubicacion.src = url;
		})
		.catch((error) => {
			console.error("Error al cargar la información:", error);
		});

	fetch(`http://localhost:8080/noticias/empresa/${id}?page=0&size=10`)
		.then((response) => response.json())
		.then((data) => {
			const noticiasArray = data.content;
			const sliceContainer =
				document.getElementsByClassName("camera_container")[0];

			const slice = document.createElement("div");
			/*slice.id = "camera";
			slice.className = "camera_wrap";
			noticiasArray.forEach((noticia, index) => {
				const nuevaNoticia = document.createElement("div");
				nuevaNoticia.setAttribute("data-src", noticia.imagen);

				nuevaNoticia.innerHTML = `
        			<div class="camera_caption fadeIn">
            			<div class="jumbotron jumbotron${index + 1}">
                			<em class="tituloNoticia">${noticia.titulo}</em>
                				<div class="wrap">
                    				<p class="resumenNoticia">${noticia.resumen}</p>
                    				<a href="detalle.html?id=${
															noticia.id
														}" class="btn-link fa-angle-right"></a>
                				</div>
            			</div>
        			</div>
   				`;

				slice.appendChild(nuevaNoticia);
			});

			sliceContainer.appendChild(slice);
			$("#camera").camera({});*/
		})
		.catch((error) => {
			console.error("Error al cargar las noticias:", error);
		});
}
