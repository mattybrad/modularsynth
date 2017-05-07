class SocketGUI {
  constructor(ctx, label, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.label = label;
  }

  draw() {
    this.ctx.fillText(this.label, this.x, this.y);
  }
}
