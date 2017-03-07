#! /bin/bash


######### CONFIGURATION #########
CALENDAR="" # name of the Google Calendar, e.g. gabriele@buildo.io
#################################

PATH=$PATH:/usr/local/bin

MEETING=$(gcalcli --calendar $CALENDAR agenda --nocolor $(date +%Y-%m-%dT%H:%M:%S) | cut -d " " -f 4- | head -2 | tail -1 | sed "s/^ *//g" | sed "s/    / /g")

CALENDAR_ICON=$(curl -sL "https://cdn3.iconfinder.com/data/icons/eightyshades/512/39_Calendar-16.png" | base64)

echo " $MEETING | image=$CALENDAR_ICON"
