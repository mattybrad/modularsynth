class Control {
  constructor(label, param, min, max) {
    this._param = param;
    this._min = min;
    this._max = max;
    this._range = max - min;
  }

  set value(value) {
    value = Math.max(0, Math.min(1, value));
    this._param.value = this._min + value * this._range;
  }
}
