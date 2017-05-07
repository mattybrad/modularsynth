class ModuleGUI {
  constructor(ctx, module, x, y, width) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.module = module;
    this.sockets = [];
    for(var i = 0; i < this.module.sockets.length; i ++) {
      this.sockets[i] = new SocketGUI(ctx, this.module.sockets[i].label, x, 50 + y + 50 * i);
    }
  }

  draw() {
    this.ctx.fillStyle = '#CCFFCC';
    this.ctx.fillRect(this.x,0,this.width - 2,600);
    for(var i = 0; i < this.module.sockets.length; i ++) {
      this.sockets[i].draw();
    }
  }
}
