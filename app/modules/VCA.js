class VCA extends Module {
  constructor(...pins) {
    super(...pins);

    var gainNode = actx.createGain();
    gainNode.gain.value = 0;

    /*
        this sucks, but i'm having to add a bit of latency to compensate for
        the VCO, which is slow to calculate frequency from CV
    */
    var delayNode = actx.createDelay(1);
    delayNode.delayTime.value = 512 / actx.sampleRate;
    delayNode.connect(gainNode.gain);

    this.addSocket("cv1", Socket.IN, delayNode);
    this.addSocket("cv2", Socket.IN, delayNode);
    this.addSocket("in", Socket.IN, gainNode);
    this.addSocket("out", Socket.OUT, gainNode);

    //this.addControl("gain", gainNode.gain, 0, 1);
  }
}
