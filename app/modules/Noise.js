class Noise extends Module {
  constructor(moduleLabel, ...pins) {
    super(moduleLabel, ...pins);

    var bufferSize = 2 * actx.sampleRate;
    var bufferSource = actx.createBufferSource();
    var buffer = actx.createBuffer(1, bufferSize, actx.sampleRate);
    var bufferData = buffer.getChannelData(0);
    for(var i = 0; i < bufferSize; i ++) {
      bufferData[i] = 1 - 2 * Math.random();
    }
    bufferSource.buffer = buffer;
    bufferSource.loop = true;
    bufferSource.start();

    this.addSocket("white", Socket.OUT, bufferSource);
  }
}
