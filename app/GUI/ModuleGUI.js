class ModuleGUI {
  constructor(ctx, module, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.module = module;
    this.sockets = [];
    for(var i = 0; i < this.module.sockets.length; i ++) {
      this.sockets[i] = new SocketGUI(ctx, this.module.sockets[i].label, x, 50 + y + 20 * i);
    }
  }

  draw() {
    this.ctx.fillRect(this.x,0,20,20);
    for(var i = 0; i < this.module.sockets.length; i ++) {
      this.sockets[i].draw();
    }
  }
}
