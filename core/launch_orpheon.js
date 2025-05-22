const { execSync } = require('child_process');

console.log("🧬 Lanzando ORPHEON universal...");

const clones = ['eco_liquido', 'repite_otra_vez', 'otra_llama_viva', 'flor_concreta'];
const plataformas = {
  eco_liquido: 'reddit',
  repite_otra_vez: 'twitter_manual',
  otra_llama_viva: 'gumroad',
  flor_concreta: 'nft_zora'
};

for (const clon of clones) {
  const cmd = `node clonador_universal.js ${clon} ${plataformas[clon]}`;
  console.log(`
🧠 Ejecutando: ${cmd}`);
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    console.log(`⚠️ Fallo ejecutando ${clon}:`, e.message);
  }
}
