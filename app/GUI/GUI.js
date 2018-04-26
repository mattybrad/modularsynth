// GUI!

class GUI {
  constructor() {
    this.moduleX = 0;
    this.modules = [];
    this.phaser = new Phaser.Game(800, 600, Phaser.AUTO, 'gui', {
      preload: this.preload,
      create: this.create,
      update: this.update
    });
  }

  addModule(module) {
    var moduleWidth = 100; // temp
    this.modules.push(new ModuleGUI(this.phaser, module, this.moduleX, 0, moduleWidth));
    this.moduleX += moduleWidth;
  }

  draw() {
    //this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
    for(var i = 0; i < this.modules.length; i ++) {
      this.modules[i].draw();
    }
  }

  preload() {

  }

  create() {

  }

  update() {

  }
}

GUI.gui = new GUI();
