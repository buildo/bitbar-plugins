const puppeteer = require('puppeteer');
const credentials = require('./credentials')

async function getPaperTasksCount() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.dropbox.com/login', {waitUntil: 'networkidle2'});

  console.log('Opened login page! Taking first-screenshot.png');
  await page.screenshot({path: 'first-screenshot.png'});

  const email = await page.$('.login-email');
  const password = await page.$('.login-password');
  await email.type(credentials.email);
  await password.type(credentials.password);

  console.log('Form filled! Taking form-screenshot.png');
  await page.screenshot({path: 'form-screenshot.png'});

  //const button = await page.$('.login-button');
  console.log('Triying to Login...');

  const [response] = await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 0 }),
    page.click('.login-button')
  ]);

  console.log('Logged in! Taking login-screenshot.png');
  await page.screenshot({path: 'login-screenshot.png'});

  const tasksPage = await browser.newPage();
  await tasksPage.goto('https://paper.dropbox.com/tasks', {waitUntil: 'networkidle2'});

  console.log('Tasks opened! Taking tasks-screenshot.png');
  await tasksPage.screenshot({path: 'tasks-screenshot.png'});

  const tasks = await tasksPage.evaluate(() => (document.querySelectorAll('hp-task-section')));
  console.log(tasks);

  return tasks
};

getPaperTasksCount().then((tasksCount) => {
  console.log(tasksCount);
  process.exit();
});
