class Mixer extends Module {
  constructor(moduleLabel, ...pins) {
    super(moduleLabel, ...pins);

    var gainNode1 = actx.createGain();
    gainNode1.gain.value = 0;

    var gainNode2 = actx.createGain();
    gainNode2.gain.value = 0;

    var gainNode3 = actx.createGain();
    gainNode3.gain.value = 0;

    var outputNode = actx.createGain();
    gainNode1.connect(outputNode);
    gainNode2.connect(outputNode);
    gainNode3.connect(outputNode);

    this.addSocket("in1", Socket.IN, gainNode1);
    this.addSocket("in2", Socket.IN, gainNode2);
    this.addSocket("in3", Socket.IN, gainNode3);
    this.addSocket("out", Socket.OUT, outputNode);

    this.addControl("gain1", gainNode1.gain, 0, 1);
    this.addControl("gain2", gainNode2.gain, 0, 1);
    this.addControl("gain3", gainNode3.gain, 0, 1);
  }
}
