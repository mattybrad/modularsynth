class VCA extends Module {
  constructor(...pins) {
    super(...pins);

    var gainNode = actx.createGain();
    gainNode.gain.value = 0;

    this.addSocket("cv", Socket.IN, gainNode.gain);
    this.addSocket("in", Socket.IN, gainNode);
    this.addSocket("out", Socket.OUT, gainNode);
  }
}
