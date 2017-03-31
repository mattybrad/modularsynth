class Output extends Module {
  constructor(...pins) {
    super(...pins);

    var attenuator = actx.createGain();
    attenuator.gain.value = 0.1;
    attenuator.connect(actx.destination);

    this.addSocket("in", "IN", attenuator);
  }
}
