function cargarHome() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get("id");

	const idForm = document.getElementById("form-id");
  idForm.value = id;

	cargarDatosEmpresa(id);

	fetch(`http://localhost:8080/noticias/empresa/${id}?page=0&size=5`)
		.then((response) => response.json())
		.then((data) => {
			const noticiasArray = data.content;
			const camera_captions = document.querySelectorAll(".camera_caption");

      if(!noticiasArray) return;

			for (let i = 0; i < camera_captions.length; i++) {
				const noticia = noticiasArray[i];
				const camera_caption = camera_captions[i];

				if (noticia) {
					camera_caption.querySelector(".tituloNoticia").textContent =
						noticia.titulo;
					camera_caption.querySelector(
						".tituloNoticia"
					).href = `detalle.html?id=${noticia.id}`;
					camera_caption.querySelector(".resumenNoticia").textContent =
						noticia.resumen;
					camera_caption.querySelector(
						".btn-link"
					).href = `detalle.html?id=${noticia.id}`;
				} else {
					camera_caption.style.display = "none";
				}
			}
		})
		.catch((error) => {
			console.error("Error al cargar las noticias:", error);
		});
}

