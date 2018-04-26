class ModuleGUI extends Phaser.Group {
  constructor(phaser, module, x, y, width) {
    super(phaser);
    //phaser.add.existing(this);
    this.phaser = phaser;
    this.x = x;
    this.y = y;
    this.width = width;
    this.module = module;
    this.sockets = [];
    for(var i = 0; i < this.module.sockets.length; i ++) {
      this.sockets[i] = new SocketGUI(phaser, this.module.sockets[i].label, x, 50 + y + 50 * i);
    }
  }

  draw() {
    //this.ctx.fillStyle = '#CCFFCC';
    //this.ctx.fillRect(this.x,0,this.width - 2,600);
    for(var i = 0; i < this.module.sockets.length; i ++) {
      this.sockets[i].draw();
    }
  }
}
