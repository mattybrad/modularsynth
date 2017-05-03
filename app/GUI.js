// GUI!

class GUI {
  constructor() {
    this.modules = [];
    this.cvs = document.createElement("canvas");
    this.cvs.width = 800;
    this.cvs.height = 600;
    this.ctx = this.cvs.getContext('2d');
    document.body.appendChild(this.cvs);
  }

  addModule(module) {
    this.modules.push(new ModuleGUI(this.ctx, module));
  }

  draw() {

  }
}

GUI.gui = new GUI();
