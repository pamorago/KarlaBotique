function cargarAutores(rutaJson, idContenedor) {
  fetch(rutaJson)
    .then((response) => response.json())
    .then((data) => {
      const contenedor = document.getElementById(idContenedor);
      if (contenedor) {
        data.forEach((autor) => {
          const col = document.createElement("div");
          col.className = "col-md-4 col-sm-6";

          col.innerHTML = `
            <div class="card p-3 text-center shadow-sm autor-card">
              <img src="${autor.url}" alt="${autor.alt}" class="img-fluid rounded mb-3" />
              <h4>${autor.nombre}</h4>
              <p class="text-muted">Miembro del equipo creativo de KarlaBotique</p>
            </div>
          `;

          contenedor.appendChild(col);
        });
      }
    })
    .catch((error) => console.error("Error al cargar los autores:", error));
}

document.addEventListener("DOMContentLoaded", () => {
  cargarAutores("../js/autores.json", "contenedor-autores");
});