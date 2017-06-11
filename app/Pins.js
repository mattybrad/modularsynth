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
const VCO2_SINE = fakePin();
const VCO2_CV1 = 60;
const VCO2_CV2 = 62;

const NOISE_OUT = fakePin();

const SH_TRIGGER = fakePin();
const SH_IN = fakePin();
const SH_OUT = fakePin();

const CRUSHER_IN = fakePin();
const CRUSHER_OUT = fakePin();

const VCF1_CV = fakePin();
const VCF1_IN = fakePin();
const VCF1_OUT = fakePin();

const DELAY_IN = fakePin();
const DELAY_OUT = fakePin();

const QUANTIZER_IN = fakePin();
const QUANTIZER_OUT = fakePin();

const LFO1_CV = fakePin();
const LFO1_SQUARE = fakePin();
const LFO1_SINE = fakePin();

const LFO2_CV = fakePin();
const LFO2_IN = fakePin();
const LFO2_OUT = fakePin();

const SEQUENCER_CV = fakePin();
const SEQUENCER_GATE = fakePin();

const VCA1_CV1 = fakePin();
const VCA1_CV2 = fakePin();
const VCA1_IN = fakePin();
const VCA1_OUT = fakePin();

const ADSR1_GATE = fakePin();
const ADSR1_OUT = fakePin();

const MIDI_CV = fakePin();
const MIDI_GATE = fakePin();

const OUTPUT_IN = 2;
