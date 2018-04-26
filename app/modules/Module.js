class Module {
  constructor(moduleLabel, ...pins) {
    this._pins = pins;
    console.log(moduleLabel, pins);
    this.sockets = [];
    this.controls = [];
    this.moduleLabel = moduleLabel;
    Module.allModules.push(this);
  }

  addSocket(label, type, node) {
    this.sockets.push(
      new Socket(this._pins[this.sockets.length], this.moduleLabel + " " + label, type, node)
    )
  }

  addControl(label, param, min, max, curve) {
    this.controls.push(
      new Control(label, param, min, max, curve)
    )
  }
}

Module.allModules = [];
