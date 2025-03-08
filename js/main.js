"use strict";

const config = {
  type: Phaser.AUTO,
  width:  WIDTH, // 16:9の基準幅
  height: HEIGHT, // 16:9の基準高さ
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT, // 画面いっぱいにフィット
    autoCenter: Phaser.Scale.CENTER_BOTH // 画面中央に配置
  },
  physics: {
    default: 'arcade', // Arcade 物理エンジンを使用
    arcade: {
      // gravity: { y: 300 }, // Y軸方向の重力を設定
      debug: true // デバッグ用の表示（true で当たり判定を可視化）
    }
  },
  scene: [
    Start,
    LoadingScene,
    Game
  ]
};

const main = () => {
  const game = new Phaser.Game(config);
};

window.addEventListener("load", () => main(), {once:true});




"use strict";

// クラスを凍結する関数
const freezeStatic = (cls) => {
  if (typeof cls !== 'function') {
      throw new TypeError("Expected a class (function)");
  }

  const deepFreeze = (obj) => {
      if (obj && typeof obj === 'object' && !Object.isFrozen(obj)) {
          Object.freeze(obj);
          Object.getOwnPropertyNames(obj).forEach(prop => {
              if (typeof obj[prop] === 'object' && obj[prop] !== null) {
                  deepFreeze(obj[prop]);
              }
          });
      }
  };

  // クラスの `static` プロパティを取得し、凍結
  Object.getOwnPropertyNames(cls).forEach(prop => {
      if (prop !== 'prototype' && prop !== 'length' && prop !== 'name') {
          deepFreeze(cls[prop]);
      }
  });

  // クラス自体を凍結
  Object.freeze(cls);
};


document.addEventListener("touchmove", (event) => {
  event.preventDefault();
}, { passive: false });

document.addEventListener("wheel", (event) => {
  event.preventDefault();
}, { passive: false });

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

document.addEventListener("touchstart", (event) => {
  event.preventDefault();
}, { passive: false });

document.addEventListener("dragstart", (event) => {
  event.preventDefault();
});

document.addEventListener("selectstart", (event) => {
  event.preventDefault(); // テキスト選択を防ぐ
});

document.addEventListener("keydown", (event) => {
  if (
    event.ctrlKey && (
      event.key === "s" ||  // Ctrl + S
      event.key === "p" ||  // Ctrl + P
      event.key === "u" ||  // Ctrl + U（ソースコード表示）
      event.key === "a" ||  // Ctrl + A（全選択）
      event.key === "c" ||  // Ctrl + C（コピー）
      event.key === "x" ||  // Ctrl + X（切り取り）
      event.key === "v" ||  // Ctrl + V（貼り付け）
      event.key === "i"     // Ctrl + Shift + I（開発ツール）
    )
  ) {
    event.preventDefault();
  }
});
