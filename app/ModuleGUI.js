class ModuleGUI {
  constructor(ctx, module) {
    this.ctx = ctx;
    this.module = module;
    this.draw();
  }

  draw() {
    this.ctx.fillRect(0,0,20,20);
  }
}
