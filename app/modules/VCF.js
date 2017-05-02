class VCF extends Module {
  constructor(...pins) {
    super(...pins);

    var filterNode = actx.createBiquadFilter();

    var cvNode = actx.createGain();
    cvNode.gain.value = 0;
    cvNode.connect(filterNode.frequency);

    //this.addSocket("cv", Socket.IN, filterNode.freq);
    this.addControl("frequency", filterNode.frequency, 20, 10000, "square");
    this.addControl("resonance", filterNode.Q, 0, 100, "square");
    this.addControl("cv", cvNode.gain, 0, 5000, "square");
    this.addSocket("cv in", Socket.IN, cvNode);
    this.addSocket("in", Socket.IN, filterNode);
    this.addSocket("out", Socket.OUT, filterNode);
  }
}
