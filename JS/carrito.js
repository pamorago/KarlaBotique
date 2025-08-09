// jquey para el carrito 
$(document).ready(function () {
  // Variable global para llevar el total del pedido
  let total = 0;

  // Mostrar u ocultar el carrito al hacer clic en la pestaña 
  $('#pestana-carrito').click(function () {
    $('#carrito').toggleClass('activo'); // Si tiene la clase, la quita. Si no la tiene, la agrega
  });

  // revisa si la sección #menu está visible en pantalla
  // (esto controla si se debe mostrar o no el carrito)

  $(window).on('scroll', function () {
    const menuTop = $('#menu').offset().top; // Inicio de la sección #menu
    const menuBottom = menuTop + $('#menu').outerHeight(); // Fin de la sección #menu
    const scrollY = $(window).scrollTop(); // Cuánto se ha desplazado la ventana
    const windowH = $(window).height(); // Altura visible de la ventana

    // en la seccion de #menu 
    if (scrollY + windowH > menuTop && scrollY < menuBottom) {
      $('body').addClass('menu-visible'); // Activa visibilidad del carrito
    } else {
      $('body').removeClass('menu-visible'); // Oculta si ya no está viendo #menu
      $('#carrito').removeClass('activo');   // Asegura que el carrito se cierre automáticamente
    }
  });

  // Lista de precios por producto
  const precios = {
    "Gallo Pinto": 2500,
    "Panqueques": 2000,
    "Tostadas Francesas": 2200,
    "Empanadas": 1200,
    "Sándwich clásico": 1800,
    "Arepas": 1600,
    "Batido de Fresa": 1500,
    "Jugo de Naranja": 1300,
    "Té Frío": 1200,
    "Café Negro": 1000,
    "Capuchino": 1500,
    "Chocolate Caliente": 1700,
    "Arroz con Leche": 1100,
    "Flan de Caramelo": 1300,
    "Helado Artesanal": 1400,
    "Casado": 2800,
    "Lasaña": 3000,
    "Pollo al Horno": 2700
  };

  // Agregar producto al carrito
  $(".cardPlatillo").on("click", ".btnTemp", function () {
    // Buscar el nombre del platillo desde la tarjeta donde se hizo clic
    const nombre = $(this).closest(".cardPlatillo").find(".card-title").text();

    // Buscar el precio desde el objeto precios
    const precio = precios[nombre] || 0;

    // Agregar el producto a la lista del carrito
    $("#listaPedido").append(`
      <li>
        ${nombre} - ₡${precio}
        <button class="btnEliminar">❌</button>
      </li>
    `);

    // Sumar al total
    total += precio;
    $("#totalPedido").text(total);

    // Mostrar mensaje temporal de producto agregado
    $("#mensajeAgregado").removeClass("d-none") // muestra
                       .hide()
                       .fadeIn()
                       .delay(800)
                       .fadeOut();
  });

  // Eliminar producto del carrito
  $("#listaPedido").on("click", ".btnEliminar", function () {
    // Obtener el precio del producto que se va a eliminar
    const texto = $(this).parent().text(); 
    const precio = parseInt(texto.match(/\₡(\d+)/)[1]); 

    // Restar del total
    total -= precio;
    $("#totalPedido").text(total);

    // Quitar el elemento del DOM
    $(this).parent().remove();
  });


  // Enviar el pedido
  $("#btnEnviarPedido").click(function () {
    // Verificar que haya al menos un producto agregado
    if (total === 0) {
      alert("No has agregado productos");
      return;
    }

    // envío del pedido
    alert("✅ ¡Pedido enviado a la cocina!");

    // Limpiar el carrito
    $("#listaPedido").empty();
    $("#totalPedido").text("0");
    total = 0;
  });
});