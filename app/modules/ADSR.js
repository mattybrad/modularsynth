class ADSR extends Module {
  constructor(...pins) {
    super(...pins);

    var gainNode = actx.createGain();
    gainNode.gain.value = 1;

    //this.addControl("frequency", filterNode.frequency, 20, 10000);

    this.addSocket("gate", Socket.IN, gainNode.gain);
    this.addSocket("out", Socket.OUT, gainNode.gain);
  }
}
