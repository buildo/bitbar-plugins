#!/usr/bin/env /usr/local/bin/node


/******** CONFIGURATION ********/
const email = '...' // e.g., francesco@buildo.io
const password = '...' // your dropbox password
const puppeteerPath = '...' // e.g., /usr/local/lib/node_modules/puppeteer
/*************** ***************/


const puppeteer = require(puppeteerPath)

// global variable is needed to call "browser.close()" when script is over
let browser

async function getPaperTasks() {
  // setup
  browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({
    width: 1280,
    height: 800
  })

  // navigate to dropbox login page
  await page.goto('https://www.dropbox.com/login')
  await page.waitForSelector('input[type="email"]')

  // fill login form and login
  await page.type('input[type="email"]', email)
  await page.type('input[type="password"]', password)
  await page.click('.login-button')
  await page.waitForFunction(() => !window.location.href.includes('login'))

  // navigate to tasks page
  await page.goto('https://paper.dropbox.com/tasks', {waitUntil: 'networkidle2'})

  // collect tasks
  // collect tasks
  const taskElements = await page.$$('.hp-task-text')
  const tasks = await Promise.all(taskElements.map(async t => {
    const innerTextHandle = await t.getProperty('innerText')
    const innerText = await innerTextHandle.jsonValue()
    return innerText.trim()
  }))

  return tasks
}

function onSuccess(tasks) {
  const tasksCount = tasks.length
  const colorForCount = tasksCount > 0 ? 'red' : 'green'
  console.log(`✓ ${tasksCount} | color=${colorForCount}`)
  console.log('---')
  tasks.forEach(task => console.log(`${task} | href=https://paper.dropbox.com/tasks`))
  tasksCount > 0 && console.log('---')
  console.log('Open in browser | href=https://paper.dropbox.com/tasks')
  browser.close()
}

function onError(e) {
  console.error(e)
  browser.close()
}

// close browser on CTRL+C
process.on('SIGINT', () => {
  browser.close()
})

// run script
getPaperTasks()
  .then(onSuccess)
  .catch(onError)
