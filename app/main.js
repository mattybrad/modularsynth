var actx = new AudioContext();

var vco1 = new VCO(91,92,93,5,56);
var vca1 = new VCA(7,4,1,0);
var adsr = new ADSR(6,3);
var keyboard = new Keyboard(55,15);
var out = new Output(2);
console.log(Socket._sockets);

var connection = new WebSocket('ws://localhost:3001', ['soap', 'xmpp']);

// When the connection is open, send some data to the server
connection.onopen = function () {
  connection.send('Ping'); // Send the message 'Ping' to the server
};

// Log errors
connection.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};

// Log messages from the server
connection.onmessage = function (e) {
  console.log('Server: ' + e.data);
};

function updateConnections(data) {
  var i,j;
  var connectionsToBreak = Socket.getConnections();
  var allValid = true;
  var c, res;
  for(i = 0; i < data.length; i ++) {
    c = data[i].split("-");
    if(c.length == 2) {
      c[0] = parseInt(c[0]);
      c[1] = parseInt(c[1]);

      res = Socket.testConnection(c[0],c[1]);
      if(!res.valid) allValid = false;
      else if(!res.exists) {
        console.log("MAKE CONNECTION BETWEEN "+data[i]);
        console.log("OUT="+res.out);
        console.log("IN="+res.in);
        Socket.makeConnection(res.out, res.in);
      } else {
        // if connection already existed and still exists, remove it from connectionsToBreak
        var connectionIndex = connectionsToBreak[res.out].indexOf(res.in);
        if(connectionIndex >= 0) {
          connectionsToBreak[res.out].splice(connectionIndex, 1);
        }
      }
    }
  }

  for(i = 0; i < connectionsToBreak.length; i ++) {
    if(connectionsToBreak[i]) {
      for(j = 0; j < connectionsToBreak[i].length; j++) {
        Socket.breakConnection(i, connectionsToBreak[i][j]);
      }
    }
  }

  console.log(allValid?"all connections ok":"check connections");
}

function updateControls(data) {
  for(var k in data) {
    if(data.hasOwnProperty(k)) {
      //vcf.controls[0].value = data[k];
      if(k=="0") {
        vca1.controls[0].value = data[k];
        console.log(data[k]);
      }
    }
  }
}

function getConnections(callback) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
      if (xmlhttp.status == 200) {
        callback(JSON.parse(xmlhttp.responseText));
      } else {
        console.log('ajax error');
      }
    }
  }

  xmlhttp.open("GET", "http://localhost:3000/data", true);
  xmlhttp.send();
}

var useArduino = false;

if(useArduino) {
  setInterval(function(){
    getConnections(function(data){
      console.log(data.connections);
      data.connections.push("55-56"); // faking the midi connection
      updateConnections(data.connections);
      updateControls(data.controls);
      console.log(data.controls);
      keyboard.note = data.note;
    });
  }, 1);
} else {
  updateConnections(["2-5"]);
}
