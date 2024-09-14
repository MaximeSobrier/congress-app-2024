@echo off

REM Run the Node.js script and append both stdout and stderr to native-node.log
node index.js > native-node.log 2>&1