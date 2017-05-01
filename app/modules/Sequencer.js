class Sequencer extends Module {
  constructor(...pins) {
    super(...pins);

    this.steps = [2, 2+2/12, 2+4/12, 2+2/12];
    this.currentStep = 0;

    this.cvNode = actx.createConstantSource();
    this.cvNode.start();

    this.gateNode = actx.createConstantSource();
    this.gateNode.start();

    // temporary, not accurate
    setInterval(this.doStep.bind(this), 200);

    this.addSocket("cv out", Socket.OUT, this.cvNode);
    this.addSocket("gate out", Socket.OUT, this.gateNode);

  }

  doStep() {
    var now = actx.currentTime;
    this.cvNode.offset.setValueAtTime(this.steps[this.currentStep], now);
    this.gateNode.offset.setValueAtTime(1, now);
    this.gateNode.offset.setValueAtTime(0, now + 0.1); // temp
    this.currentStep ++;
    this.currentStep = this.currentStep % this.steps.length;
  }
}
