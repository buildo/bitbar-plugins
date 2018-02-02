#! /bin/bash

PATH=$PATH:/usr/local/bin

######### CONFIGURATION #########
 # Get this values from your Dropbox Paper cookie
ES2=''
BLID=''
BJAR=''
#################################

PAPER_TASKS_COUNT=`curl -sL 'https://paper.dropbox.com/tasks/list?type=tasks-assigned-to-me&onlyCompleted=false&excludeWontFix=true' \
--compressed -H "cookie: ES2=$ES2; blid=$BLID; bjar=$BJAR;" | jq ".tasks| length"`

function colorForCount {
  if [ $1 = 0 ]; then echo 'green'; else echo 'red'; fi
}

COLOR=`colorForCount $PAPER_TASKS_COUNT`

echo "✓ $PAPER_TASKS_COUNT | color=$COLOR"
echo "---"
echo "paper tasks: $PAPER_TASKS_COUNT | href=https://paper.dropbox.com/tasks color=$COLOR"
