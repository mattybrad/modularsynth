class SampleAndHold extends Module {
  constructor(...pins) {
    super(...pins);

    this.sampleNextUpdate = false;
    this.gateOpen = false;
    this.currentSample = 0;

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
          this.sampleNextUpdate = true;
          this.gateOpen = true;
        }
      } else {
        if(this.gateOpen) {
          this.gateOpen = false;
        }
      }
    }.bind(this);

    // sampling node
    this.samplingNode = actx.createScriptProcessor(256, 1, 1);
    this.samplingNode.onaudioprocess = function(ev) {
      var inputBuffer = ev.inputBuffer;
      var inputSample = inputBuffer.getChannelData(0)[0];
      if(this.sampleNextUpdate) {
        this.gainNode.gain.value = inputSample;
        this.sampleNextUpdate = false;
      }
    }.bind(this);

    // hack! for now, create a gain node so i've got something to connect the script processor to
    this.dummyNode = actx.createGain();
    this.dummyNode.gain.value = 0;
    this.dummyNode.connect(actx.destination);
    this.gateNode.connect(this.dummyNode);
    this.samplingNode.connect(this.dummyNode);

    this.addSocket("trigger", Socket.IN, this.gateNode);
    this.addSocket("in", Socket.IN, this.samplingNode);
    this.addSocket("out", Socket.OUT, this.gainNode);
  }
}
