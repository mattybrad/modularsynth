var actx = new AudioContext();

var vco1 = new VCO(91,92,93,5,56);
var vco2 = new VCO(20,21,22,23,24);
var noise = new Noise(25);
var sampleAndHold = new SampleAndHold(40,41,42);
var bitCrusher = new BitCrusher(50,51);
var vcf1 = new VCF(30,31);
var delay = new Delay(60,61);
var lfo1 = new LFO(66,67);
var vca1 = new VCA(7,4,1,0);
var adsr = new ADSR(6,3);
var keyboard = new Keyboard(55,15);
var out = new Output(2);

var connection = new WebSocket('ws://localhost:3001', ['soap', 'xmpp']);

// Log errors
connection.onerror = function (error) {
  console.log('WebSocket Error ' + error);
};

var useArduino = true;

if(useArduino) {

  // do stuff on websocket data received
  connection.onmessage = function (e) {
    var data = JSON.parse(e.data);
    //data.connections.push("55-56"); // faking midi cv connection
    //data.connections.push("55-24"); // faking midi cv connection 2
    data.connections.push("42-56"); // SH to osc frequency
    data.connections.push("67-40"); // lfo to SH trigger
    data.connections.push("25-41"); // noise to SH input
    data.connections.push("15-6"); // faking connection between keyboard gate and adsr gate
    data.connections.push("0-60"); // faking connection
    data.connections.push("31-2"); // faking connection
    data.connections.push("61-50"); // faking connection
    data.connections.push("51-30"); // faking connection
    updateConnections(data.connections);
    updateControls(data.controls);
    keyboard.note = data.note;
  };
} else {
  updateConnections(["2-5"]);
}

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
}

function updateControls(data) {
  for(var k in data) {
    if(data.hasOwnProperty(k)) {
      //vcf.controls[0].value = data[k];
      if(k=="0") {
        lfo1.controls[0].value = data[k];
        vcf1.controls[0].value = data[k];
        //console.log(data[k]);
      }
    }
  }
}
