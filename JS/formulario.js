$(document).ready(function () {
  // Limpiar el formulario al cargar la página
  $("#formContacto")[0].reset();

  // Configurar el plugin de validación
  $("#formContacto").validate({
    rules: {
      nombre: {
        required: true,
        pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      },
      email: {
        required: true,
        email: true,
      },
      fecha_nacimiento: {
        required: true,
        date: true,
      },
      rango_ingreso: {
        required: true,
      },
      genero: {
        required: true,
      },
      mensaje: {
        required: true,
        minlength: 10,
      },
    },
    messages: {
      nombre: {
        required: "Por favor ingresa tu nombre",
        pattern: "Solo se permiten letras y espacios",
      },
      email: {
        required: "Por favor ingresa tu correo electrónico",
        email: "Por favor ingresa un correo electrónico válido",
      },
      fecha_nacimiento: {
        required: "Por favor selecciona tu fecha de nacimiento",
        date: "Por favor ingresa una fecha válida",
      },
      rango_ingreso: {
        required: "Por favor selecciona un rango de ingreso",
      },
      genero: {
        required: "Por favor selecciona tu género",
      },
      mensaje: {
        required: "Por favor ingresa un mensaje",
        minlength: "El mensaje debe tener al menos 10 caracteres",
      },
    },
    errorElement: "span",
    errorClass: "text-danger",
    highlight: function (element) {
      $(element).addClass("is-invalid").removeClass("is-valid");
    },
    unhighlight: function (element) {
      $(element).addClass("is-valid").removeClass("is-invalid");
    },
    submitHandler: function (form) {
      const $form = $(form);
      const $submitBtn = $form.find('button[type="submit"]');

      // Deshabilitar el botón y mostrar estado de carga
      $submitBtn
        .prop("disabled", true)
        .html(
          '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...'
        );

      // Enviar formulario usando AJAX
      $.ajax({
        url: $form.attr("action"),
        method: "POST",
        data: $form.serialize(),
        success: function () {
          mostrarAlerta(`¡Gracias! Tu mensaje ha sido enviado.`, true);
          $form[0].reset();
          $(".is-valid").removeClass("is-valid");
        },
        error: function () {
          mostrarAlerta(
            "Hubo un error al enviar el mensaje. Por favor intenta de nuevo.",
            false
          );
        },
        complete: function () {
          $submitBtn.prop("disabled", false).text("Enviar");
        },
      });
    },
  });

  // Calcular edad al cambiar fecha de nacimiento
  $("#fecha_nacimiento").on("change", function () {
    const fecha = new Date($(this).val());
    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const mes = hoy.getMonth() - fecha.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
      edad--;
    }

    const $edad = $("#edad");
    $edad.text(`Edad: ${edad} años`).hide().fadeIn(300);
  });

  // Efectos visuales en los campos
  $(".form-control")
    .on("focus", function () {
      $(this).closest(".form-group").addClass("focused");
    })
    .on("blur", function () {
      $(this).closest(".form-group").removeClass("focused");
    });
});

function mostrarAlerta(texto, exito = false) {
  const $alerta = $("<div>")
    .addClass(
      `alerta p-3 mt-3 rounded text-center fw-bold ${
        exito ? "bg-success" : "bg-danger"
      } text-white`
    )
    .text(texto)
    .hide();

  $("#mensajeAlerta").empty().append($alerta);

  $alerta
    .slideDown(300)
    .delay(4000)
    .slideUp(300, function () {
      $(this).remove();
    });
}
