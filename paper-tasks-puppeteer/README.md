# Dropbox Paper tasks

[BitBar](https://github.com/matryer/bitbar) plugin to display the total number of assigned Dropbox paper tasks.

![image](https://user-images.githubusercontent.com/691940/35770241-f07efa68-0917-11e8-94f7-a5347a0a44da.png)

![](http://g.recordit.co/EBa1hZXnOv.gif)

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
