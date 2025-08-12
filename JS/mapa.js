
function initMap() {
  const lugarFijo = { lat: 10.020843, lng: -84.223928  }; 

  // Mapa centrado inicialmente en el lugar fijo
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: lugarFijo,
  });

  // Marcador para el lugar fijo
  const marcadorLugarFijo = new google.maps.Marker({
    position: lugarFijo,
    map: map,
    title: "Pueblo Nuevo, Alajuela",
    icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // marcador rojo para el lugar fijo
  });

  // Intentar obtener ubicación actual del usuario
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const ubicacionUsuario = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Marcador para la ubicación del usuario
        const marcadorUsuario = new google.maps.Marker({
          position: ubicacionUsuario,
          map: map,
          title: "Tu ubicación",
          icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // marcador azul para el usuario
        });

        // Ajustar el mapa para que muestre ambos puntos
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(lugarFijo);
        bounds.extend(ubicacionUsuario);
        map.fitBounds(bounds);
      },
      () => {
        alert("No se pudo obtener tu ubicación.");
      }
    );
  } else {
    alert("Tu navegador no soporta geolocalización.");
  }
}


