# PRs to review

[BitBar](https://github.com/matryer/bitbar) plugin to display the total number of PRs to review.

![image](https://cloud.githubusercontent.com/assets/691940/22853783/da8d8510-f056-11e6-87dc-d07723fdd295.png)

## What does it do?
Periodically checks the review requested to a GitHub user and displays the total count on the OSX top bar.
You can click on the single count lines to jump to the relative GitHub page.

## Prerequisites
- [BitBar](https://github.com/matryer/bitbar) (if you use brew cask: `brew cask install bitbar`)
- [jq](https://stedolan.github.io/jq/) (`brew install jq`)

## Installation
- copy the script in the BitBar plugin directory
- make it executable (`chmod +x <script>`)
- edit the script to provide the necessary configuration (github tokens and github user)
- refresh BitBar
