![](https://i.gyazo.com/e1720d59ae620b26e1b4ef70f291cbbb.gif)

# Installation
in your BitBar folder

`git clone https://github.com/francescogior/github-bitbar-counter && cd github-bitbar-counter && npm i`

# Create plugins
Add a js plugin in your BitBar folder

`my GithubBitbarPlugin.js`
````js

#!/usr/bin/env /usr/local/bin/node

//require and configure GithubBitbarCounter
const GithubBitbarCounter = require('./github-bitbar-counter')({
  GITHUB_COM_TOKEN: '', // get one at https://github.com/settings/tokens,
  GITHUB_ENTERPRISE_TOKEN: '', // your Github Enterprise TOKEN, if any,
  GITHUB_ENTERPRISE: '', // your Github Enterprise URL, if any
  GITHUB_ENTERPRISE_API: '' // your Github Enterprise API URL, if any
})

// query examples
GithubBitbarCounter({
  name: 'TODO LOL',
  enterprise: true,
  assignee: 'francescogior',
  type: 'issue',
  repo: 'buildo/lol',
  state: 'open',
  labelsIn: [],
  labelsOut: ['macro', 'in review'],
  milestone: 'this week'
}, {
  name: 'ALL LOL ISSUES',
  enterprise: true,
  assignee: 'francescogior',
  type: 'issue',
  repo: 'buildo/lol',
  state: 'open',
  labelsIn: []
}, {
  name: 'ASSIGNED LOL PR',
  enterprise: true,
  assignee: 'francescogior',
  type: 'pr',
  repo: 'buildo/lol',
  state: 'open',
  labelsIn: []
})
````
