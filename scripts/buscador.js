function cargarBuscador() {
  console.log("Entré");
  const form = document
    .getElementsByClassName(".search-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const palabraClave = document
        .getElementsByClassName(".search-form_input")
        .value.trim()
        .toLowerCase();
    });

  console.log(palabraClave);
  fetch(
    `http://localhost:8080/noticias/empresa/${id}/buscar?textoBusqueda=${palabraClave}page=0&size=20`
  )
    .then((response) => response.json())
    .then((data) => {
      const noticiasFiltradasArray = data.content;

      for (i = 0; i < noticiasFiltradasArray.lenght; i++) {
        const tr = document.createElement("tr");
        const tdImagen = document.createElement("td");
        const imagen = document.createElement("img");
        const tdEspacio = document.createElement("td");
        const tdContenido = document.createElement("td");
        const titulo = document.createElement("a");
        const divResumen = document.createElement("div");
        const resumen = document.createElement("p");
        const enlaceLeerMas = document.createElement("a");
        const fechaPublicacion = document.createElement("span");

        imagen.setAttribute("width", "250px");
        imagen.classList.add("imgNoticia");
        imagen.src = noticia.imagen;
        imagen.alt = "Imagen de la noticia";
        titulo.setAttribute("href", "detalle.html");
        titulo.classList.add("banner");
        titulo.textContent = noticia.titulo;
        resumen.textContent = noticia.resumen;
        enlaceLeerMas.setAttribute("href", "detalle.html");
        enlaceLeerMas.style.color = "blue";
        enlaceLeerMas.textContent = "Leer Más - ";
        fechaPublicacion.textContent = noticia.fechaPublicacion;

        tdImagen.appendChild(imagen);
        tr.appendChild(tdImagen);
        tr.appendChild(tdEspacio);
        tdContenido.appendChild(titulo);
        divResumen.appendChild(resumen);
        divResumen.appendChild(enlaceLeerMas);
        divResumen.appendChild(fechaPublicacion);
        tdContenido.appendChild(divResumen);
        tr.appendChild(tdContenido);

        contenedorNoticias.appendChild(tr);
      }
    })
    .catch((error) => {
      console.error("Error al cargar las noticias:", error);
    });
}
