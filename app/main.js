var actx = new AudioContext();

var vco1 = new VCO(0,1,2,3);
var out = new Output(4);

function updateConnections(data) {
  var i,j;
  var previousConnections = Socket.getConnections();
  var connectionsToAdd = [];

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
    }
  }
  console.log(allValid?"all connections ok":"check connections");
}

updateConnections("0-4");
