# Assigned issues

[BitBar](https://github.com/matryer/bitbar) plugin to display the total number of open assigned issues

![](http://s29.postimg.org/b3c497fiv/Screen_Shot_2016_03_21_at_11_35_42_AM.png)

## What does it do?
Periodically checks the open issues assigned to a GitHub user and displays the total count on the OSX top bar.
You can click on the single count lines to jump to the relative GitHub page.

## Prerequisites
- [BitBar](https://github.com/matryer/bitbar) (if you use brew cask: `brew cask install bitbar`)
- [jq](https://stedolan.github.io/jq/) (`brew install jq`)

## Installation
- copy the script in the BitBar plugin directory
- make it executable (`chmod +x <script>`)
- edit the script to provide the necessary configuration (github tokens and github user)
- refresh BitBar
