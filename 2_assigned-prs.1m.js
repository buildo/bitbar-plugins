#! /bin/bash

source /Users/francesco/bitbar-plugins/configs/config.cfg

######### CONFIGURATION #########
GITHUB_USER=$github_username # e.g. "gabro"
GITHUB_COM_TOKEN=$github_token # get one at https://github.com/settings/tokens
GITHUB_ENTERPRISE_TOKEN=$github_ghe_token # get one at https://github.omnilab.our.buildo.io/settings/tokens
#################################

PATH=$PATH:/usr/local/bin

GITHUB_COM_API="https://api.github.com"
GITHUB_ENTERPRISE_API="https://github.omnilab.our.buildo.io/api/v3"

QUERY="assignee:$GITHUB_USER+type:pr+state:open"

GITHUB_COM_RESULT=`curl -ks $GITHUB_COM_API/search/issues\?q\=$QUERY\&access_token\=$GITHUB_COM_TOKEN`
GITHUB_ENTERPRISE_RESULT=`curl -ks $GITHUB_ENTERPRISE_API/search/issues\?q\=$QUERY\&access_token\=$GITHUB_ENTERPRISE_TOKEN`

GITHUB_COM_COUNT=`echo $GITHUB_COM_RESULT | jq '.total_count'`
GITHUB_ENTERPRISE_COUNT=`echo $GITHUB_ENTERPRISE_RESULT | jq '.total_count'`

PR_COUNT=$(($GITHUB_COM_COUNT + $GITHUB_ENTERPRISE_COUNT))

function colorForCount {
  if [ $1 = 0 ]; then echo 'green'; else echo 'red'; fi
}

COLOR=`colorForCount $PR_COUNT`
GITHUB_COM_COLOR=`colorForCount $GITHUB_COM_COUNT`
GITHUB_ENTERPRISE_COLOR=`colorForCount $GITHUB_ENTERPRISE_COUNT`

case $BitBarDarkMode in
  1) ICON_URL=http://s15.postimg.org/knbhkfq7r/pr_icon_white.png ;;
  *) ICON_URL=http://s15.postimg.org/3ya1oitmf/pr_icon_black.png ;;
esac

MERGE_ICON=`curl -sL $ICON_URL | base64`

echo " $PR_COUNT | color=$COLOR image=$MERGE_ICON"
echo "---"
echo "github.com: $GITHUB_COM_COUNT | href=https://github.com/pulls/assigned color=$GITHUB_COM_COLOR"
echo "omnilab: $GITHUB_ENTERPRISE_COUNT | href=https://github.omnilab.our.buildo.io/pulls/assigned color=$GITHUB_ENTERPRISE_COLOR"
