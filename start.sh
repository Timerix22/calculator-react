#!/bin/bash
source /home/timerix/.allrc
echo $PATH
npm run build
./node_modules/.bin/serve -p 8081 -s build
node out/src/index.js
