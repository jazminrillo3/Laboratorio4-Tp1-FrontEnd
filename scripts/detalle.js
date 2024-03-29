function cargarNoticia() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  fetch(`http://localhost:8080/noticias/${id}`)
    .then((response) => response.json())
    .then((data) => {
      for (const key in data) {
        const elements = document.getElementsByClassName(key);
        for (const element of elements) {
          if (key === "fechaPublicacion") {
            const date = new Date(data[key]);
            const options = { year: "numeric", month: "long", day: "numeric" };
            const fechaFormateada = date.toLocaleDateString("es-ES", options);
            element.textContent = fechaFormateada;
          } else if (key === "contenidoHTML") {
            element.innerHTML = data[key];
          } else {
            element.textContent = data[key];
          }
        }
      }
      const imagen = document.getElementById("imagenPrincipal");
      imagen.style.backgroundImage =
        imagen.style.backgroundImage = `url('${data.imagen}')`;

      fetch(`http://localhost:8080/empresas/${data.empresa.id}`)
        .then((response) => response.json())
        .then((data) => {
          const inicioLink = document.getElementById("inicioLink");
          inicioLink.href = `home.html?id=${data.id}`;

          console.log(data);
          for (const key in data) {
            const elements = document.getElementsByClassName(key);
            for (const element of elements) {
              element.textContent += data[key];
            }
          }
        })
        .catch((error) => {
          console.error("Error al cargar la información:", error);
        });
    })
    .catch((error) => {
      console.error("Error al cargar la información:", error);
      window.location.href = "404.html";
    });
}
