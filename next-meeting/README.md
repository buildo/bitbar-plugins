# Next meeting

[BitBar](https://github.com/matryer/bitbar) plugin to display the next meeting in Google Calendar.

## What does it do?
Display the next meeting, including the current one if started.

Clicking on the bar, displays the full agenda for the week:
![image](https://user-images.githubusercontent.com/4029499/35934517-20226cea-0c3e-11e8-9b2a-0ae934234418.png)

## Prerequisites
- [BitBar](https://github.com/matryer/bitbar) (if you use brew cask: `brew cask install bitbar`)
- [gcalcli](https://github.com/insanum/gcalcli) (`pip install gcalcli`)

## Installation
- copy the script in the BitBar plugin directory
- make it executable (`chmod +x <script>`)
- edit the script to provide the necessary configuration
  - path to NodeJS at the beginning of the file
  - calendar name (usually your email)
- refresh BitBar
