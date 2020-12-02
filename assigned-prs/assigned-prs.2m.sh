#! /bin/bash

######### CONFIGURATION #########
GITHUB_USER="raasoft" # e.g. "gabro"
GITHUB_COM_TOKEN="258fbe2a1dd80ffc10a7d7c68c36361e08568e80" # get one at https://github.com/settings/tokens
#################################

PATH=$PATH:/usr/local/bin

GITHUB_COM_API="https://api.github.com"

QUERY="assignee:$GITHUB_USER+type:pr+state:open"

GITHUB_COM_RESULT=`curl -ks $GITHUB_COM_API/search/issues\?q\=$QUERY\&access_token\=$GITHUB_COM_TOKEN`

GITHUB_COM_COUNT=`echo $GITHUB_COM_RESULT | jq '.total_count'`

PR_COUNT=$(($GITHUB_COM_COUNT))

function colorForCount {
  if [ $1 = 0 ]; then echo 'green'; else echo 'red'; fi
}

COLOR=`colorForCount $PR_COUNT`
GITHUB_COM_COLOR=`colorForCount $GITHUB_COM_COUNT`

case $BitBarDarkMode in
  1) ICON_URL=http://s15.postimg.org/knbhkfq7r/pr_icon_white.png ;;
  *) ICON_URL=http://s15.postimg.org/3ya1oitmf/pr_icon_black.png ;;
esac

MERGE_ICON=`curl -sL $ICON_URL | base64`

echo " $PR_COUNT | color=$COLOR image=$MERGE_ICON"
echo "---"
echo "github.com: $GITHUB_COM_COUNT | href=https://github.com/pulls/assigned color=$GITHUB_COM_COLOR"
