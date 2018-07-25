class Keyboard extends Module {
  constructor(moduleLabel, ...pins) {
    super(moduleLabel, ...pins);

    var cvNode = actx.createGain();
    this.cvNode = cvNode;
    var gateNode = actx.createGain();
    gateNode.gain.value = 0;

    var bufferSource = actx.createBufferSource();
    var buffer = actx.createBuffer(1, 1, actx.sampleRate);
    var bufferData = buffer.getChannelData(0);
    bufferData[0] = 1;
    bufferSource.buffer = buffer;
    bufferSource.loop = true;
    bufferSource.connect(cvNode);
    bufferSource.connect(gateNode);
    bufferSource.start();

    this.addSocket("cv out", Socket.OUT, cvNode);
    this.addSocket("gate out", Socket.OUT, gateNode);

    var keyOrder = "\\azxdcfvbhnjmk,.";
    var keysDown = [];

    document.addEventListener("keydown", function(ev){
      var keyIndex = keyOrder.indexOf(ev.key);
      if(keyIndex >= 0) {
        gateNode.gain.value = 1;
        var noteNumber = keyIndex + 1 * 12;
        var outputValue = noteNumber / 12 / 5;
        cvNode.gain.value = outputValue;
        if(keysDown.indexOf(keyIndex)==-1) {
          keysDown.push(keyIndex);
          addHackerConsoleLog("played the '" + ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#','A','A#','B','C','C#','D','D#','E','F','F#','G','G#'][keyIndex] + "' key", "#FF0");
        }
      }
    })

    document.addEventListener("keyup", function(ev){
      var keyIndex = keyOrder.indexOf(ev.key);
      var keyDownIndex = keysDown.indexOf(keyIndex);
      if(keyIndex>=0 && keyDownIndex>=0) {
        keysDown.splice(keyDownIndex, 1);
      }
      if(keysDown.length == 0) gateNode.gain.value = 0;
    })
  }

  set note(value) {
    //this.cvNode.gain.value = outputValue;
  }
}
