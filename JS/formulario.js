form.addEventListener("submit", function (e) {
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regexNombre.test(nombre)) {
    e.preventDefault();
    mostrarAlerta("Nombre inválido. Solo letras y espacios.");
    return;
  }

  if (!regexCorreo.test(correo)) {
    e.preventDefault();
    mostrarAlerta("Correo electrónico inválido.");
    return;
  }

  if (mensaje.length < 10) {
    e.preventDefault();
    mostrarAlerta("El mensaje debe tener al menos 10 caracteres.");
    return;
  }

  // ✅ Si todo está bien, limpiar campos
  e.preventDefault(); // ← evita que se recargue la página
  mostrarAlerta(`Gracias, ${nombre}! Tu mensaje ha sido enviado.`, true);
  form.reset(); // ← limpia los campos
});

  function mostrarAlerta(texto, exito = false) {
    const contenedor = document.getElementById("mensajeAlerta");
    contenedor.innerHTML = "";

    const alerta = document.createElement("div");
    alerta.className = `alerta p-3 mt-3 rounded text-center fw-bold ${exito ? "bg-success text-white" : "bg-danger text-white"}`;
    alerta.textContent = texto;

    contenedor.appendChild(alerta);

    setTimeout(() => alerta.remove(), 4000);
  }
