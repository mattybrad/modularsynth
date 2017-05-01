class Module {
  constructor(...pins) {
    this._pins = pins;
    this.sockets = [];
    this.controls = [];
  }

  addSocket(label, type, node) {
    this.sockets.push(
      new Socket(this._pins[this.sockets.length], label, type, node)
    )
  }

  addControl(label, param, min, max, curve) {
    this.controls.push(
      new Control(label, param, min, max, curve)
    )
  }
}
