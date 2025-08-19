const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta raíz
app.use(express.static(path.join(__dirname)));

// Redirigir a index.html por defecto
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Servidor karlaBotique corriendo en http://localhost:${port}`);
});