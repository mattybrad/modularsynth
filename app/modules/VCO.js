class VCO extends Module {
  constructor(...pins) {
    super(...pins);

    var cvGain = actx.createGain();
    cvGain.gain.value = 440;

    var oscillators = {};
    var waveforms = ["sawtooth","square","triangle","sine"];
    var o, w;
    for(var i = 0; i < waveforms.length; i ++) {
      w = waveforms[i];
      o = actx.createOscillator();
      o.type = w;
      o.frequency.value = 220;
      cvGain.connect(o.frequency);
      this.addSocket(w + " out", Socket.OUT, o);
      oscillators[w] = o;
      o.start();
    }

    this.addSocket("cv in", Socket.IN, cvGain);

  }
}
