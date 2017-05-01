class BitCrusher extends Module {
  constructor(...pins) {
    super(...pins);

    var resolution = Math.pow(2, 16);
    var sampleDivider = 1;
    var lastSample = 0;
    var nextSampleFraction = 1;

    this.crusherNode = actx.createScriptProcessor(512, 1, 1);
    this.crusherNode.onaudioprocess = function(ev) {
      var inputBuffer = ev.inputBuffer;
      var inputData = inputBuffer.getChannelData(0);
      var outputData = ev.outputBuffer.getChannelData(0);
      for(var sample = 0; sample < inputBuffer.length; sample++) {
        if(nextSampleFraction >= 1) {
          lastSample = outputData[sample] = Math.floor(inputData[sample] * resolution) / resolution;
          nextSampleFraction = nextSampleFraction % 1;
        } else {
          outputData[sample] = lastSample;
        }
        nextSampleFraction += sampleDivider;
      }
    }.bind(this);

    this.addSocket("in", Socket.IN, this.crusherNode);
    this.addSocket("out", Socket.OUT, this.crusherNode);
  }
}
