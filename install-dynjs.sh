#!/bin/sh

URL="http://repository-projectodd.forge.cloudbees.com/snapshot/org/dynjs/dynjs/0.1.2-SNAPSHOT/dynjs-0.1.2-20130430.142049-18.zip"
CURL_ARGS="-f -s -S -k"

curl $CURL_ARGS $URL > dynjs.zip
unzip dynjs.zip

echo "DynJS is installed. Play tictactoe with \`./bin/dynjs tictactoe.js\`"
