// PINS

var _fakePin = 100;
function fakePin() {
  _fakePin ++;
  return _fakePin;
}

const VCO1_SAW = 1;
const VCO1_SQUARE = 0;
const VCO1_TRIANGLE = fakePin();
const VCO1_SINE = fakePin();
const VCO1_CV1 = fakePin();
const VCO1_CV2 = fakePin();

const VCO2_SAW = fakePin();
const VCO2_SQUARE = fakePin();
const VCO2_TRIANGLE = fakePin();
const VCO2_SINE = fakePin();
const VCO2_CV1 = fakePin();
const VCO2_CV2 = fakePin();

const NOISE_OUT = fakePin();

const SH_TRIGGER = fakePin();
const SH_IN = fakePin();
const SH_OUT = fakePin();

const CRUSHER_IN = fakePin();
const CRUSHER_OUT = fakePin();

const VCF1_CV = fakePin();
const VCF1_IN = 33;
const VCF1_OUT = 34;

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

const OUTPUT_IN = 32;
