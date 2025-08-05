 function manejarFormulario(e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const mensaje = document.getElementById("mensaje").value;

        if (nombre && correo && mensaje) {
          alert(`Gracias, ${nombre}! Tu mensaje ha sido enviado `);
          e.target.reset();
        } else {
          alert("Por favor completa todos los campos.");
        }
      }

      document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("formContacto");
        form.addEventListener("submit", manejarFormulario);
      });
 
