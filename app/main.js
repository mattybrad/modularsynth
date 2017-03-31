var actx = new AudioContext();

var vco1 = new VCO(0,1,2,3);
var vca1 = new VCA(4,5,6);
var lfo1 = new VCO(8,9,10,11);
var out = new Output(7);

vco1.frequency = 110;
lfo1.frequency = 1;

function updateConnections(data) {
  var i,j;
  var connectionsToBreak = Socket.getConnections();

  var splitData = data.split(",");
  var allValid = true;
  var c, res;
  for(i = 0; i < splitData.length; i ++) {
    c = splitData[i].split("-");
    if(c.length == 2) {
      c[0] = parseInt(c[0]);
      c[1] = parseInt(c[1]);
      console.log(c);
      res = Socket.testConnection(c[0],c[1]);
      if(!res.valid) allValid = false;
      else if(!res.exists) Socket.makeConnection(c[0], c[1]);
      else {
        // if connection already existed and still exists, remove it from connectionsToBreak
        var connectionIndex = connectionsToBreak[res.out].indexOf(res.in);
        if(connectionIndex >= 0) {
          connectionsToBreak[res.out].splice(connectionIndex, 1);
        }
      }
    }
  }

  for(i = 0; i < connectionsToBreak.length; i ++) {
    for(j = 0; j < connectionsToBreak[i].length; j++) {
      Socket.breakConnection(i, connectionsToBreak[i][j]);
    }
  }

  console.log(allValid?"all connections ok":"check connections");
}

updateConnections("0-5,10-4,6-7");
