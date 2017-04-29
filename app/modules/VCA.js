class VCA extends Module {
  constructor(...pins) {
    super(...pins);

    var gainNode = actx.createGain();
    gainNode.gain.value = 0;

    var gainNode2 = actx.createGain();
    gainNode2.gain.value = 0;

    var gainNode3 = actx.createGain();
    gainNode3.gain.value = 0;

    this.addSocket("cv1", Socket.IN, gainNode.gain);
    this.addSocket("cv2", Socket.IN, gainNode3);
    this.addSocket("in", Socket.IN, gainNode);
    this.addSocket("out", Socket.OUT, gainNode);

    //this.addControl("gain", gainNode.gain, 0, 1);
  }
}
