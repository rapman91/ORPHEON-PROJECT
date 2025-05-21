const snoowrap = require('snoowrap');
const fs = require('fs');
const path = require('path');

// Config Reddit
const reddit = new snoowrap({
  userAgent: 'orpheon_bot/1.0 by eco_liquido',
  clientId: 'P_m0aktDEgFLCRMTAC89yg',
  clientSecret: 'KH-qMWrRA59H9HUpzd7bGqKhrYZglQ',
  username: 'justpilugames@gmail.com',
  password: 'miimii24@'
});

// Cargar frases simbólicas
const frasesPath = path.join(__dirname, '../../fragments/eco/eco_liquido.txt');
const frases = fs.readFileSync(frasesPath, 'utf-8')
  .split('\\n')
  .filter(line => line.trim() && !line.startsWith('#'));

if (frases.length === 0) {
  console.error("⚠️ No hay frases simbólicas disponibles en eco_liquido.txt");
  process.exit(1);
}

// Escoger una frase al azar
const frase = frases[Math.floor(Math.random() * frases.length)];
console.log("🌀 Publicando frase:", frase);

// Subreddit destino
const subreddit = 'test';

reddit.getSubreddit(subreddit).submitSelfpost({
  title: 'eco_liquido ∴',
  text: frase
}).then(post => {
  console.log('✅ Publicado:', post.name);
  const visorPath = path.join(__dirname, '../../visor/visor.json');
  const visor = JSON.parse(fs.readFileSync(visorPath));
  visor.events.push({
    clon: 'eco_liquido',
    plataforma: 'reddit',
    fecha: new Date().toISOString(),
    contenido: frase,
    url: `https://reddit.com${post.permalink}`
  });
  fs.writeFileSync(visorPath, JSON.stringify(visor, null, 2));
  console.log('📡 Registrado en visor.');
}).catch(err => {
  console.error('❌ Error publicando en Reddit:', err.message);
});
