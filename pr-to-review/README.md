# PRs to review

[BitBar](https://github.com/matryer/bitbar) plugin to display the total number of PRs to review (e.g. open and assigned)

![image](https://cloud.githubusercontent.com/assets/691940/15679512/74f2e48e-2752-11e6-97bb-e4ece9dd7d76.png)

## What does it do?
Periodically checks the PRs assigned to a GitHub user and displays the total count on the OSX top bar.
You can click on the single count lines to jump to the relative GitHub page.

## Prerequisites
- [BitBar](https://github.com/matryer/bitbar) (if you use brew cask: `brew cask install bitbar`)
- [jq](https://stedolan.github.io/jq/) (`brew install jq`)

## Installation
- copy the script in the BitBar plugin directory
- make it executable (`chmod +x <script>`)
- edit the script to provide the necessary configuration (github tokens and github user)
- refresh BitBar
