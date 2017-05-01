class Control {
  constructor(label, param, min, max) {
    this._param = param;
    this._min = min;
    this._max = max;
    this._range = max - min;
  }

  set value(value) {
    value = Math.max(0, Math.min(1, value));
    var now = actx.currentTime;
    var adjustedValue = this._min + value * this._range;
    this._param.cancelScheduledValues(now);
    this._param.setValueAtTime(this._param.value, now);
    this._param.linearRampToValueAtTime(adjustedValue, now + 0.2);
  }
}
