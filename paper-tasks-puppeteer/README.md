# Dropbox Paper tasks

[BitBar](https://github.com/matryer/bitbar) plugin to display the total number of assigned Dropbox paper tasks.

![](http://g.recordit.co/EBa1hZXnOv.gif)

## What does it do?
Periodically checks the tasks assigned to a Dropbox Paper user and displays the total count on the OSX top bar.
You can click on the count to show the link to open the Dropbox Paper tasks page.

## Prerequisites
- [BitBar](https://github.com/matryer/bitbar) (if you use brew cask: `brew cask install bitbar`)
- [node](https://nodejs.org/) (`brew install node`)
- [puppeteer@0.13](https://github.com/GoogleChrome/puppeteer) (`npm install -g puppeteer@0.13`)

## Installation
- copy the script in the BitBar plugin directory
- make it executable (`chmod +x <script>`)
- edit the script to provide the necessary configuration (documented inline)
- edit the first line of the script, if necessary, to provide it with the correct path of the `node` executable
- refresh BitBar

## If you're using 2FA
In case you're using 2FA, the plugin can't log you in automatically. However, you can login manually and have the plugin to store your session as your browser does.
Here's what you have to do:

- Edit the script and set `const headless = false`. This will cause you to see the UI when launching the plugin
- Run the script and wait for the 2FA code page
- Insert your 2FA code and check the 'Trust this computer' checkbox
- Edit the script and set `const headless = true`

That's it! Further runs of the plugin should be automatically logged in.

In case your session expires, simply repeat the steps above.
