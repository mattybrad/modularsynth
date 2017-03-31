class VCA extends Module {
  constructor(...pins) {
    super(...pins);

    this._gainNode = actx.createGain();

    this.addSocket("cv", Socket.IN, this._gainNode.gain);
    this.addSocket("in", Socket.IN, this._gainNode);
    this.addSocket("out", Socket.OUT, this._gainNode);
  }
}
