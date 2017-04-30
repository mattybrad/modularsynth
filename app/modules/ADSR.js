class ADSR extends Module {
  constructor(...pins) {
    super(...pins);

    this.gateOpen = false;

    this.gainNode = actx.createGain();
    this.gainNode.gain.value = 0;

    // constant "voltage" source (replace with reusable/shareable source soon)
    var bufferSource = actx.createBufferSource();
    var buffer = actx.createBuffer(1, 1, actx.sampleRate);
    var bufferData = buffer.getChannelData(0);
    bufferData[0] = 1;
    bufferSource.buffer = buffer;
    bufferSource.loop = true;
    bufferSource.connect(this.gainNode);
    bufferSource.start();

    // gate node, detects change in input and triggers stuff
    this.gateNode = actx.createScriptProcessor(256, 1, 1);
    this.gateNode.onaudioprocess = function(ev) {
      var inputBuffer = ev.inputBuffer;
      var inputSample = inputBuffer.getChannelData(0)[0];
      if(inputSample > 0.5) {
        if(!this.gateOpen) {
          this.triggerStart();
          this.gateOpen = true;
        }
      } else {
        if(this.gateOpen) {
          this.triggerEnd();
          this.gateOpen = false;
        }
      }
    }.bind(this);

    // hack! for now, create a gain node so i've got something to connect the script processor to
    this.dummyNode = actx.createGain();
    this.dummyNode.gain.value = 0;
    this.dummyNode.connect(actx.destination);
    this.gateNode.connect(this.dummyNode);

    this.attack = 0.5;
    this.decay = 0.0;
    this.sustain = 1;
    this.release = 2;

    this.addSocket("gate", Socket.IN, this.gateNode);
    this.addSocket("out", Socket.OUT, this.gainNode);
  }

  triggerStart() {
    var now = actx.currentTime;
    this.gainNode.gain.cancelScheduledValues(now);
    this.gainNode.gain.setValueAtTime(Math.max(this.gainNode.gain.value, ADSR.ALMOST_ZERO), now);
    this.gainNode.gain.exponentialRampToValueAtTime(1, now + this.attack);
    this.gainNode.gain.exponentialRampToValueAtTime(Math.max(this.sustain, ADSR.ALMOST_ZERO), now + this.attack + this.decay);
  }

  triggerEnd() {
    var now = actx.currentTime;
    this.gainNode.gain.cancelScheduledValues(now);
    this.gainNode.gain.setValueAtTime(Math.max(this.gainNode.gain.value, ADSR.ALMOST_ZERO), now);
    this.gainNode.gain.exponentialRampToValueAtTime(ADSR.ALMOST_ZERO, now + this.release);
    this.gainNode.gain.setValueAtTime(0, now + this.release);
  }
}

ADSR.ALMOST_ZERO = 0.000001;
