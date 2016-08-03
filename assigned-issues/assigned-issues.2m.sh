#! /bin/bash

######### CONFIGURATION #########
GITHUB_USER="" # e.g. "gabro"
GITHUB_COM_TOKEN="" # get one at https://github.com/settings/tokens
GITHUB_ENTERPRISE_TOKEN="" # get one at https://github.omnilab.our.buildo.io/settings/tokens
#################################

PATH=$PATH:/usr/local/bin

GITHUB_COM_API="https://api.github.com"
GITHUB_ENTERPRISE_API="https://github.omnilab.our.buildo.io/api/v3"

QUERY="assignee:$GITHUB_USER+type:issue+state:open"

GITHUB_COM_RESULT=`curl -ks $GITHUB_COM_API/search/issues\?q\=$QUERY\&access_token\=$GITHUB_COM_TOKEN`
GITHUB_ENTERPRISE_RESULT=`curl -ks $GITHUB_ENTERPRISE_API/search/issues\?q\=$QUERY\&access_token\=$GITHUB_ENTERPRISE_TOKEN`

GITHUB_COM_COUNT=`echo $GITHUB_COM_RESULT | jq '.total_count'`
GITHUB_ENTERPRISE_COUNT=`echo $GITHUB_ENTERPRISE_RESULT | jq '.total_count'`

COUNT=$(($GITHUB_COM_COUNT + $GITHUB_ENTERPRISE_COUNT))

case $BitBarDarkMode in
  1) ICON_URL=http://s16.postimg.org/47oxw1dg1/issue_icon_white.png ;;
  *) ICON_URL=http://s16.postimg.org/3kumk95xt/issue_icon_black.png ;;
esac

ISSUE_ICON=`curl -s $ICON_URL | base64`

echo " $COUNT | image=$ISSUE_ICON"
echo "---"
echo "github.com: $GITHUB_COM_COUNT | href=https://github.com/issues/assigned color=$GITHUB_COM_COLOR"
echo "omnilab: $GITHUB_ENTERPRISE_COUNT | href=https://github.omnilab.our.buildo.io/issues/assigned color=$GITHUB_ENTERPRISE_COLOR"
