const puppeteer = require('puppeteer');

const frases = ['Quema lento, pero no se apaga.', 'otra_llama_viva: aún queda fuego entre los restos.', 'Lo frágil también resiste, aunque no haga ruido.', 'No grito. Ardo.', 'Cada día sin apagarme, es un pequeño incendio simbólico.'];

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://twitter.com/login');
  console.log("🔐 Inicia sesión como otra_llama_viva y presiona ENTER para publicar...");

  process.stdin.once('data', async () => {
    const frase = frases[Math.floor(Math.random() * frases.length)];
    await page.goto('https://twitter.com/compose/tweet');
    await new Promise(resolve => setTimeout(resolve, 4000));

    const tweetBox = await page.$('div[role="textbox"]');

    if (tweetBox) {
      await tweetBox.type(frase, { delay: 40 });
      await page.keyboard.down('Control');
      await page.keyboard.press('Enter');
      await page.keyboard.up('Control');
      console.log("🗣️ otra_llama_viva habló:", frase);
    } else {
      console.log("⚠️ No se encontró el área de texto para twittear.");
    }

    await new Promise(resolve => setTimeout(resolve, 3000));
    await browser.close();
    process.exit(0);
  });
})();
