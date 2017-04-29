class ADSR extends Module {
  constructor(...pins) {
    super(...pins);

    this.gainNode = actx.createGain();
    this.gainNode.gain.value = 0;

    // constant "voltage" source
    var bufferSource = actx.createBufferSource();
    var buffer = actx.createBuffer(1, 1, actx.sampleRate);
    var bufferData = buffer.getChannelData(0);
    bufferData[0] = 1;
    bufferSource.buffer = buffer;
    bufferSource.loop = true;
    bufferSource.connect(this.gainNode);
    bufferSource.start();

    this.attack = 0.5;
    this.decay = 0.1;
    this.sustain = 0.2;
    this.release = 1.0;

    this.addSocket("gate", Socket.IN, this.gainNode); // doesn't do anything just yet
    this.addSocket("out", Socket.OUT, this.gainNode);
  }

  triggerStart() {
    var now = actx.currentTime;
    this.gainNode.gain.cancelScheduledValues(now);
    this.gainNode.gain.setValueAtTime(0, now);
    this.gainNode.gain.linearRampToValueAtTime(1, now + this.attack);
    this.gainNode.gain.linearRampToValueAtTime(this.sustain, now + this.attack + this.decay);
  }

  triggerEnd() {
    var now = actx.currentTime;
    this.gainNode.gain.cancelScheduledValues(now);
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
    this.gainNode.gain.linearRampToValueAtTime(0, now + this.release);
  }
}
