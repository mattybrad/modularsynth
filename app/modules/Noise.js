class Noise extends Module {
  constructor(...pins) {
    super(...pins);

    var bufferSize = 2 * actx.sampleRate;
    var bufferSource = actx.createBufferSource();
    var buffer = actx.createBuffer(1, bufferSize, actx.sampleRate);
    var bufferData = buffer.getChannelData(0);
    for(var i = 0; i < bufferSize; i ++) {
      bufferData[i] = Math.random();
    }
    bufferSource.buffer = buffer;
    bufferSource.loop = true;
    bufferSource.start();

    this.addSocket("white", Socket.OUT, bufferSource);
  }
}
