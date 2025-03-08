"use strict";

class JoyStick {
  static X = 400;
  static Y = 800;
  static RADIUS = 80;
  static COLOR = 0x0000ff;
  static ALPHA = 0.5;
  static OK_RANGE = 30;

  constructor(scene) {
    this.scene = scene;
    this.container = scene.add.container(0, 0);
    this.top = scene.add.circle(JoyStick.X, JoyStick.Y, JoyStick.RADIUS, JoyStick.COLOR, JoyStick.ALPHA);
    this.frame = scene.add.circle(JoyStick.X, JoyStick.Y, JoyStick.RADIUS*1.8, JoyStick.COLOR, 0);
    this.frame.setStrokeStyle(JoyStick.RADIUS*0.1, JoyStick.COLOR, JoyStick.ALPHA);
    this.container.add([this.top, this.frame]);
    scene.cameras.main.ignore(this.container);
    this.uiCamera = scene.cameras.add(0, 0, scene.scale.width, scene.scale.height);
    this.uiCamera.ignore(scene.children.list.filter(obj => obj !== this.container));

    this.x = 0;
    this.y = 0;
    this.is_tap = false;
    this.direction = null;

    scene.input.on('pointerdown', this.start_touch);
    scene.input.on('pointermove', this.touch);
    scene.input.on('pointerup', this.end_touch);
  }

  start_touch = (Touch) => {
    if((Touch.x - JoyStick.X)*(Touch.x - JoyStick.X)
      + (Touch.y - JoyStick.Y)*(Touch.y - JoyStick.Y)
      > (JoyStick.RADIUS + JoyStick.OK_RANGE)*(JoyStick.RADIUS + JoyStick.OK_RANGE))
    {
      return;
    }
    this.is_tap = true;
    this.x = Touch.x - JoyStick.X;
    this.y = Touch.y - JoyStick.Y;
  };

  touch = (Touch) => {
    if(this.is_tap) {
      this.x = Touch.x - JoyStick.X;
      this.y = Touch.y - JoyStick.Y;
    }
  };

  end_touch = () => {
    this.is_tap = false;
    this.x = 0;
    this.y = 0;
  };

  update() {
    if(this.x !== 0 || this.y !== 0) {
      const abs = Math.sqrt(this.x*this.x + this.y*this.y);
      const next = Math.min(abs, JoyStick.RADIUS + JoyStick.OK_RANGE);
      const ratio = next / abs;
      this.top.x = this.x*ratio + JoyStick.X;
      this.top.y = this.y*ratio + JoyStick.Y;
    } else {
      this.top.x = JoyStick.X;
      this.top.y = JoyStick.Y;
    }

    if(this.x !== 0 || this.y !== 0) {
      if(this.x > 0 && Math.abs(this.y) < this.x) {
        this.direction = "right";
      } else if(this.x < 0 && Math.abs(this.y) < -this.x) {
        this.direction = "left";
      } else if(this.y < 0 && Math.abs(this.x) < -this.y) {
        this.direction = "up";
      } else {
        this.direction = "down";
      }
    } else {
      this.direction = null;
    }
    // console.log(this.x, this.y);
  }
}
