class Socket {
  constructor(pin, label, type, node) {
    this.type = type;
    this.node = node;
    this.pin = pin;
    this.connectedTo = [];
    Socket.registerSocket(this);
  }

  static registerSocket(newSocket) {
    if(Socket.getSocketFromPin(newSocket.pin)) console.log("PIN "+newSocket.pin+" ALREADY IN USE");
    else Socket._sockets.push(newSocket);
  }

  static getSocketFromPin(pin) {
    var foundSocket = Socket._sockets.find(function(s) {
      return s.pin == pin;
    })
    return foundSocket;
  }

  static testConnection(pin1, pin2) {
    var socket1 = Socket.getSocketFromPin(pin1);
    var socket2 = Socket.getSocketFromPin(pin2);
    var outSocket, inSocket;
    var valid = true;
    if(socket1.type == Socket.OUT && socket2.type == Socket.IN) {
      outSocket = socket1;
      inSocket = socket2;
    } else if(socket1.type == Socket.IN && socket2.type == Socket.OUT) {
      outSocket = socket2;
      inSocket = socket1;
    } else {
      valid = false;
    }
    var returnObject = {
      valid: valid
    }
    if(valid) {
      returnObject.out = outSocket.pin;
      returnObject.in = inSocket.pin;
      returnObject.exists = (outSocket.connectedTo.indexOf(inSocket.pin)>=0); // this is broken, i think!
    }
    return returnObject;
  }

  static makeConnection(pin1, pin2) {
    var socket1 = Socket.getSocketFromPin(pin1);
    var socket2 = Socket.getSocketFromPin(pin2);
    socket1.node.connect(socket2.node);
    console.log("MAKE",pin1,pin2);
    console.log(socket1.connectedTo);
    console.log(socket2.connectedTo);
    socket1.connectedTo.push(socket2.pin);
  }

  static breakConnection(pin1, pin2) {
    console.log("BREAK",pin1,pin2);
    var socket1 = Socket.getSocketFromPin(pin1);
    var socket2 = Socket.getSocketFromPin(pin2);
    socket1.node.disconnect(socket2.node);
    console.log(socket1.connectedTo);
    console.log(socket2.connectedTo);
    var indexToRemove = socket1.connectedTo.indexOf(pin2);
    socket1.connectedTo.splice(indexToRemove, 1);
    console.log(socket1.connectedTo);
    console.log(socket2.connectedTo);
  }

  static getConnections() {
    var connections = [];
    var s;
    for(var i = 0; i < Socket._sockets.length; i ++) {
      s = Socket._sockets[i];
      connections[s.pin] = s.connectedTo.slice();
    }
    return connections;
  }
}

Socket._sockets = [];
Socket.IN = "IN";
Socket.OUT = "OUT";
