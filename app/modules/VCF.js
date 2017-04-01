class VCF extends Module {
  constructor(...pins) {
    super(...pins);

    var filterNode = actx.createBiquadFilter();
    filterNode.frequency.value = 50 + 500 * Math.random();
    filterNode.Q.value = 10;

    //this.addSocket("cv", Socket.IN, filterNode.freq);
    // this.addControl("frequency", filterNode.frequency);
    // this.addControl("resonance", filterNode.Q);
    this.addSocket("in", Socket.IN, filterNode);
    this.addSocket("out", Socket.OUT, filterNode);
  }
}
