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
      gainNode.gain.value = 300 + 100 * Math.random();
    }, 200);

    this.addSocket("cv out", Socket.OUT, gainNode);
  }
}
