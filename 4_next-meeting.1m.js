#!/usr/bin/env /Users/francesco/.nvm/versions/v8.9.4/bin/node

/* ######### CONFIGURATION ######### */
const calendar = "francesco@buildo.io"; // name of the Google Calendar, e.g. gabriele@buildo.io
/* ################################# */

const { execSync } = require("child_process");
const nowDate = new Date();

const now = nowDate.toISOString();

const agenda = execSync(
  `/usr/local/bin/gcalcli --calendar ${calendar} agenda ${now} --tsv --nocolor --detail_url long --detail_location`,
  { encoding: "utf8" }
).trim();

const locations = {
  "Loft 2-Open Space-Salottino (18)": "Divano 2",
  "Loft 1-Upstairs-Sala Riunioni (12)": "Sala riunioni",
  "Campo da basket Loft 1": "Kanban",
  "loft 1 campo da basket": "Kanban",
  "Loft 1-Open Space-divano loft 1 (20)": "Divano 1"
};

const parseLine = line => {
  const [
    startDate,
    startTime,
    endDate,
    endTime,
    url,
    _videoCallUrl, // not used
    event,
    location
  ] = line.split("\t");

  return {
    startDate,
    startTime,
    endDate,
    endTime,
    url,
    event,
    location: locations[location] || (location ? "Out" : "")
  };
};

const days = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];
const pad = n => (n < 10 ? `0${n}` : String(n));
const formatDate = isoDate =>
  `${days[new Date(isoDate).getDay()]} ${pad(new Date(isoDate).getDate())}`; // ${months[new Date(isoDate).getMonth()]}`

const today = `${nowDate.getFullYear()}-${pad(nowDate.getMonth() + 1)}-${pad(
  nowDate.getDate()
)}`;
const tomorrowDate = new Date(new Date().setDate(new Date().getDate() + 1));
const tomorrow = `${tomorrowDate.getFullYear()}-${pad(
  tomorrowDate.getMonth() + 1
)}-${pad(tomorrowDate.getDate())}`;

const lines = agenda.split("\n").map(line => parseLine(line.trim()));

const numberOfEventsToday = lines.filter(line => line.startDate === today)
  .length;

// TOP BAR ICON
console.log(`📅 ${numberOfEventsToday}\n---`);

// DROPDOWN CONTENT
lines.forEach(
  ({ startDate, startTime, endTime, url, event, location }, index) => {
    if (startDate !== (lines[index - 1] || {}).startDate) {
      console.log(
        `${
          startDate === today
            ? "Oggi"
            : startDate === tomorrow
            ? "Domani"
            : formatDate(startDate)
        } | color=#848484`
      );
    }
    console.log(
      `    ${startTime}-${endTime}    ${event}    ${location &&
        "@" + location} | font=UbuntuMono href=${url} trim=false`
    );
  }
);

console.log("---");
console.log("Open in browser | href=https://calendar.google.com");
