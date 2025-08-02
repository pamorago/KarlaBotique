// Script para cargar iconos de redes sociales en el footer desde JSON/redes.json
fetch("JSON/redes.json")
  .then((response) => response.json())
  .then((data) => {
    // Footer
    const footerRedes = document.getElementById("footer-redes");
    if (footerRedes) {
      data.forEach((red) => {
        const a = document.createElement("a");
        a.href = red.url;
        a.target = "_blank";
        a.className = "mx-2";
        a.innerHTML = `<img src="${red.icono}" alt="${red.alt}" width="32" height="32">`;
        footerRedes.appendChild(a);
      });
    }
    // Navbar
    const navbarRedes = document.getElementById("navbar-redes");
    if (navbarRedes) {
      data.forEach((red) => {
        const a = document.createElement("a");
        a.href = red.url;
        a.target = "_blank";
        a.className = "mx-2";
        a.innerHTML = `<img src="${red.icono}" alt="${red.alt}" width="24" height="24">`;
        navbarRedes.appendChild(a);
      });
    }
  });
