var SerialPort = require('serialport');
var express = require('express');

var port = new SerialPort('COM3', {
  parser: SerialPort.parsers.readline('\n')
});

var connections = [];
var connectionsQueue = [];
var firstTime = true; // seemed to be getting some weird data through on first read - little hack to fix it
port.on('data',function(data){
  if(!firstTime) {
    if(data.slice(0,-1)=="DONE") {
      connections = connectionsQueue;
      connectionsQueue = [];
    } else {
      connectionsQueue.push(data);
    }
  }
  firstTime = false;
})

var app = express();
var serverPort = 3000;

app.get('/connections', function (req, res) {
  res.send(connections.join(","));
});

app.use(express.static('app'));

app.listen(serverPort, function () {
  console.log('listening')
});
