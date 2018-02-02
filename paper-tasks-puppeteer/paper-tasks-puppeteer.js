#!/usr/bin/env node


/******** CONFIGURATION ********/
const email = '...' // e.g. francesco@buildo.io
const password = '...' // your dropbox password
/*************** ***************/


const puppeteer = require('puppeteer')

// global variable is needed to call "browser.close()" when script is over
let browser

async function getPaperTasksCount() {
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

  // count tasks
  const tasks = await page.$$('.hp-task')
  return tasks.length
}

function onSuccess(tasksCount) {
  console.log(tasksCount)
  console.log('---')
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
getPaperTasksCount()
  .then(onSuccess)
  .catch(onError)
