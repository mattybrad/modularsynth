class VCF extends Module {
  constructor(...pins) {
    super(...pins);

    var filterNode = actx.createBiquadFilter();
    filterNode.frequency.value = 500;
    filterNode.Q.value = 15;

    //this.addSocket("cv", Socket.IN, filterNode.freq);
    this.addControl("frequency", filterNode.frequency, 20, 10000);
    // this.addControl("resonance", filterNode.Q);
    this.addSocket("in", Socket.IN, filterNode);
    this.addSocket("out", Socket.OUT, filterNode);
  }
}
