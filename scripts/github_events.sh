#!/bin/sh

# grab the JSON from the github API and save it to a file named github_events.json
curl https://api.github.com/users/23maverick23/events > /home/rymobot/rymo/github_events.json
