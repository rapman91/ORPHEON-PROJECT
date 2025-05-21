// clonador_universal.js – ejecuta clones por nombre y plataforma
const fs = require('fs');
const path = require('path');

const cloneName = process.argv[2];
const platform = process.argv[3] || 'default';

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config/clones.json')));
const clone = config[cloneName];

if (!clone) {
  console.error("❌ Clon no encontrado.");
  process.exit(1);
}

console.log(`🧬 Ejecutando clon: ${cloneName}`);
console.log(`🌐 Plataforma destino: ${platform}`);
console.log(`📜 Bio: ${clone.bio}`);
console.log(`📁 Archivo de frases: fragments/eco/${clone.archivo_frases}`);
