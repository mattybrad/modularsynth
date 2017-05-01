class Quantizer extends Module {
  constructor(...pins) {
    super(...pins);

    var quantizerNode = actx.createScriptProcessor(512, 1, 1);
    var quantizeValue = 3; // 12 notes per octave

    quantizerNode.onaudioprocess = function(ev) {
      var inputBuffer = ev.inputBuffer;
      var inputData = inputBuffer.getChannelData(0);
      var outputData = ev.outputBuffer.getChannelData(0);
      for(var sample = 0; sample < inputBuffer.length; sample++) {
        outputData[sample] = Math.round(inputData[sample] * quantizeValue) / quantizeValue;
      }
    }.bind(this);

    this.addSocket("cv in", Socket.IN, quantizerNode);
    this.addSocket("cv out", Socket.OUT, quantizerNode);

  }

}
