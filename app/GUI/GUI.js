// GUI!

class GUI {
  constructor() {
    this.moduleX = 0;
    this.modules = [];
    this.cvs = document.createElement("canvas");
    this.cvs.width = 800;
    this.cvs.height = 600;
    this.ctx = this.cvs.getContext('2d');
    document.body.appendChild(this.cvs);
    setInterval(this.draw.bind(this), 20);
  }

  addModule(module) {
    var moduleWidth = 100; // temp
    this.modules.push(new ModuleGUI(this.ctx, module, this.moduleX, 0, moduleWidth));
    this.moduleX += moduleWidth;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
    for(var i = 0; i < this.modules.length; i ++) {
      this.modules[i].draw();
    }
  }
}

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gui', { preload: preload, create: create, update: update });

function preload() {
}

function create() {
}

function update() {
}

GUI.gui = new GUI();
