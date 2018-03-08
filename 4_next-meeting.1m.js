#!/usr/bin/env /Users/francesco/.nvm/versions/v8.9.4/bin/node

/* ######### CONFIGURATION ######### */
const calendar = "francesco@buildo.io" // name of the Google Calendar, e.g. gabriele@buildo.io
/* ################################# */

const { execSync } = require('child_process')
const nowDate = new Date();

const now = nowDate.toISOString();

const icon = execSync('/usr/bin/curl -sL "https://cdn3.iconfinder.com/data/icons/eightyshades/512/39_Calendar-16.png" | base64')
const agenda = execSync(`/usr/local/bin/gcalcli --calendar ${calendar} agenda ${now} --nocolor`, { encoding: 'utf8' }).trim();

const parseLine = line => ({
  date: line.slice(0, 10).trim(),
  time: line.slice(12, 19).trim(),
  event: line.slice(20).trim()
});

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Gen', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const pad = n => n < 10 ? `0${n}` : String(n);
const today = `${days[nowDate.getDay()]} ${months[nowDate.getMonth()]} ${pad(nowDate.getDate())}`
const tomorrowDate = new Date((new Date()).setDate((new Date()).getDate() + 1));
const tomorrow = `${days[tomorrowDate.getDay()]} ${months[tomorrowDate.getMonth()]} ${pad(tomorrowDate.getDate())}`

const lines = agenda.split('\n').filter(line => line.trim());

const numberOfEventsToday = lines.reduce((acc, line, index) => parseLine(line).date && parseLine(line).date !== today && acc === null ? index : acc, null);

console.log(`${numberOfEventsToday} | image=${icon}\n---`);

const agendaParsed = lines.forEach((line, index) => {
  const { date, time, event } = parseLine(line)

  // if (index === 0) {
    // console.log(`${time} ${event.length > 15 ? event.slice(0, 12).trim() + '...' : event} | image=${icon}`)
    // console.log('---')
  // }

  date && console.log(`${date === today ? 'Today' : date === tomorrow ? 'Tomorrow' : date} | color=#848484`)
  console.log(`    ${time} ${event} | href=https://calendar.google.com trim=false`)
});

console.log('---')
console.log('Open in browser | href=https://calendar.google.com')
