echo $CODE > temp.js
mocha --reporter=json temp.js
