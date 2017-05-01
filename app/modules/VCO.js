/*
    A couple of notes on how "CV" works with this oscillator:
    In "real" modular synths, a control voltage determines an oscillator's pitch.
    This voltage could be anywhere from, say, -5V to +5V.
    The pitch changes with a range of 1V per octave.
    A good(?) analogous system here is to go from -1.0 to +1.0 "volts"
    I have chosen this because Web Audio buffers have this range.
    So, the somewhat arbitrary scheme is 0.2 "volts" per octave, for now.

*/

class VCO extends Module {
  constructor(...pins) {
    super(...pins);

    var cvAdjustmentNode = actx.createScriptProcessor(512, 1, 1);
    cvAdjustmentNode.onaudioprocess = function(ev) {
      var inputBuffer = ev.inputBuffer;
      var inputData = inputBuffer.getChannelData(0);
      var outputData = ev.outputBuffer.getChannelData(0);
      for(var sample = 0; sample < inputBuffer.length; sample++) {
        outputData[sample] = 55 * Math.pow(2, inputData[sample]);
      }
    }.bind(this);

    var tuningNode = actx.createConstantSource();
    tuningNode.offset.value = 0;
    tuningNode.start();
    tuningNode.connect(cvAdjustmentNode);

    var rangeNode = actx.createConstantSource();
    rangeNode.offset.value = 0;
    rangeNode.start();
    rangeNode.connect(cvAdjustmentNode);

    var cv2Gain = actx.createGain();
    cv2Gain.connect(cvAdjustmentNode);

    var waveforms = ["sawtooth","triangle","sine","square"];
    this.oscillators = {};
    var o, w;
    for(var i = 0; i < waveforms.length; i ++) {
      w = waveforms[i];
      o = actx.createOscillator();
      o.type = w;
      o.frequency.value = 0;
      cvAdjustmentNode.connect(o.frequency);
      this.addSocket(w + " out", Socket.OUT, o);
      this.oscillators[w] = o;
      o.start();
    }

    this.addSocket("cv1 in", Socket.IN, cvAdjustmentNode);
    this.addSocket("cv2 in", Socket.IN, cv2Gain);

    this.addControl("range", rangeNode.offset, -3, 3);
    this.addControl("tuning", tuningNode.offset, -0.2, 0.2);
    this.addControl("cv2 gain", cv2Gain.gain, 0, 1);

  }
}
