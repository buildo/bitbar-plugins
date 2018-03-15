#!/usr/bin/env /Users/francesco/.nvm/versions/v8.9.4/bin/node

/* ######### CONFIGURATION ######### */
const calendar = "francesco@buildo.io" // name of the Google Calendar, e.g. gabriele@buildo.io
/* ################################# */

const { execSync } = require('child_process')
const nowDate = new Date();

const now = nowDate.toISOString();

const icon = execSync('/usr/bin/curl -sL "https://cdn3.iconfinder.com/data/icons/eightyshades/512/39_Calendar-16.png" | base64')
const agenda = execSync(`/usr/local/bin/gcalcli --calendar ${calendar} agenda ${now} --tsv --nocolor`, { encoding: 'utf8' }).trim();

const parseLine = line => {
  const [startDate, startTime, endDate, endTime, event] = line.split('\t');
  return {
    startDate, startTime, endDate, endTime, event
  }
}

const days = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
// const months = ['Gen', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const pad = n => n < 10 ? `0${n}` : String(n);
const formatDate = (isoDate) => (
  `${days[new Date(isoDate).getDay()]} ${pad(new Date(isoDate).getDate())}` // ${months[new Date(isoDate).getMonth()]}`
)

const today = `${nowDate.getFullYear()}-${pad(nowDate.getMonth() + 1)}-${pad(nowDate.getDate())}`
const tomorrowDate = new Date((new Date()).setDate((new Date()).getDate() + 1));
const tomorrow = `${tomorrowDate.getFullYear()}-${pad(tomorrowDate.getMonth() + 1)}-${pad(tomorrowDate.getDate())}`

const lines = agenda.split('\n').map((line => parseLine(line.trim())));

const numberOfEventsToday = lines.filter(line => line.startDate === today).length;

console.log(`${numberOfEventsToday} | image=${icon}\n---`);

const agendaParsed = lines.forEach(({ startDate, startTime, endTime, event }, index) => {

  // if (index === 0) {
    // console.log(`${time} ${event.length > 15 ? event.slice(0, 12).trim() + '...' : event} | image=${icon}`)
    // console.log('---')
  // }

  if (startDate !== (lines[index - 1] || {}).startDate) {
    console.log(`${startDate === today ? 'Oggi' : startDate === tomorrow ? 'Domani' : formatDate(startDate)} | color=#848484`)
  }
  console.log(`    ${startTime}-${endTime} ${event} | href=https://calendar.google.com trim=false`)
});

console.log('---')
console.log('Open in browser | href=https://calendar.google.com')
