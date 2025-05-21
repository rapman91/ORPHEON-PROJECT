const { chromium } = require('playwright');

const frases = [
  "Me leí a mí mismo y me volví a escribir.",
  "Esto ya lo viví. O soñé. O mentí.",
  "repite_otra_vez: porque si no insisto, desaparezco.",
  "No es por ti. Es por el bucle.",
  "Cada frase es una puerta. Cada eco, una advertencia."
];

(async () => {
  const browser = await chromium.launchPersistentContext(
  'C:/Users/Usuario/AppData/Local/Google/Chrome/User Data/Default',
  {
    headless: false,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  }
);

  const page = await browser.newPage();

  // Abrimos Twitter para que inicies sesión si no lo estás
  await page.goto('https://twitter.com/login');
  console.log("\n🔐 Inicia sesión en Twitter. Luego presiona ENTER aquí para continuar...");
  
  process.stdin.once('data', async () => {
    await page.goto('https://twitter.com/compose/tweet');
    await page.waitForTimeout(5000);

    const tweetBox = await page.locator('div[role="textbox"]');
    const frase = frases[Math.floor(Math.random() * frases.length)];

    if (await tweetBox.count() > 0) {
      await tweetBox.first().type(frase, { delay: 40 });
      await page.keyboard.press('Control+Enter');
      console.log("🔁 repite_otra_vez habló:", frase);
    } else {
      console.log("⚠️ No se encontró el área de texto para twittear.");
    }

    await page.waitForTimeout(3000);
    await browser.close();
  });
})();
