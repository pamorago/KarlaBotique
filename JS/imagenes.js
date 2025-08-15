fetch("../JSON/imagenes.json")
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
      window.prendasData = data; 
      const galeria = document.getElementById(idGaleria);
      if (galeria) {
        data.forEach((prenda) => {
          const col = document.createElement("div");
          col.className = "col-md-4 col-sm-6";

          col.innerHTML = `
            <div class="card shadow-sm">
              <img src="${prenda.url}" class="card-img-top" alt="${prenda.alt}">
              <div class="card-body text-center">
                <div class="d-flex justify-content-between align-items-center">
                  <h5 class="card-title mb-0">${prenda.nombre}</h5>
                  <button class="btn btn-pastel btn-sm" onclick="mostrarDetalle('${prenda.id}')">Ver detalle</button>
                </div>
              </div>
            </div>
          `;
          galeria.appendChild(col);
        });

      
        window.prendasData = data;
      }
    })
    .catch((error) => console.error("Error al cargar la galería:", error));
}
function mostrarDetalle(idPrenda) {
  const prenda = window.prendasData.find(p => p.id === idPrenda);
  if (prenda) {
    document.getElementById("detalleImagen").src = prenda.url;
    document.getElementById("detalleImagen").alt = prenda.alt;
    document.getElementById("detalleNombre").textContent = prenda.nombre;
    document.getElementById("detalleDescripcion").textContent = prenda.descripcion;

    const modal = new bootstrap.Modal(document.getElementById("modalDetalle"));
    modal.show();
  }
}



