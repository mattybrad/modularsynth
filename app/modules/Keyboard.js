class Keyboard extends Module {
  constructor(...pins) {
    super(...pins);

    var gainNode = actx.createGain();
    var bufferSource = actx.createBufferSource();
    var buffer = actx.createBuffer(1, 1, actx.sampleRate);
    var bufferData = buffer.getChannelData(0);
    bufferData[0] = 1;
    bufferSource.buffer = buffer;
    bufferSource.loop = true;
    bufferSource.connect(gainNode);
    bufferSource.start();

    setInterval(function(){
      //gainNode.gain.value = Math.random();
      var noteNumber = 40 + 12 * Math.floor(Math.random() * 5) - 24;
      var targetFreq = Math.pow(2, (noteNumber - 49) / 12) * 440;
      var outputValue = (targetFreq - 220) / 440;
      console.log(outputValue);
      gainNode.gain.value = outputValue;
    }, 200);

    this.addSocket("cv out", Socket.OUT, gainNode);
  }
}
