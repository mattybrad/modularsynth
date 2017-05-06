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
    this.modules.push(new ModuleGUI(this.ctx, module, this.moduleX));
    this.moduleX += 50;
  }

  draw() {
    for(var i = 0; i < this.modules.length; i ++) {
      this.modules[i].draw();
    }
  }
}

GUI.gui = new GUI();
