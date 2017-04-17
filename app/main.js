var actx = new AudioContext();

var vco1 = new VCO(1,3,4,2,6);
//var vca1 = new VCA(40,50,60);
//var vcf = new VCF(6,9);
//var keyboard = new Keyboard(55,15);
var out = new Output(5);

function updateConnections(data) {
  var i,j;
  var connectionsToBreak = Socket.getConnections();

  var splitData = data; // ...because the source format has changed - tidy this up later
  var allValid = true;
  var c, res;
  for(i = 0; i < splitData.length; i ++) {
    c = splitData[i].split("-");
    if(c.length == 2) {
      c[0] = parseInt(c[0]);
      c[1] = parseInt(c[1]);
      console.log(c);
      res = Socket.testConnection(c[0],c[1]);
      console.log(res);
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
    if(connectionsToBreak[i]) {
      for(j = 0; j < connectionsToBreak[i].length; j++) {
        Socket.breakConnection(i, connectionsToBreak[i][j]);
      }
    }
  }

  console.log(allValid?"all connections ok":"check connections");
}

function updateControls(data) {
  for(var k in data) {
    if(data.hasOwnProperty(k)) {
      console.log(data[k]);
      //vcf.controls[0].value = data[k];
    }
  }
}

function getConnections(callback) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
      if (xmlhttp.status == 200) {
        console.log(xmlhttp.responseText);
        callback(JSON.parse(xmlhttp.responseText));
      } else {
        console.log('ajax error');
      }
    }
  }

  xmlhttp.open("GET", "http://localhost:3000/data", true);
  xmlhttp.send();
}

var useArduino = true;

if(useArduino) {
  setInterval(function(){
    getConnections(function(data){
      updateConnections(data.connections);
      //updateControls(data.controls);
    });
  }, 10);
} else {
  updateConnections(["2-5"]);
}
