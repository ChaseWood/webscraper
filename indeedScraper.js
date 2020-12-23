const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({
		headless: false,
		devtools: false,
	});
	// opening new page
	const page = await browser.newPage();
	// going to url
	await page.goto('https://www.indeed.com/');
	// focus on job search input
	await page.focus('input[name=q]');
	// typing job search input
	await page.keyboard.type('Software Developer');
	// focus on city input
	await page.focus('input[name=l]');
	// remove automatic input in city form
	await page.$eval('input[name=l]', (el) => (el.value = ''));
	// type city into form
	await page.keyboard.type('Denver, CO');
	// search for job title and city
	await page.keyboard.press('Enter');

	// wait for page to load first result
	await page.waitForSelector('.jobtitle');
	// create way to handle popup of first job
	const newPagePromise = new Promise((el) => page.once('popup', el));
	// click first job after search
	await page.$eval('.jobtitle', (el) => el.click());
	// go to new page after click link for first job from search
	const newPage = await newPagePromise;

	// wait for class of job title to load
	await newPage.waitForSelector('.jobsearch-JobInfoHeader-title');
	// get text of job title
	const jobTitleText = await newPage.$eval(
		'.jobsearch-JobInfoHeader-title',
		(el) => el.innerText.trim()
	);
	console.log(jobTitleText);

	// get text of job location
	const jobLocation = await newPage.$eval(
		'.jobsearch-DesktopStickyContainer-companyrating',
		(el) => el.innerText.trim()
	);
	console.log(jobLocation);

	// get job Qualifications
	const jobQualifications = await newPage.$eval(
		'.jobsearch-ReqAndQualSection-item--wrapper',
		(el) => el.innerText.trim()
	);
	console.log(jobQualifications);

	// get job description text
	const jobDescriptionText = await newPage.$eval(
		'.jobsearch-jobDescriptionText',
		(el) => el.textContent.trim()
	);

	// job object/JSON;
	// const jobListing = {
	// 	title: `${jobTitleText}`,
	// 	qualifications: `${jobQualifications}`,
	// 	description: `${jobDescriptionText}`,
	// };

	// console.log(jobListing);
})();
