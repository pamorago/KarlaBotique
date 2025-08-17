document.addEventListener("DOMContentLoaded", () => {
  const pestanaCarrito = document.getElementById("pestana-carrito");
  const carritoFlotante = document.getElementById("carrito-flotante");
  const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
  const confirmarCompraBtn = document.getElementById("confirmar-compra");

  pestanaCarrito.addEventListener("click", () => {
    carritoFlotante.classList.toggle("activo");
  });

  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

  document.addEventListener("click", (e) => {
    if (!carritoFlotante.contains(e.target) && !pestanaCarrito.contains(e.target)) {
      carritoFlotante.classList.remove("activo");
    }
  });

  // NUEVO: abrir modal con resumen y preparar datos del formulario
  confirmarCompraBtn.addEventListener("click", () => {
    if (!carrito || carrito.length === 0) {
      // feedback suave
      alert("Tu carrito está vacío.");
      return;
    }
    mostrarFormularioCompra();
  });
});
//agrgue 
// Formato moneda CR
function formatoCRC(valor) {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    minimumFractionDigits: 0
  }).format(valor);
}




// Funciones para el manejo del carrito
function actualizarTotalCarrito(total, cantidadTotal) {
  const totalCarrito = document.getElementById("total-carrito");
  const contadorCarrito = document.getElementById("contador-carrito");
  totalCarrito.textContent = `₡${total}`;
  contadorCarrito.textContent = cantidadTotal;
}


  // Mostrar el modal
  const modalContacto = new bootstrap.Modal(
    document.getElementById("modalContacto")
  );
  modalContacto.show();


// // Función para procesar el envío del formulario
// function enviarFormulario() {
//   const form = document.getElementById("formularioContacto");

//   if (form.checkValidity()) {
//     // Obtener los datos del formulario
//     const nombre = document.getElementById("nombre").value;
//     const email = document.getElementById("email").value;
//     const telefono = document.getElementById("telefono").value;
//     const direccion = document.getElementById("direccion").value;

//     // Aquí podrías enviar los datos a un servidor
//     alert(
//       `¡Gracias por tu compra, ${nombre}! Te contactaremos pronto al teléfono ${telefono} o al correo ${email} para coordinar la entrega a la dirección proporcionada.`
//     );

//     // Cerrar el modal y limpiar el carrito
//     const modalContacto = bootstrap.Modal.getInstance(
//       document.getElementById("modalContacto")
//     );
//     modalContacto.hide();
//     vaciarCarrito();
//   } else {
//     // Mostrar validaciones del formulario
//     form.classList.add("was-validated");
//   }
// }

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

//ajustes del carro al forms 
function mostrarFormularioCompra() {
  const resumenItems = document.getElementById("resumen-items");
  const resumenTotal = document.getElementById("resumen-total");

  // Campos ocultos del form
  const inputJson = document.getElementById("compra_json");
  const inputResumen = document.getElementById("compra_resumen");
  const inputTotal = document.getElementById("compra_total");
  const inputItems = document.getElementById("compra_items");

  let total = 0;

  // Construir filas del resumen
  const filas = carrito.map((item) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    return `
      <tr>
        <td>${item.nombre} <small class="text-muted">x${item.cantidad}</small></td>
        <td class="text-end">${formatoCRC(subtotal)}</td>
      </tr>
    `;
  });

  resumenItems.innerHTML = filas.join("");
  resumenTotal.textContent = formatoCRC(total);

  // Preparar payloads ocultos
  inputJson.value = JSON.stringify(carrito); // datos crudos
  inputTotal.value = total; // numérico
  inputItems.value = carrito.reduce((acc, item) => acc + item.cantidad, 0); // total de ítems
  inputResumen.value = carrito
    .map((i) => `${i.cantidad} x ${i.nombre} = ${formatoCRC(i.precio * i.cantidad)}`)
    .join(" | ");

  // Mostrar el modal
  const modalContacto = new bootstrap.Modal(document.getElementById("modalContacto"));
  modalContacto.show();
}


async function enviarFormulario() {
  const form = document.getElementById("formContacto");

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  // Estado del botón
  const btn = document.querySelector('#modalContacto .btn.btn-pastel');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = "Enviando...";

  try {
    const formData = new FormData(form);

    // Reemplaza por tu endpoint de Formspree (o el de tu servidor)
    const response = await fetch("https://formspree.io/f/mnnzrope", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    });

    if (!response.ok) throw new Error("No se pudo enviar el formulario");

    // Feedback
    alert("¡Gracias por tu compra! Te contactaremos para coordinar la entrega.");
    const modalContacto = bootstrap.Modal.getInstance(document.getElementById("modalContacto"));
    modalContacto.hide();

    // Limpieza
    form.reset();
    form.classList.remove("was-validated");
    vaciarCarrito();
  } catch (err) {
    alert("Ocurrió un problema al enviar el formulario. Inténtalo nuevamente.");
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

//CON EL FS 
document.addEventListener("DOMContentLoaded", () => {
  const fsContacto = document.getElementById("fsContacto");
  const modalEl = document.getElementById("modalContacto");
  const confirmarCompraBtn = document.getElementById("confirmar-compra"); // asegúrate que este ID exista

  confirmarCompraBtn.addEventListener("click", () => {
    if (!carrito || carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    fsContacto.disabled = false;      // habilita campos
    mostrarFormularioCompra();        // muestra modal
  });

  modalEl.addEventListener("hidden.bs.modal", () => {
    fsContacto.disabled = true;       // vuelve a bloquear
    document.getElementById("formContacto").reset();
  });
});