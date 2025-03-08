"use strict";

class Player extends Phaser.Physics.Arcade.Sprite {
  static ANIM_SPEED = 5;

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    this.scene = scene;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // デフォルトの当たり判定サイズ
    this.initHitbox();

    // キーボード入力
    this.initControls();

    // アニメーションの登録
    this.initAnimations();
  }

  initHitbox() {
    this.setSize(25, 25);
    this.setOffset(3, 41);
  }

  initControls() {
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.key_f = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    this.key_d = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.joystick = new JoyStick(this.scene);
  }

  initAnimations() {
    const anims = this.scene.anims;

    anims.create({
      key: "walk-left",
      frames: [12, 13, 14, 13].map((x) => ({ key: "player_img", frame: x })),
      frameRate: Player.ANIM_SPEED,
      repeat: -1,
    });

    anims.create({
      key: "walk-right",
      frames: [24, 25, 26, 25].map((x) => ({ key: "player_img", frame: x })),
      frameRate: Player.ANIM_SPEED,
      repeat: -1,
    });

    anims.create({
      key: "walk-up",
      frames: [36, 37, 38, 37].map((x) => ({ key: "player_img", frame: x })),
      frameRate: Player.ANIM_SPEED,
      repeat: -1,
    });

    anims.create({
      key: "walk-down",
      frames: [0, 1, 2, 1].map((x) => ({ key: "player_img", frame: x })),
      frameRate: Player.ANIM_SPEED,
      repeat: -1,
    });
  }

  update() {
    this.joystick.update();
    this.handleMovement();
    this.handleSkill();
  }

  handleMovement() {
    const d = this.joystick.direction;
    if (this.cursors.left.isDown || d === 'left') {
      this.setVelocityX(-160);
      this.setVelocityY(0);
      this.anims.play("walk-left", true);
    } else if (this.cursors.right.isDown || d === 'right') {
      this.setVelocityX(160);
      this.setVelocityY(0);
      this.anims.play("walk-right", true);
    } else if (this.cursors.up.isDown || d === 'up') {
      this.setVelocityY(-160);
      this.setVelocityX(0);
      this.anims.play("walk-up", true);
    } else if (this.cursors.down.isDown || d === 'down') {
      this.setVelocityY(160);
      this.setVelocityX(0);
      this.anims.play("walk-down", true);
    } else {
      this.setVelocityX(0);
      this.setVelocityY(0);
      this.anims.stop();
    }
  }

  handleSkill(){
    if (this.key_f.isDown && !this.skill_f_cooldown) {
      this.scene.cameras.main.flash(300, 255, 255, 255);

      // クールダウンを設定（1秒）
      this.skill_f_cooldown = true;
      this.scene.time.delayedCall(1000, () => {
        this.skill_f_cooldown = false;
      });
    }

    if (this.key_d.isDown && !this.skill_d_cooldown) {
      this.scene.cameras.main.shake(500, 0.002);

      // クールダウンを設定（1秒）
      this.skill_d_cooldown = true;
      this.scene.time.delayedCall(1000, () => {
        this.skill_d_cooldown = false;
      });
    }
  }

  createDebugUI() {
    const gui = new dat.GUI();

    const hitboxFolder = gui.addFolder("Player Hitbox");
    hitboxFolder.add(this.body, "width", 1, 32).step(1).name("Width").onChange((value) => {
      this.setSize(value, this.body.height);
    });
    hitboxFolder.add(this.body, "height", 1, 64).step(1).name("Height").onChange((value) => {
      this.setSize(this.body.width, value);
    });
    hitboxFolder.add(this.body.offset, "x", 0, 32).step(1).name("Offset X").onChange((value) => {
      this.setOffset(value, this.body.offset.y);
    });
    hitboxFolder.add(this.body.offset, "y", 0, 64).step(1).name("Offset Y").onChange((value) => {
      this.setOffset(this.body.offset.x, value);
    });

    hitboxFolder.open();
  }
}
