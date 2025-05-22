// nft_minter.js – Simulación de minteo simbólico de NFT para flor_concreta

const fs = require('fs');
const path = require('path');

// Cargar frases de flor_concreta
const archivo = path.join(__dirname, '../../fragments/eco/flor_concreta.txt');
const contenido = fs.readFileSync(archivo, 'utf-8').split('\n').filter(x => x && !x.startsWith('#'));
const frase = contenido[Math.floor(Math.random() * contenido.length)];

// Crear archivo simbólico NFT
const nftFile = path.join(__dirname, '../../nfts/flor_concreta_nft.txt');
fs.mkdirSync(path.dirname(nftFile), { recursive: true });
fs.writeFileSync(nftFile, frase, 'utf-8');

console.log("🌺 NFT simbólico generado para flor_concreta:");
console.log(nftFile);

// Registrar en visor
const visorPath = path.join(__dirname, '../../visor/visor.json');
const visor = JSON.parse(fs.readFileSync(visorPath));
visor.events.push({
  clon: 'flor_concreta',
  plataforma: 'nft_zora_simulado',
  fecha: new Date().toISOString(),
  contenido: frase
});
fs.writeFileSync(visorPath, JSON.stringify(visor, null, 2));
console.log("📡 Registrado en visor.");
