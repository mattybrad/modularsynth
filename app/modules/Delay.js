class Delay extends Module {
  constructor(...pins) {
    super(...pins);

    this.delayNode = actx.createDelay(5);
    this.delayNode.delayTime.value = 2;
    console.log(this.delayNode);

    this.addSocket("in", Socket.IN, this.delayNode);
    this.addSocket("out", Socket.OUT, this.delayNode);
  }
}
