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
			const camera_images = document.getElementById("camera").children;

			for (let i = 0; i < camera_images.length; i++) {
				const camera_image = camera_images[i];
				const noticia = noticiasArray[i];
				camera_image.setAttribute("data-src", noticia.imagen);
				const tituloNoticia = camera_image.querySelector(".tituloNoticia");
				tituloNoticia.textContent = noticia.titulo;
				tituloNoticia.href = `detalle.html?id=${noticia.id}`;
				const resumenNoticia = camera_image.querySelector(".resumenNoticia");
				resumenNoticia.textContent = noticia.resumen;
				const link = camera_image.querySelector(".btn-link");
				link.href = `detalle.html?id=${noticia.id}`;
			}
		})

		.catch((error) => {
			console.error("Error al cargar las noticias:", error);
		});
}