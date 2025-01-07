const { chromium } = require('playwright'); 

(async () => {
  
  const browser = await chromium.launch({ headless: false }); 
  const page = await browser.newPage();

  try {
    
    await page.goto('https://handsontable.com/demo');

  
    await page.click('text=Country');
    await page.fill('input[placeholder="Search"]', 'China');
    await page.keyboard.press('Enter'); 

    
    await page.click('text=Order Date'); 
    await page.click('text=Order Date'); 

    
    
    const countryCells = await page.$$('td[data-col="1"]');
    for (const cell of countryCells) {
      const country = await cell.textContent();
      if (country !== 'China') {
        console.error(`Błąd: Kraj ${country} nie jest "China"!`);
      }
    }

    
    const dateCells = await page.$$('td[data-col="0"]');
    let previousDate = new Date();
    for (const cell of dateCells) {
      const dateText = await cell.textContent();
      const currentDate = new Date(dateText);
      if (currentDate > previousDate) {
        console.error(`Błąd: Data ${dateText} nie jest posortowana malejąco!`);
      }
      previousDate = currentDate;
    }

    console.log('Test zakończony pomyślnie!');
  } catch (error) {
    console.error('Wystąpił błąd:', error);
  } finally {
    
    await browser.close();
  }
})();