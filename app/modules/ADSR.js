class ADSR extends Module {
  constructor(...pins) {
    super(...pins);

    this.gateOpen = false;

    this.constantNode = actx.createConstantSource();
    this.constantNode.offset.value = 0;
    this.constantNode.start();

    // gate node, detects change in input and triggers stuff
    this.gateNode = actx.createScriptProcessor(512, 1, 1);
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

    this.gateNode.connect(this.constantNode.offset);

    this.attack = 0;
    this.decay = 0.1;
    this.sustain = 0.8;
    this.release = 4.0;

    this.addSocket("gate", Socket.IN, this.gateNode);
    this.addSocket("out", Socket.OUT, this.constantNode);
  }

  triggerStart() {
    console.log("START");
    var now = actx.currentTime;
    this.constantNode.offset.cancelScheduledValues(now);
    this.constantNode.offset.setValueAtTime(Math.max(this.constantNode.offset.value, ADSR.ALMOST_ZERO), now);
    this.constantNode.offset.exponentialRampToValueAtTime(1, now + this.attack);
    this.constantNode.offset.exponentialRampToValueAtTime(Math.max(this.sustain, ADSR.ALMOST_ZERO), now + this.attack + this.decay);
  }

  triggerEnd() {
    console.log("END");
    var now = actx.currentTime;
    this.constantNode.offset.cancelScheduledValues(now);
    this.constantNode.offset.setValueAtTime(Math.max(this.constantNode.offset.value, ADSR.ALMOST_ZERO), now);
    this.constantNode.offset.exponentialRampToValueAtTime(ADSR.ALMOST_ZERO, now + this.release);
    this.constantNode.offset.setValueAtTime(0, now + this.release);
  }
}

ADSR.ALMOST_ZERO = 0.000001;
