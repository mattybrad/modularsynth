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

  set frequency(freq) {
    for(var k in this._oscillators) {
      if(!this._oscillators.hasOwnProperty(k)) continue;
      this._oscillators[k].frequency.value = freq;
    }
  }
}
