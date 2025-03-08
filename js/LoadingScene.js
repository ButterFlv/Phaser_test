"use strict";

class LoadingScene extends Phaser.Scene {
  static COLOR_BACKGROUND = 0x2ecc71;

  constructor() {
    super({key: 'LoadingScene'});
  }

  preload() {
    this.load.tilemapTiledJSON('map_1', 'assets/ground/ground.json');
    this.load.image('ground_1', 'assets/ground/BrightForest-A2.png');
    this.load.spritesheet('player_img', 'assets/player/LF-Chara-Sogen01.png', {
      frameWidth: 32, frameHeight: 64
    });
    this.load.on('progress', this.my_handle_progress);
    this.my_init();
  }

  create() {
    this.scene.start('Game');
  }

  my_init() {
    // 背景を設定
    this.cameras.main.setBackgroundColor(LoadingScene.COLOR_BACKGROUND);

    this.add.text(
      this.scale.width/2,
      this.scale.height/2,
      'Loading Now...', {
      fontSize: '150px',
      fontFamily: 'Consolas',
      fill: '#000000'
    }).setOrigin(0.5);

    this.progress_num = this.add.text(
      this.scale.width/2,
      this.scale.height*0.75,
      '__________',{
        fontSize: '150px', fontFamily: 'Consolas',
        fill: '#000000'
    }).setOrigin(0.5);
  }

  my_handle_progress = (value) => {
    let text = '';
    for(let i=0;i<Math.floor(value*10);i++) text+="*";
    for(let i=0;i<(10-Math.floor(value*10));i++) text+="_";
    this.progress_num.setText(text);
  }
}
