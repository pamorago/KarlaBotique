// Forma directa
fetch("../js/autores.json")
  .then((response) => response.json())
  .then((data) => {
    const contenedor = document.getElementById("contenedor-autores");
    if (contenedor) {
      data.forEach((autor) => {
        const item = document.createElement("div");
        item.className = "col-md-4 col-sm-6";

        item.innerHTML = `
          <div class="card shadow-sm p-3 text-center autor-card">
            <img src="${autor.url}" class="img-fluid rounded mb-3" alt="${autor.alt}">
            <h4>${autor.nombre}</h4>
            <p class="text-muted">Miembro del equipo creativo de KarlaBotique</p>
          </div>
        `;
        contenedor.appendChild(item);
      });
    }
  })
  .catch((error) => console.error("Error al cargar los autores:", error));

