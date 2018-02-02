#!/usr/bin/env node

const puppeteer = require('puppeteer');
const credentials = require('./credentials')

// global variable is needed to call "browser.close()" when script is over
let browser;

async function getPaperTasksCount() {
  // setup
  browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 800
  });

  // navigate to dropbox login page
  await page.goto('https://www.dropbox.com/login');
  await page.waitForSelector('input[type="email"]');

  // fill login form and login
  await page.type('input[type="email"]', credentials.email);
  await page.type('input[type="password"]', credentials.password);
  await page.click('.login-button');
  await page.waitForFunction(() => !window.location.href.includes('login'));

  // navigate to tasks page
  await page.goto('https://paper.dropbox.com/tasks', {waitUntil: 'networkidle2'});

  // count tasks
  const tasks = await page.$$('.hp-task');
  return tasks.length;
};

function onSuccess(tasksCount) {
  console.log(tasksCount);
  browser.close();
}

function onError(e) {
  console.error(e);
  browser.close();
}

// run script
getPaperTasksCount()
  .then(onSuccess)
  .catch(onError)
