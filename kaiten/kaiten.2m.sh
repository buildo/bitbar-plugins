#! /bin/bash

######### CONFIGURATION #########
KAITEN_TOKEN="" # get one at https://buildo.kaiten.io/profile/api-key
KAITEN_EMAIL="" # e.g. riccardo.ancona@buildo.io
#################################

PATH=$PATH:/usr/local/bin

KAITEN_API="https://buildo.kaiten.io/api/v1"
KAITEN_USER=`curl -s --request GET $KAITEN_API/users/ --header "Authorization: Bearer $KAITEN_TOKEN" | jq '.[] | select(.email == "'$KAITEN_EMAIL'") | .id'`
KAITEN_COM_RESULT=`curl -s --request GET $KAITEN_API/users/$KAITEN_USER/cards --header "Authorization: Bearer $KAITEN_TOKEN"`


KAITEN_MEMBERS_QUERY=".[] | select((.column.type == 1 or .column.type ==2) and has(\"members\")) | .members[] | select(.user_id == $KAITEN_USER and .type == 1)"
KAITEN_RESPONSIBLE_QUERY=".[] | select((.column.type == 1 or .column.type ==2) and has(\"members\")) | .members[] | select(.user_id == $KAITEN_USER and .type == 2)"

KAITEN_MEMBERS_COUNT=$((`echo $KAITEN_COM_RESULT | jq -c "$KAITEN_MEMBERS_QUERY" | wc -l`+0))
KAITEN_RESPONSIBLE_COUNT=$((`echo $KAITEN_COM_RESULT | jq -c "$KAITEN_RESPONSIBLE_QUERY" | wc -l`+0))

COUNT=$(($KAITEN_MEMBERS_COUNT+$KAITEN_RESPONSIBLE_COUNT))


function colorForCount {
  if [ $1 = 0 ]; then echo 'green'; else echo 'red'; fi
}

COLOR=`colorForCount $COUNT`

echo "⛩ $COUNT ($KAITEN_RESPONSIBLE_COUNT/$KAITEN_MEMBERS_COUNT)"
echo "---"
echo "Responsible of: $KAITEN_RESPONSIBLE_COUNT cards | href=https://buildo.kaiten.io/dashboard/cards?member=0&responsible=1 color=$COLOR"
echo "Member of: $KAITEN_MEMBERS_COUNT cards| href=https://buildo.kaiten.io/dashboard/cards?member=1&responsible=0 color=$COLOR"