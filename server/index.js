var SerialPort = require('serialport');
var express = require('express');
var WebSocket = require('ws');
var wss = new WebSocket.Server({port:3001});
var testThing;
var app = express();
var serverPort = 3000;
var port = null; // serial port
var portMissing = false;

app.use(express.static('app'));

app.listen(serverPort, function () {
  console.log("listening for web socket connection...");
  wss.on('connection', function connection(ws) {
    console.log("web socket connection made!");

    if(!port && !portMissing) {
      console.log("attempting serial port connection...")
      try {
        port = new SerialPort('COM4', {
          baudRate: 250000,
          parser: SerialPort.parsers.readline('\n')
        });
      } catch(err) {
        console.log("serial port connection failed");
        portMissing = true;
        port = null;
      } finally {
        console.log("serial port connection succeeded!");
      }
    }

    var connections = [];
    var connectionsQueue = [];
    var controls = [];
    var controlsQueue = [];
    var note = 0, gate = false;
    var firstTime = true; // seemed to be getting some weird data through on first read - little hack to fix it
    port.on('data',function(data){
      if(!firstTime) {
        var messageType = data.slice(0,1);
        data = data.slice(1,-1); // get rid of message type and newline character(?)
        switch(messageType) {
          case "C":
          // connection message
          data = data.slice(0,-1); // get rid of trailing comma (hacky, sorry!)
          if(data.length) {
            connections = data.split(",");
          } else {
            connections = [];
          }
          break;

          case "A":
          // analogue (knob) message
          controls = [data];
          break;
        }
        // if(data.slice(0,-1)=="DONE") {
        //   connections = connectionsQueue;
        //   controls = controlsQueue;
        //   connectionsQueue = [];
        //   controlsQueue = [];
        // } else {
        //   if(data.charAt(0) == "A") controlsQueue.push(data.slice(1));
        //   else if(data.charAt(0) == "N") note = parseInt(data.slice(1));
        //   else if(data.charAt(0) == "G") gate = data.slice(1);
        //   else connectionsQueue.push(data);
        // }
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

    port.on('error', function() {
      console.log("hi there");
    })

  });
});
