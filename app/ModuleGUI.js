class ModuleGUI {
  constructor(ctx, module, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.module = module;
    this.draw();
  }

  draw() {
    this.ctx.fillRect(this.x,0,20,20);
  }
}
