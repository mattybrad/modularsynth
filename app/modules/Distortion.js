class ADSR extends Module {
  constructor(moduleLabel, ...pins) {
    super(moduleLabel, ...pins);

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

    this.attack = 0.01;
    this.decay = 0.05;
    this.sustain = 0.3;
    this.release = 0.3;

    this.addSocket("gate", Socket.IN, this.gateNode);
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
