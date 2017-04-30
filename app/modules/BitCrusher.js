class BitCrusher extends Module {
  constructor(...pins) {
    super(...pins);

    this.crusherNode = actx.createScriptProcessor(4096, 1, 1);
    this.crusherNode.onaudioprocess = function(ev) {
      var inputBuffer = ev.inputBuffer;
      var inputData = inputBuffer.getChannelData(0);
      var outputData = ev.outputBuffer.getChannelData(0);
      for(var sample = 0; sample < inputBuffer.length; sample++) {
        outputData[sample] = Math.floor(inputData[sample] * 2) / 2;
      }
    }.bind(this);

    this.addSocket("in", Socket.IN, this.crusherNode);
    this.addSocket("out", Socket.OUT, this.crusherNode);
  }
}
