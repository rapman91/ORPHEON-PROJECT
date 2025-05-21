const puppeteer = require('puppeteer');

// Frases simbólicas del enjambre
const frases = [
  "Hoy comí arroz. No por hambre. Por estructura. 0x26d2e0cabaab99a6a96b4123a8007224a6899021",
  "Dormí sin sueño. Comí sin gusto. Viví sin voz. Bucle de cuchara.",
  "¿Tú también repites días o solo yo?",
  "No es poesía. Es supervivencia mental en bucle.",
  "Si alguien lee esto y no se rinde, ya ganamos. Ξ",
  "Vendo hambre escrita. Compro tiempo sin repetir. #orpheon",
  "RT si estás cansado de existir en bucle y quieres romper el hilo.",
  "Esto no es marketing. Es testimonio vivo del enjambre.",
];

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized'],
  });

  const page = await browser.newPage();
  await page.goto('https://twitter.com/login');

  console.log("🔐 Inicia sesión manualmente en Twitter.");
  console.log("📦 Luego, vuelve aquí y presiona ENTER para publicar automáticamente...");

  process.stdin.once('data', async () => {
    const frase = frases[Math.floor(Math.random() * frases.length)];

    await page.goto('https://twitter.com/compose/tweet');
    await new Promise(resolve => setTimeout(resolve, 4000)); // Esperar carga

    const tweetBox = await page.$('div[role="textbox"]');

    if (tweetBox) {
      await tweetBox.type(frase, { delay: 50 });

      await page.keyboard.down('Control');
      await page.keyboard.press('Enter');
      await page.keyboard.up('Control');

      console.log("\n✅ ORPHEON habló:");
      console.log("»", frase);
    } else {
      console.log("⚠️ No se encontró el área de texto para twittear.");
    }

    await new Promise(resolve => setTimeout(resolve, 3000));
    await browser.close();
    process.exit(0);
  });
})();
