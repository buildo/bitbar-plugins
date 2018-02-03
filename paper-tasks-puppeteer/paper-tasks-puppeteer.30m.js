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
  await page.goto('https://paper.dropbox.com/tasks', { waitUntil: 'networkidle2' })

  // collect tasks
  const taskElements = await page.$$('.hp-task')
  const tasks = await Promise.all(taskElements.map(async t => {
    const text = await t.$('.hp-task-text')
      .then(t => t.getProperty('innerText'))
      .then(t => t.jsonValue())
      .then(t => t.trim())
    const paperElement = await t.$('.mention-pad')
    const paper = await paperElement.getProperty('innerText').then(t => t.jsonValue())
    const paperHref = await paperElement.getProperty('href').then(t => t.jsonValue())
    const dueDate = await t.$('.ace-line-task-controls-duedate .i18n-msg')
      .then(t => t && t.getProperty('innerText') || undefined)
      .then(t => t && t.jsonValue() || undefined)
    const isOverdue = await t.$('.ace-line-task-controls-overdue')
    return { text, paper, paperHref, dueDate, isOverdue }
  }))

  return tasks
}

function groupBy(xs, key) {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

const ansiReset = '\u001b[0m'
const ansiBlack = '\u001b[30m'
const ansiRed = '\u001b[31m'
const ansiBlue = '\u001b[34m'
const ansiCyan = '\u001b[4m'

function onSuccess(tasks) {
  const tasksCount = tasks.length
  const colorForCount = tasksCount > 0 ? 'red' : 'green'
  console.log(`✓ ${tasksCount} | color=${colorForCount}`)
  console.log('---')
  const tasksByPaper = groupBy(tasks, 'paper')
  Object.keys(tasksByPaper).forEach(paper => {
    const tasks = tasksByPaper[paper]
    console.log(`${paper} | color=#848484`)
    tasks.forEach(({ text, paperHref, dueDate = '', isOverdue }) => {
      const color = isOverdue ? ansiRed : ansiBlue
      const processedText = text.replace(/@\s*\w+ \w\s*/g, '')
      console.log(`    ${processedText} ${color}${dueDate}${ansiReset}| href=${paperHref} trim=false`)
    })
  })
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
