class SocketGUI {
  constructor(ctx, label, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.label = label;
  }

  draw() {
    this.ctx.fillStyle = '#333333';
    this.ctx.beginPath();
    var radius = 10;
    this.ctx.arc(this.x+radius, this.y + radius, radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.fillText(this.label, this.x, this.y + 30);
  }
}
