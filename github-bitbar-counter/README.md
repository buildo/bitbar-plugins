# Github Bitbar Counter
**Get easy access to your favourite Github searches**

![](https://i.gyazo.com/8c833d0e782d3401b4fec13c4ac2bee7.gif)


## Prerequisites
- [BitBar](https://github.com/matryer/bitbar) (if you use brew cask: `brew cask install bitbar`)
- [jq](https://stedolan.github.io/jq/) (`brew install jq`)


## Installation
in your BitBar folder (`~/Bitbar` or something)

`git clone https://github.com/org/bitbar-plugins && cd bitbar-plugins/github-bitbar-counter && npm i`


## Create plugins
To create plugins
- require `./bitbar-plugins/github-bitbar-counter`
- configure it with your tokens and urls (for enterprise users)
- remember to make it executable (`chmod +x ~/Bitbar/myGithubBitbarPlugin.js`)


`~/Bitbar/myGithubBitbarPlugin.js`
````js

#!/usr/bin/env /usr/local/bin/node

const GithubBitbarCounter = require('./bitbar-plugins/github-bitbar-counter')({
  GITHUB_COM_TOKEN: '', // get one at https://github.com/settings/tokens,
  GITHUB_ENTERPRISE_TOKEN: '', // your Github Enterprise TOKEN, if any,
  GITHUB_ENTERPRISE: '', // your Github Enterprise URL, if any
  GITHUB_ENTERPRISE_API: '' // your Github Enterprise API URL, if any
})

GithubBitbarCounter({
  assignee: 'francescogior',
  name: 'TODO',
  enterprise: true,
  type: 'issue',
  repo: 'org/repo',
  state: 'open',
  labelsIn: ['web'],
  labelsOut: ['macro', 'in review', 'wip', 'icebox'],
  milestone: 'this week'
}, {
  assignee: 'francescogior',
  name: 'TO REVIEW',
  enterprise: true,
  type: 'pr',
  repo: 'org/repo',
  state: 'open'
}, {
  assignee: 'francescogior',
  name: 'DOING',
  enterprise: true,
  type: 'issue',
  repo: 'org/repo',
  state: 'open',
  labelsIn: ['wip'],
  labelsOut: ['macro', 'in review'],
  milestone: 'this week'
}, {
  author: 'francescogior',
  name: 'IN REVIEW',
  enterprise: true,
  type: 'pr',
  repo: 'org/repo',
  labelsIn: ['in review'],
  state: 'open'
}, {
  assignee: 'francescogior',
  name: 'DONE',
  enterprise: true,
  type: 'issue',
  repo: 'org/repo',
  state: 'closed',
  milestone: 'this week'
}, {
  assignee: 'francescogior',
  name: 'ICEBOX',
  enterprise: true,
  type: 'issue',
  repo: 'org/repo',
  state: 'open',
  labelsIn: ['icebox']
});

````
