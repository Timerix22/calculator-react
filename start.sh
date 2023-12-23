#!/bin/bash
source /home/timerix/.allrc
npm run build
./node_modules/.bin/serve -p 8081 -s build
