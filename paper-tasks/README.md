# Assigned PRs

[BitBar](https://github.com/matryer/bitbar) plugin to display the total number of assigned PRs.

![image](https://user-images.githubusercontent.com/6418684/35742801-ec040de8-083b-11e8-9625-c9ba4fe7db00.png)

## What does it do?
Periodically checks the tarks assigned to a Dropbox Paper user and displays the total count on the OSX top bar.
You can click on the single count lines to jump to the Paper tasks page.

## Prerequisites
- [BitBar](https://github.com/matryer/bitbar) (if you use brew cask: `brew cask install bitbar`)
- [jq](https://stedolan.github.io/jq/) (`brew install jq`)

## Installation
- copy the script in the BitBar plugin directory
- make it executable (`chmod +x <script>`)
- edit the script to provide the necessary configuration (you can find the corresponding values in your Dropbox Paper cookie)
- refresh BitBar

## Note

This does not use the Dropbox API, since it does not provide a way to get the tasks. This means that your will probably need to update the configuration values if you log out from Dropbox or when they expire.
