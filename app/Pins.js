// PINS

var _fakePin = 100;
function fakePin() {
  _fakePin ++;
  return _fakePin;
}

const VCO1_SAW = 59;
const VCO1_SQUARE = 56;
const VCO1_TRIANGLE = 57;
const VCO1_SINE = 58;
const VCO1_CV1 = 63;
const VCO1_CV2 = 61;

const VCO2_SAW = 53;
const VCO2_SQUARE = 55;
const VCO2_TRIANGLE = 54;
const VCO2_SINE = 50;
const VCO2_CV1 = 60;
const VCO2_CV2 = 62;

const NOISE_OUT = 52;

const SH_TRIGGER = 49;
const SH_IN = 51;
const SH_OUT = 48;

const CRUSHER_IN = 45;
const CRUSHER_OUT = 47;

const VCF1_CV = 46;
const VCF1_IN = 44;
const VCF1_OUT = 43;

const DELAY_IN = 11;
const DELAY_OUT = 8;

const QUANTIZER_IN = 25;
const QUANTIZER_OUT = 26;

const LFO1_CV = 30;
const LFO1_SQUARE = 31;
const LFO1_SINE = 29;

const LFO2_CV = 28;
const LFO2_SQUARE = 19;
const LFO2_SINE = 16;

const SEQUENCER_CV = fakePin();
const SEQUENCER_GATE = fakePin();

const VCA1_CV1 = 3;
const VCA1_CV2 = 2;
const VCA1_IN = 0;
const VCA1_OUT = 1;

const ADSR1_GATE = 13;
const ADSR1_OUT = 15;

const ADSR2_GATE = 14;
const ADSR2_OUT = 12;

const MIXER1_IN1 = 21;
const MIXER1_IN2 = 23;
const MIXER1_IN3 = 17;
const MIXER1_OUT = 18;

const MIDI_CV = 27;
const MIDI_GATE = 24;

const OUTPUT_IN = 4;
