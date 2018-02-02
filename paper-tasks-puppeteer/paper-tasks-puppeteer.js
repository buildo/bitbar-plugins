const puppeteer = require('puppeteer');
const credentials = require('./credentials')

let browser;

async function getPaperTasksCount() {
  browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 800
  });

  await page.goto('https://www.dropbox.com/login');
  await page.waitForSelector('input[type="email"]');

  console.log('Opened login page! Taking first-screenshot.png');
  await page.screenshot({path: 'first-screenshot.png'});

  await page.type('input[type="email"]', credentials.email);
  await page.type('input[type="password"]', credentials.password);

  console.log('Form filled! Taking form-screenshot.png');
  await page.screenshot({path: 'form-screenshot.png'});

  console.log('Trying to Login...');

  await page.click('.login-button');
  await page.waitForFunction(() => !window.location.href.includes('login'));

  console.log('Logged in! Taking login-screenshot.png');
  await page.screenshot({path: 'login-screenshot.png'});


  await page.goto('https://paper.dropbox.com/tasks', {waitUntil: 'networkidle2'});

  console.log('Tasks opened! Taking tasks-screenshot.png');
  await page.screenshot({path: 'tasks-screenshot.png'});

  // const taskElements = await page.$$('.hp-task-text .line-list-type-task > span:first-child');

  // const tasks = await Promise.all(
  //   taskElements.map(async t => t.getProperty('innerHTML').then(v => v.jsonValue()))
  // );

  const tasks = await page.$$('.hp-task');

  return tasks.length;
};

getPaperTasksCount()
  .then((tasksCount) => {
    console.log(tasksCount);
    browser.close();
  })
  .catch(e => {
    console.error(e);
    browser.close();
  })
