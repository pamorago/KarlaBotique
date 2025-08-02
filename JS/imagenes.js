fetch("JSON/imagenes.json")
  .then(response => response.json())
  .then(data => {
    const galeria = document.getElementById("galeria-ropa");
    if (galeria) {
      data.forEach(prenda => {
        const item = document.createElement("div");
        item.className = "galeria-item";

        item.innerHTML = `
          <img src="${prenda.url}" alt="${prenda.alt}" class="imagen-prenda">
          <h4>${prenda.nombre}</h4>
        `;
        galeria.appendChild(item);
      });
    }
  });
  function cargarGaleria(rutaJson, idGaleria) {
  fetch(rutaJson)
    .then((response) => response.json())
    .then((data) => {
      const galeria = document.getElementById(idGaleria);
      if (galeria) {
        data.forEach((prenda) => {
          const col = document.createElement("div");
          col.className = "col-md-4 col-sm-6";

          col.innerHTML = `
            <div class="card shadow-sm">
              <img src="${prenda.url}" class="card-img-top" alt="${prenda.alt}">
              <div class="card-body text-center">
                <h5 class="card-title">${prenda.nombre}</h5>
              </div>
            </div>
          `;

          galeria.appendChild(col);
        });
      }
    })
    .catch((error) => console.error("Error al cargar la galería:", error));
}





