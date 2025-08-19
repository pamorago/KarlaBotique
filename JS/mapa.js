function initMap() {
  const lugarFijo = { lat: 10.020843, lng: -84.223928 };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: lugarFijo
  });

  // Marcador del lugar fijo
  const marcadorLugarFijo = new google.maps.Marker({
    position: lugarFijo,
    map: map,
    title: "Pueblo Nuevo, Alajuela",
    icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
  });

  // Servicios para rutas
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({
    map: map,
    suppressMarkers: true,
    polylineOptions: {
      strokeColor: "#FF6FB5",
      strokeWeight: 5
    }
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const ubicacionUsuario = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        // Marcador azul del usuario
        const marcadorUsuario = new google.maps.Marker({
          position: ubicacionUsuario,
          map: map,
          title: "Tu ubicación",
          icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        });

        // 🚗 Solicitar ruta y dibujarla
        directionsService.route(
          {
            origin: ubicacionUsuario,
            destination: lugarFijo,
            travelMode: google.maps.TravelMode.DRIVING
          },
          (result, status) => {
            if (status === "OK") {
              directionsRenderer.setDirections(result);
            } else {
              console.warn("No se pudo trazar la ruta:", status);
              const bounds = new google.maps.LatLngBounds();
              bounds.extend(lugarFijo);
              bounds.extend(ubicacionUsuario);
              map.fitBounds(bounds);
            }
          }
        );
      },
      () => {
        alert("No se pudo obtener tu ubicación.");
      }
    );
  } else {
    alert("Tu navegador no soporta geolocalización.");
  }
}

