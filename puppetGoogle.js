const puppeteer = require('puppeteer');

(async () => {
	// launch the browser
	const browser = await puppeteer.launch({
		headless: false,
		// devtools: false,
		// args: ["--start-maximized"]
	});

	// create a new tab
	const page = await browser.newPage();
	// go to google.com
	await page.goto('https://google.com');
	// go to the search bar by finding the name attribute in CSS
	// make sure its the only one by doing document.querySelector('input[name=q]') in the console of the page
	await page.focus('input[name=q]');
	// type inside the webpage with keyboard API
	await page.keyboard.type('Puppeteer');
	// pres enter on the keyboard
	await page.keyboard.press('Enter');
	// Or you can focus on the search button
	// const searchButton = await page.&('input[name=btnK]')
	// await searchButton.click()
})();

/// this was made using https://itnext.io/puppeteer-or-how-i-learned-to-stop-worrying-and-love-the-automation-92e96f4901e7 tutorial
