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




