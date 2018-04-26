class Delay extends Module {
  constructor(moduleLabel, ...pins) {
    super(moduleLabel, ...pins);

    this.inputNode = actx.createGain();
    this.outputNode = actx.createGain();

    this.feedbackNode = actx.createGain();
    this.feedbackNode.gain.value = 0.9;

    this.delayNode = actx.createDelay(5);
    this.inputNode.connect(this.delayNode);
    this.delayNode.connect(this.feedbackNode);
    this.feedbackNode.connect(this.delayNode);
    this.delayNode.connect(this.outputNode);
    this.inputNode.connect(this.outputNode)
    this.delayNode.delayTime.value = 0.3;
    console.log(this.delayNode);

    this.addSocket("in", Socket.IN, this.inputNode);
    this.addSocket("out", Socket.OUT, this.outputNode);

    this.addControl("delay", this.delayNode.delayTime, 0.01, 5, "square");
    this.addControl("feedback", this.feedbackNode.gain, 0, 1);
  }
}
