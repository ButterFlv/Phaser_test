"use strict";

class Game extends Phaser.Scene {
  constructor() {
    super({ key: "Game" });
    this.player = null;
  }

  preload() {}

  create() {
    const map = this.make.tilemap({ key: "map_1" });
    const tileset = map.addTilesetImage("ground_tile_1", "ground_1");
    this.layer1 = map.createLayer("base", tileset, 0, 0);
    this.layer2 = map.createLayer("wall", tileset, 0, 0);
    this.layer2.setCollisionByExclusion([-1]);

    this.player = new Player(this, 170, 120, "player_img");
    this.physics.add.collider(this.player, this.layer2);

    this.cameras.main.setZoom(4);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    // Player クラス内の createDebugUI() を呼び出す
    // this.player.createDebugUI();
    this.scale.startFullscreen();
  }

  update() {
    if (this.player) {
      this.player.update();
    }
  }
}
