class Socket {
  constructor(pin, label, type, node) {
    this.type = type;
    this.node = node;
    this.pin = pin;
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

  static makeConnection(pin1, pin2) {
    var socket1 = Socket.getSocketFromPin(pin1);
    var socket2 = Socket.getSocketFromPin(pin2);
    if(socket1.type == Socket.OUT && socket2.type == Socket.IN) {
      socket1.node.connect(socket2.node);
    } else if(socket1.type == Socket.IN && socket2.type == Socket.OUT) {
      socket2.node.connect(socket1.node);
    }
  }
}

Socket._sockets = [];
Socket.IN = "IN";
Socket.OUT = "OUT";
