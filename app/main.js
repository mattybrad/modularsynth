var actx = new AudioContext();

var vco1 = new VCO(0,1,2,3);
var out = new Output(4);

Socket.makeConnection(0,4);
