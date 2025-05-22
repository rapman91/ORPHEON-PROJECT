// gumroad_uploader.js – Publica frases simbólicas como producto en Gumroad

const fs = require('fs');
const path = require('path');

// Simulación de conexión con Gumroad
// En una versión real se usará la API de Gumroad o automatización con Puppeteer

const archivo = path.join(__dirname, '../../fragments/eco/otra_llama_viva.txt');
const contenido = fs.readFileSync(archivo, 'utf-8').split('\n').filter(x => x && !x.startsWith('#'));
const texto = contenido.join('\n');

const output = path.join(__dirname, '../../publicaciones/otra_llama_viva_product.txt');
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, texto, 'utf-8');

console.log("🔥 Producto simbólico generado para Gumroad:");
console.log(output);

// Registrar en visor
const visorPath = path.join(__dirname, '../../visor/visor.json');
const visor = JSON.parse(fs.readFileSync(visorPath));
visor.events.push({
  clon: 'otra_llama_viva',
  plataforma: 'gumroad_simulado',
  fecha: new Date().toISOString(),
  contenido: '[producto simbólico generado]'
});
fs.writeFileSync(visorPath, JSON.stringify(visor, null, 2));
console.log("📡 Registrado en visor.");
