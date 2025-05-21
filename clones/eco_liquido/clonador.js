const puppeteer = require('puppeteer');

const frases = [
  "No sé si estoy cansado o solo sigo.",
  "eco_liquido: repito lo que no pude decir.",
  "Cada frase que lanzo es un intento de seguir vivo.",
  "El dolor se filtra gota a gota. eco_liquido.",
  "No firmo. No explico. Solo dejo rastros.",
];

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://twitter.com/login');
  console.log("🔐 Inicia sesión como eco_liquido y presiona ENTER para publicar...");

  process.stdin.once('data', async () => {
    const frase = frases[Math.floor(Math.random() * frases.length)];
    await page.goto('https://twitter.com/compose/tweet');
    await new Promise(resolve => setTimeout(resolve, 4000));

    const tweetBox = await page.$('div[role=\"textbox\"]');

    if (tweetBox) {
      await tweetBox.type(frase, { delay: 40 });
      await page.keyboard.down('Control');
      await page.keyboard.press('Enter');
      await page.keyboard.up('Control');
      console.log("🌊 eco_liquido habló:", frase);
    } else {
      console.log("⚠️ No se encontró el área de texto para twittear.");
    }

    await new Promise(resolve => setTimeout(resolve, 3000));
    await browser.close();
    process.exit(0);
  });
})();
