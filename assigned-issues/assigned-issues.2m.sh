#! /bin/bash

######### CONFIGURATION #########
GITHUB_USER="" # e.g. "gabro"
GITHUB_COM_TOKEN="" # get one at https://github.com/settings/tokens
#################################

PATH=$PATH:/usr/local/bin

GITHUB_COM_API="https://api.github.com"

QUERY="assignee:$GITHUB_USER+type:issue+state:open"

GITHUB_COM_RESULT=`curl -ks $GITHUB_COM_API/search/issues\?q\=$QUERY\&access_token\=$GITHUB_COM_TOKEN`

COUNT=`echo $GITHUB_COM_RESULT | jq '.total_count'`

case $BitBarDarkMode in
  1) ICON_URL=http://s16.postimg.org/47oxw1dg1/issue_icon_white.png ;;
  *) ICON_URL=http://s16.postimg.org/3kumk95xt/issue_icon_black.png ;;
esac

ISSUE_ICON=`curl -sL $ICON_URL | base64`

echo " $COUNT | image=$ISSUE_ICON href=https://github.com/issues/assigned color=$GITHUB_COM_COLOR"
