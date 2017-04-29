class LFO extends Module {
  constructor(...pins) {
    super(...pins);

    var oscillators = {};
    var waveforms = ["square","sine"];
    var o, w;
    for(var i = 0; i < waveforms.length; i ++) {
      w = waveforms[i];
      o = actx.createOscillator();
      o.type = w;
      o.frequency.value = 10;
      this.addSocket(w + " out", Socket.OUT, o);
      oscillators[w] = o;
      o.start();
    }

    this.addControl("frequency", oscillators.sine.frequency, 0.01, 10);

  }
}
