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
var lfo2 = new LFO(
  LFO2_CV,
  LFO2_SQUARE,
  LFO2_SINE
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
var adsr1 = new ADSR(
  ADSR1_GATE,
  ADSR1_OUT
);
var mixer1 = new Mixer(
  MIXER1_IN1,
  MIXER1_IN2,
  MIXER1_IN3,
  MIXER1_OUT
);
var keyboard = new Keyboard(
  MIDI_CV,
  MIDI_GATE
);
var out = new Output(OUTPUT_IN);

for(var i = 0; i < Module.allModules.length; i ++) {
  //GUI.gui.addModule(Module.allModules[i]);
}
//GUI.gui.draw();

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
    // data.connections.push([VCO1_SQUARE, CRUSHER_IN].join("-"));
    // data.connections.push([VCO2_SAW, CRUSHER_IN].join("-"));
    // data.connections.push([CRUSHER_OUT, OUTPUT_IN].join("-"));

    updateConnections(data.connections);
    //console.log(data.connections);
    updateControls(data.controls);
    // keyboard.note = data.note;
  };
} else {
  var data = {
    connections: []
  }
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
        document.getElementById('hackerConsole').innerHTML += res.out + " connected to " + res.in + "<br/>";
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
        document.getElementById('hackerConsole').innerHTML += i + " disconnected from " + connectionsToBreak[i][j] + "<br/>";
      }
    }
  }
}

function updateControls(data) {
  var d;
  for(var k in data) {
    if(data.hasOwnProperty(k)) {
      d = 1-data[k]; // because i wired everything backwards...
      switch(parseInt(k)) {
        case VCO1_RANGE:
        vco1.controls[0].value = d;
        break;
        case VCO1_TUNING:
        vco1.controls[1].value = d;
        break;
        case VCO1_CV2_ATTEN:
        vco1.controls[2].value = d;
        break;
        case VCO2_RANGE:
        vco2.controls[0].value = d;
        break;
        case VCO2_TUNING:
        vco2.controls[1].value = d;
        break;
        case VCO2_CV2_ATTEN:
        vco2.controls[2].value = d;
        break;
        case NOISE_COLOUR:
        //noise.controls[0].value = d;
        break;
        case CRUSHER_RATE:
        bitCrusher.rateControl = d;
        break;
        case CRUSHER_RESOLUTION:
        bitCrusher.resolutionControl = d;
        break;
        case VCF1_CUTOFF:
        vcf1.controls[0].value = d;
        break;
        case VCF1_RESONANCE:
        vcf1.controls[1].value = d;
        break;
        case VCF1_CV_ATTEN:
        vcf1.controls[2].value = d;
        break;
        case LFO1_FREQUENCY:
        lfo1.controls[0].value = d;
        break;
        case LFO2_FREQUENCY:
        lfo2.controls[0].value = d;
        break;
        case ADSR1_ATTACK:
        adsr1.attack = 2 * d;
        break;
        case ADSR1_DECAY:
        adsr1.decay = 2 * d;
        break;
        case ADSR1_SUSTAIN:
        adsr1.sustain = d;
        break;
        case ADSR1_RELEASE:
        adsr1.release = 10 * d * d;
        break;
        case MIXER1_IN1_ATTEN:
        mixer1.controls[0].value = d;
        break;
        case MIXER1_IN2_ATTEN:
        mixer1.controls[1].value = d;
        break;
        case MIXER1_IN3_ATTEN:
        mixer1.controls[2].value = d;
        break;
        case VCA1_GAIN:
        //vca1.controls[0].value = d;
        break;
        case DELAY_DELAY:
        delay.controls[0].value = d;
        break;
        case DELAY_FEEDBACK:
        delay.controls[1].value = d;
        break;
      }
    }
  }
}
