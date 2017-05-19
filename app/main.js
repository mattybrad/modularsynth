var actx = new AudioContext();

var vco1 = new VCO(
  VCO1_SAW,
  VCO1_SQUARE,
  VCO1_TRIANGLE,
  VCO1_SINE,
  VCO1_CV1,
  VCO1_CV2
);
var vco2 = new VCO(
  VCO2_SAW,
  VCO2_SQUARE,
  VCO2_TRIANGLE,
  VCO2_SINE,
  VCO2_CV1,
  VCO2_CV2
);
var noise = new Noise(NOISE_OUT);
var sampleAndHold = new SampleAndHold(
  SH_TRIGGER,
  SH_IN,
  SH_OUT
);
var bitCrusher = new BitCrusher(
  CRUSHER_IN,
  CRUSHER_OUT
);
var vcf1 = new VCF(
  VCF1_CV,
  VCF1_IN,
  VCF1_OUT
);
var delay = new Delay(
  DELAY_IN,
  DELAY_OUT
);
var quantizer = new Quantizer(
  QUANTIZER_IN,
  QUANTIZER_OUT
);
var lfo1 = new LFO(
  LFO1_CV,
  LFO1_SQUARE,
  LFO1_SINE
);
var sequencer = new Sequencer(
  SEQUENCER_CV,
  SEQUENCER_GATE
);
var vca1 = new VCA(
  VCA1_CV1,
  VCA1_CV2,
  VCA1_IN,
  VCA1_OUT
);
var adsr = new ADSR(
  ADSR1_GATE,
  ADSR1_OUT
);
var keyboard = new Keyboard(
  MIDI_CV,
  MIDI_GATE
);
var out = new Output(OUTPUT_IN);

for(var i = 0; i < Module.allModules.length; i ++) {
  GUI.gui.addModule(Module.allModules[i]);
}

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
    if(data.controls[0]!=null) console.log(data.controls[0]);
    //if(Math.random()>0.99) console.log(data.controls);
    // data.connections.push([VCO1_SQUARE, VCA1_IN].join("-"));
    // data.connections.push([VCA1_OUT, OUTPUT_IN].join("-"));
    // data.connections.push([MIDI_CV, VCO1_CV1].join("-"));
    // data.connections.push([MIDI_GATE, VCA1_CV1].join("-"));

    updateConnections(data.connections);
    //console.log(data.connections);
    //updateControls(data.controls);
    keyboard.note = data.note;
  };
} else {
  var data = {
    connections: []
  }
  data.connections.push([VCO1_SQUARE, VCA1_IN].join("-"));
  data.connections.push([VCA1_OUT, OUTPUT_IN].join("-"));
  data.connections.push([MIDI_CV, VCO1_CV1].join("-"));
  data.connections.push([MIDI_GATE, ADSR1_GATE].join("-"));
  data.connections.push([ADSR1_OUT, VCA1_CV1].join("-"));
  updateConnections(data.connections);
  lfo1.controls[0].value = 0.3;
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
        //lfo1.controls[0].value = data[k];
        vcf1.controls[0].value = data[k];
        //vcf1.controls[1].value = data[k];
        vcf1.controls[2].value = data[k];
        //console.log(data[k]);
      }
    }
  }
}
