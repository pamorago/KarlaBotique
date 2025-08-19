// API Key de Pexels (reemplaza con tu propia key)
const API_KEY = "GjJtWIuSL6BjKIKsYROMAgRIA1jbQ54pqUemxQ5qGMBiWOccnvwIY9xe";

async function obtenerTendenciasModa() {
  try {
    const response = await fetch(
      "https://api.pexels.com/v1/search?query=fashion+trends&per_page=9",
      {
        headers: {
          Authorization: API_KEY,
        },
      }
    );
    const data = await response.json();
    mostrarTendencias(data.photos);
  } catch (error) {
    console.error("Error al obtener tendencias:", error);
  }
}

function mostrarTendencias(fotos) {
  const contenedor = document.getElementById("tendencias-moda");
  if (!contenedor) return;

  let html = '<h2 class="text-center mb-4">Tendencias de Moda</h2>';
  html += '<div class="row g-4">';

  fotos.forEach((foto) => {
    html += `
            <div class="col-md-4">
                <div class="card tendencia-card">
                    <img src="${foto.src.medium}" 
                         class="card-img-top" 
                         alt="${foto.alt || "Tendencia de moda"}"
                         loading="lazy">
                    <div class="card-body">
                        <h5 class="card-title">Tendencia Destacada</h5>
                        <p class="card-text">Fotografía por: ${
                          foto.photographer
                        }</p>
                        <a href="${
                          foto.url
                        }" target="_blank" class="btn btn-pastel">Ver más</a>
                    </div>
                </div>
            </div>
        `;
  });

  html += "</div>";
  contenedor.innerHTML = html;
}

// Añadir estilos dinámicos para las tarjetas de tendencias
const style = document.createElement("style");
style.textContent = `
    .tendencia-card {
        transition: transform 0.3s ease;
        height: 100%;
    }
    .tendencia-card:hover {
        transform: translateY(-5px);
    }
    .tendencia-card img {
        height: 300px;
        object-fit: cover;
    }
`;
document.head.appendChild(style);

// Cargar tendencias cuando el documento esté listo
document.addEventListener("DOMContentLoaded", obtenerTendenciasModa);
