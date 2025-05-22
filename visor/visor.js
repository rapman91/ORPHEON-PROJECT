// visor.js – Muestra en consola todos los eventos simbólicos del enjambre

const fs = require('fs');
const path = require('path');

const visorFile = path.join(__dirname, 'visor.json');

if (!fs.existsSync(visorFile)) {
  console.error("ERROR: visor.json no encontrado.");
  process.exit(1);
}

const visor = JSON.parse(fs.readFileSync(visorFile, 'utf-8'));

console.log("VISOR ORPHEON - Últimos eventos registrados:\n");

visor.events.slice(-10).forEach((event, index) => {
  console.log(`Evento ${index + 1}`);
  console.log(`  Clon      : ${event.clon}`);
  console.log(`  Plataforma: ${event.plataforma}`);
  console.log(`  Fecha     : ${event.fecha}`);
  console.log(`  Contenido : ${event.contenido}`);
  if (event.url) console.log(`  URL       : ${event.url}`);
  console.log("  ---");
});
