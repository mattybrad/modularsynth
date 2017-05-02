class LFO extends Module {
  constructor(...pins) {
    super(...pins);

    var frequencyNode = actx.createConstantSource();
    frequencyNode.start();

    var cvNode = actx.createGain();
    cvNode.connect(frequencyNode.offset);

    this.addSocket("cv in", Socket.IN, cvNode);

    var oscillators = {};
    var waveforms = ["square","sine"];
    var o, w;
    for(var i = 0; i < waveforms.length; i ++) {
      w = waveforms[i];
      o = actx.createOscillator();
      frequencyNode.connect(o.frequency);
      o.type = w;
      o.frequency.value = 0;
      this.addSocket(w + " out", Socket.OUT, o);
      oscillators[w] = o;
      o.start();
    }

    this.addControl("frequency", frequencyNode.offset, 0.01, 20, "square");
    this.addControl("cv", cvNode.gain, 0, 20, "square");

  }
}
