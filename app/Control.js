class Control {
  constructor(label, param, min, max, curve) {
    this._param = param;
    this._min = min;
    this._max = max;
    this._range = max - min;
    this._curve = curve;
    this.setYet = false;
    this.value = 0.5;
    this.setYet = false;
  }

  set value(value) {
    value = Math.max(0, Math.min(1, value));
    if(this._curve == "square") value = value * value;
    var now = actx.currentTime;
    var adjustedValue = this._min + value * this._range;
    this._param.cancelScheduledValues(now);
    if(this.setYet) {
      this._param.setValueAtTime(this._param.value, now);
      this._param.linearRampToValueAtTime(adjustedValue, now + 0.2);
    } else {
      this._param.setValueAtTime(adjustedValue, now);
      this.setYet = true;
    }
  }
}
