"use strict";

class Start extends Phaser.Scene {
  static COLOR_BACKGROUND = 0x2ecc71;

  constructor() {
    super({key: 'Start'});
  }

  preload() {}

  create() {
    this.add.rectangle(
      this.scale.width/2, this.scale.height/2,
      this.scale.width, this.scale.height, Start.COLOR_BACKGROUND
    );

    this.add.text(
      this.scale.width/2, this.scale.height/2,
      "click to start!", {
        fontSize: "128px", fontFamily: "Consolas",
        fill: "black"
      }
    ).setOrigin(0.5);

    this.input.once('pointerdown', () => {
      this.scene.start('LoadingScene');
    });
  }
}
