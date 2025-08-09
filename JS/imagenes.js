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

//LA VARA DEL CARRITO 

document.addEventListener("DOMContentLoaded", function () {
  let total = 0;
  const carrito = {}; // clave: id de prenda, valor: objeto con cantidad y datos
  const listaPedido = document.getElementById("listaPedido");
  const totalPedido = document.getElementById("totalPedido");

  // Mostrar/ocultar carrito
  document.getElementById("pestana-carrito").addEventListener("click", () => {
    document.getElementById("carrito").classList.toggle("activo");
  });

  // Cargar galería desde JSON
  fetch("JSON/imagenes.json")
    .then((response) => response.json())
    .then((data) => {
      window.prendasData = data;
      const galeria = document.getElementById("galeria-ropa");

      data.forEach((prenda) => {
        const col = document.createElement("div");
        col.className = "col-md-4 col-sm-6";

        col.innerHTML = `
          <div class="card shadow-sm cardPrenda">
            <img src="${prenda.url}" class="card-img-top" alt="${prenda.alt}">
            <div class="card-body text-center">
              <h5 class="card-title mb-1">${prenda.nombre}</h5>
              <p class="text-muted">₡${prenda.precio}</p>
              <button class="btn btn-pastel btn-sm btnAgregar" data-id="${prenda.id}">Agregar</button>
            </div>
          </div>
        `;
        galeria.appendChild(col);
      });
    });

  // Agregar prenda al carrito
  document.getElementById("galeria-ropa").addEventListener("click", function (e) {
    if (e.target.classList.contains("btnAgregar")) {
      const id = e.target.getAttribute("data-id");
      const prenda = window.prendasData.find(p => p.id === id);

      if (prenda) {
        if (carrito[id]) {
          carrito[id].cantidad += 1;
        } else {
          carrito[id] = {
            nombre: prenda.nombre,
            precio: prenda.precio,
            cantidad: 1
          };
        }

        actualizarCarrito();
        mostrarMensajeAgregado();
      }
    }
  });

  // Eliminar una unidad
  listaPedido.addEventListener("click", function (e) {
    if (e.target.classList.contains("btnEliminar")) {
      const id = e.target.getAttribute("data-id");
      if (carrito[id]) {
        carrito[id].cantidad -= 1;
        if (carrito[id].cantidad <= 0) {
          delete carrito[id];
        }
        actualizarCarrito();
      }
    }
  });

  // Enviar pedido
  document.getElementById("btnEnviarPedido").addEventListener("click", () => {
    if (total === 0) {
      alert("No has agregado productos");
      return;
    }

    alert("🛍️ ¡Pedido enviado a Karlabotique!");
    Object.keys(carrito).forEach(id => delete carrito[id]);
    actualizarCarrito();
  });

  // Actualiza el DOM del carrito
  function actualizarCarrito() {
    listaPedido.innerHTML = "";
    total = 0;

    Object.entries(carrito).forEach(([id, item]) => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;

      const li = document.createElement("li");
      li.innerHTML = `
        ${item.nombre} x${item.cantidad} - ₡${subtotal}
        <button class="btnEliminar btn btn-sm btn-danger ms-2" data-id="${id}">➖</button>
      `;
      listaPedido.appendChild(li);
    });

    totalPedido.textContent = total;
  }

  function mostrarMensajeAgregado() {
    const mensaje = document.getElementById("mensajeAgregado");
    mensaje.classList.remove("d-none");
    mensaje.style.display = "none";
    $(mensaje).fadeIn().delay(800).fadeOut();
  }
});



