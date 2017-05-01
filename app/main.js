var actx = new AudioContext();

var vco1 = new VCO(91,92,93,5,56,94);
var vco2 = new VCO(20,21,22,23,24,26);
var noise = new Noise(25);
var sampleAndHold = new SampleAndHold(40,41,42);
var bitCrusher = new BitCrusher(50,51);
var vcf1 = new VCF(30,31);
var delay = new Delay(60,61);
var quantizer = new Quantizer(80,81);
var lfo1 = new LFO(66,67);
var sequencer = new Sequencer(70,71);
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
    data.connections.push("5-2");
    data.connections.push("67-94");
    data.connections.push("55-56");

    updateConnections(data.connections);
    updateControls(data.controls);
    keyboard.note = data.note;
  };
} else {

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
        vco1.controls[2].value = data[k];
        lfo1.controls[0].value = data[k];
        //console.log(data[k]);
      }
    }
  }
}
