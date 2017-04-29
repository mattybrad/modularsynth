var SerialPort = require('serialport');
var express = require('express');
var WebSocket = require('ws');
var wss = new WebSocket.Server({port:3001});
var testThing;
var app = express();
var serverPort = 3000;
var port = null; // serial port

app.use(express.static('app'));

app.listen(serverPort, function () {
  console.log('listening')
  wss.on('connection', function connection(ws) {

    if(!port) {
      port = new SerialPort('COM4', {
        parser: SerialPort.parsers.readline('\n')
      });
    }

    var connections = [];
    var connectionsQueue = [];
    var controls = [];
    var controlsQueue = [];
    var note = 0, gate = false;
    var firstTime = true; // seemed to be getting some weird data through on first read - little hack to fix it
    port.on('data',function(data){
      if(!firstTime) {
        if(data.slice(0,-1)=="DONE") {
          connections = connectionsQueue;
          controls = controlsQueue;
          connectionsQueue = [];
          controlsQueue = [];
        } else {
          if(data.charAt(0) == "A") controlsQueue.push(data.slice(1));
          else if(data.charAt(0) == "N") note = parseInt(data.slice(1));
          else if(data.charAt(0) == "G") gate = data.slice(1);
          else connectionsQueue.push(data);
        }
      }
      firstTime = false;
      var controlObject = {};
      var splitControl;
      for(var i = 0; i < controls.length; i ++) {
        splitControl = controls[i].split("-");
        controlObject[splitControl[0]] = parseFloat(splitControl[1]) / 1023;
      }
      var data = {
        connections: connections,
        controls: controlObject,
        note: note,
        gate: gate
      }
      ws.send(JSON.stringify(data), function(err){
        // is this needed?
      });
    })

  });
});
