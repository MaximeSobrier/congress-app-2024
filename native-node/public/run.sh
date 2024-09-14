#!/usr/bin/bash

# cd /home/msobrier/Projects/browser/congress/native-node/dist
node index.js 2>&1 | tee -a native-node.log
