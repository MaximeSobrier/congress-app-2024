@echo off

REM Change directory to the specified path
REM cd C:\Users\msobrier\Projects\browser\congress\native-node\dist

REM Run the Node.js script and append both stdout and stderr to native-node.log
node index.js > native-node.log 2>&1