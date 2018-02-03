# Assigned PRs

[BitBar](https://github.com/matryer/bitbar) plugin to display the total number of assigned PRs.

![image](https://cloud.githubusercontent.com/assets/691940/15679512/74f2e48e-2752-11e6-97bb-e4ece9dd7d76.png)

## What does it do?
Periodically checks the tasks assigned to a Dropbox Paper user and displays the total count on the OSX top bar.
You can click on the count to show the link to open the Dropbox Paper tasks page.

## Prerequisites
- [BitBar](https://github.com/matryer/bitbar) (if you use brew cask: `brew cask install bitbar`)
- [node](https://nodejs.org/) (`brew install node`)
- [puppeteer](https://github.com/GoogleChrome/puppeteer) (`npm install -g puppeteer`)

## Installation
- copy the script in the BitBar plugin directory
- make it executable (`chmod +x <script>`)
- edit the script to provide the necessary configuration (Dropbox email and password, and the path of your puppeteer installation)
- edit the first line of the script, if necessary, to provide it with the correct path of the `node` executable
- refresh BitBar
