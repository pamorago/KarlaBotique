// Funciones para el manejo del carrito
function actualizarTotalCarrito(total, cantidadTotal) {
  const totalCarrito = document.getElementById("total-carrito");
  const contadorCarrito = document.getElementById("contador-carrito");
  totalCarrito.textContent = `₡${total}`;
  contadorCarrito.textContent = cantidadTotal;
}

// Función para mostrar el formulario de contacto
function mostrarFormularioCompra() {
  // Actualizar el resumen de la compra en el modal
  const resumenItems = document.getElementById("resumen-items");
  const resumenTotal = document.getElementById("resumen-total");
  let total = 0;

  resumenItems.innerHTML = carrito
    .map((item) => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;
      return `<tr>
            <td>${item.nombre}</td>
            <td class="text-pink">₡${item.precio}</td>
        </tr>`;
    })
    .join("");

  resumenTotal.textContent = `₡${total}`;

  // Mostrar el modal
  const modalContacto = new bootstrap.Modal(
    document.getElementById("modalContacto")
  );
  modalContacto.show();
}

// Función para procesar el envío del formulario
function enviarFormulario() {
  const form = document.getElementById("formularioContacto");

  if (form.checkValidity()) {
    // Obtener los datos del formulario
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const direccion = document.getElementById("direccion").value;

    // Aquí podrías enviar los datos a un servidor
    alert(
      `¡Gracias por tu compra, ${nombre}! Te contactaremos pronto al teléfono ${telefono} o al correo ${email} para coordinar la entrega a la dirección proporcionada.`
    );

    // Cerrar el modal y limpiar el carrito
    const modalContacto = bootstrap.Modal.getInstance(
      document.getElementById("modalContacto")
    );
    modalContacto.hide();
    vaciarCarrito();
  } else {
    // Mostrar validaciones del formulario
    form.classList.add("was-validated");
  }
}

function agregarAlCarrito(id) {
  const prenda = window.prendasData.find((p) => p.id === id);
  if (!prenda) return;

  const itemExistente = carrito.find((item) => item.id === id);
  if (itemExistente) {
    itemExistente.cantidad++;
  } else {
    carrito.push({
      id: prenda.id,
      nombre: prenda.nombre,
      precio: prenda.precio,
      cantidad: 1,
    });
  }

  actualizarCarritoUI();
}

function actualizarCarritoUI() {
  const itemsCarrito = document.getElementById("items-carrito");
  const totalCarrito = document.getElementById("total-carrito");
  const contadorCarrito = document.getElementById("contador-carrito");

  // Limpiar el contenido actual
  itemsCarrito.innerHTML = "";

  // Calcular total y actualizar items
  let total = 0;
  let cantidadTotal = 0;

  carrito.forEach((item) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    cantidadTotal += item.cantidad;

    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${item.nombre}</td>
            <td class="text-pink">₡${item.precio}</td>
            <td class="text-end">
                <button class="btn btn-sm text-danger" onclick="eliminarDelCarrito('${item.id}')">×</button>
            </td>
        `;
    itemsCarrito.appendChild(tr);
  });

  totalCarrito.textContent = `Total: ₡${total}`;
  contadorCarrito.textContent = cantidadTotal;
}

function eliminarDelCarrito(id) {
  const index = carrito.findIndex((item) => item.id === id);
  if (index !== -1) {
    if (carrito[index].cantidad > 1) {
      carrito[index].cantidad--;
    } else {
      carrito.splice(index, 1);
    }
    actualizarCarritoUI();
  }
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarritoUI();
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  const pestanaCarrito = document.getElementById("pestana-carrito");
  const carritoFlotante = document.getElementById("carrito-flotante");
  const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

  pestanaCarrito.addEventListener("click", () => {
    carritoFlotante.classList.toggle("activo");
  });

  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

  // Cerrar el carrito al hacer clic fuera de él
  document.addEventListener("click", (e) => {
    if (
      !carritoFlotante.contains(e.target) &&
      !pestanaCarrito.contains(e.target)
    ) {
      carritoFlotante.classList.remove("activo");
    }
  });
});
