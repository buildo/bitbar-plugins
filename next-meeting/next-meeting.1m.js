#!/usr/bin/env PATH/TO/YOUR/NODE (get it with `which node`)

/* ######### CONFIGURATION ######### */
const calendar = '' // name of the Google Calendar, e.g. gabriele@buildo.io
/* ################################# */

const { execSync } = require('child_process')

const now = (new Date).toISOString()

const icon = execSync('/usr/bin/curl -sL "https://cdn3.iconfinder.com/data/icons/eightyshades/512/39_Calendar-16.png" | base64')
const agenda = execSync(`/usr/local/bin/gcalcli --calendar ${calendar} agenda ${now} --nocolor`, { encoding: 'utf8' }).trim();

const parseLine = line => ({
  date: line.slice(0, 10).trim(),
  time: line.slice(12, 19).trim(),
  event: line.slice(20).trim()
});

const lines = agenda.split('\n').filter(line => line.trim());
const agendaParsed = lines.forEach((line, index) => {
  const { date, time, event } = parseLine(line)

  if (index === 0) {
    console.log(`${time} ${event} | image=${icon}`)
    console.log('---')
  }

  date && console.log(`${date} | color=#848484`)
  console.log(`    ${time} ${event} | href=https://calendar.google.com trim=false`)
});

console.log('---')
console.log('Open in browser | href=https://calendar.google.com')
