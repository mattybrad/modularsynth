class VCO extends Module {
  constructor(...pins) {
    super(...pins);

    this._oscillators = {};

    var waveforms = ["square","sawtooth","triangle","sine"];
    var o, w;
    for(var i = 0; i < waveforms.length; i ++) {
      w = waveforms[i];
      o = actx.createOscillator();
      o.type = w;
      this.addSocket(w + " out", Socket.OUT, o);
      this._oscillators[w] = o;
      o.start();
    }

  }
}
