class Sequencer extends Module {
  constructor(...pins) {
    super(...pins);

    this.steps = [2, 3, 2.5, 2.25];
    this.currentStep = 0;

    this.cvNode = actx.createConstantSource();
    this.cvNode.start();

    this.gateNode = actx.createConstantSource();
    this.gateNode.start();

    // temporary, not accurate
    setInterval(this.doStep.bind(this), 500);

    this.addSocket("cv out", Socket.OUT, this.cvNode);
    this.addSocket("gate out", Socket.OUT, this.gateNode);

  }

  doStep() {
    var now = actx.currentTime;
    this.cvNode.offset.setValueAtTime(this.steps[this.currentStep], now);
    this.gateNode.offset.setValueAtTime(1, now);
    this.gateNode.offset.setValueAtTime(0, now + 0.4); // temp
    this.currentStep ++;
    this.currentStep = this.currentStep % this.steps.length;
  }
}
