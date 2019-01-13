
var PORTAL = PORTAL || {};
PORTAL.start = function(anchorData) {
  var core = new Core(SCREEN_WIDTH, SCREEN_HEIGHT);
  core.fps = 60;
  core.preload(ASSETS)
  .onload = function() {
    var iconSprites = [];
    var assets = core.assets;
    var scene = core.rootScene;
    scene.backgroundColor = 'rgba(0, 0, 0, 0)'; // 透明
    var world = new PhysicsWorld(0.0, 0.0); // 第一項目がｘ軸の重力、第二項目がｙ軸の重力

    // キー登録
    core.keybind('Z'.charCodeAt(0), 'z');

    // アイコン召喚
    var frames = JSON.parse(assets['spritemap']).frames;
    anchorData.forIn(function(key, value) {
      var sprite = frames[key];
      if (!sprite) return;

       // フレームサイズは全て同じ前提
      var frameSize = sprite.sourceSize.w;
      var frameIndex = Math.floor(sprite.frame.x / frameSize);
      var randPos = {
        x: Math.randint(SCREEN_WIDTH),
        y: Math.randint(SCREEN_HEIGHT)
      };
      var icon = new AnchoredIcon(assets['icons'], frameSize/2, frameIndex, value.url);
      icon.position = randPos;
      iconSprites.push(icon);
    });

    // player召喚
    // var player = new PhyCircleSprite(26, DYNAMIC_SPRITE, 1.5, 0.7, 0.6, true);
    var player = new PhyBoxSprite(48, 52, DYNAMIC_SPRITE, 1.5, 0.7, 0.6, true);
    player.image = assets['fox'];
    player.position = {x: SCREEN_WIDTH * 0.5, y: SCREEN_HEIGHT * 0.5};
    player.on('enterframe', function(e) {
      /* キー操作 */
      // 回転と噴射パターン
      // if (core.input.left) this.angularVelocity -= PLAYER_FORCE;
      // if (core.input.down) this.angularVelocity -= PLAYER_FORCE;
      // if (core.input.up) this.angularVelocity += PLAYER_FORCE;
      // if (core.input.right) this.angularVelocity += PLAYER_FORCE;
      // if (core.input.z) {
      //  // なんか撃つ
      //   var vec = {
      //     x: Math.cos(player.rotation * Math.PI/180),
      //     y: Math.sin(player.rotation * Math.PI/180)
      //   };
      //   var b = new Bullet(assets['yukkuri'], 16).addChildTo(scene);
      //   b.position = { x: player.position.x+vec.x*20, y: player.position.y + vec.y*20 };
      //   b.applyImpulse({ x: vec.x * b.force, y: vec.y * b.force });

      //   // 反動
      //   player.applyImpulse({
      //     x: -vec.x * b.force * 0.5,
      //     y: -vec.y * b.force * 0.5
      //   });
      // }

      // 指定方向に加速
      if (core.input.left) this.applyImpulse({ x: -PLAYER_FORCE, y: 0 });
      if (core.input.right) this.applyImpulse({ x: PLAYER_FORCE, y: 0 });
      if (core.input.up) this.applyImpulse({ x: 0, y: -PLAYER_FORCE });
      if (core.input.down) this.applyImpulse({ x: 0, y: PLAYER_FORCE });
    });
    player.on('touchstart', function() {
      var label = new MyLabel(
        FOX_LINES.pick(), null, null, null, "#F801FE"
      )
        .setFontSize(22)
        .addChildTo(scene)
      ;
      label.moveTo(player.x - label.width/2, player.y)

      label.tl
        .delay(100)
        // .moveBy(0, -100, 100, enchant.Easing.QUAD_EASEINOUT)
        .tween({opacity: 0, time: 50})
        .then(function() {
          scene.removeChild(label)
        })
        // .tween({x:0, y:-100, time:60})
    });
    iconSprites.push(player);

    // スプライト挙動
    iconSprites.forEach(function(sprite) {
      sprite.on('enterframe', function(e) {
        //ゆらゆらさせる
        if (core.frame%2 === 0) {
          sprite.applyImpulse({ x: 0.2, y: 0.1 });
        } else {
          sprite.applyImpulse({ x: -0.2, y: -0.1 });
        }
      });

      // まとめてaddchild
      scene.addChild(sprite);
    });

    // 天井、床、側カベ
    var floor = new Wall(SCREEN_WIDTH/2, SCREEN_HEIGHT, SCREEN_WIDTH, WALL_WIDTH).addChildTo(scene);
    var ceiling = new Wall(SCREEN_WIDTH/2, 0, SCREEN_WIDTH, WALL_WIDTH).addChildTo(scene);
    var leftWall = new Wall(0, SCREEN_HEIGHT/2, WALL_WIDTH, SCREEN_HEIGHT).addChildTo(scene);
    var rightWall = new Wall(SCREEN_WIDTH, SCREEN_HEIGHT/2, WALL_WIDTH, SCREEN_HEIGHT).addChildTo(scene);

    // 回転オブジェクト（x,y,幅,高さ,回転速度）
    var rotatingBar = new RotatingRect(SCREEN_CENTER_X, SCREEN_CENTER_Y, 8, ROTATING_BAR_LENGTH, 200).addChildTo(scene);

    // 説明ラベル
    var label_info = new MyLabel(
      MESSAGE_JUMP_TO_SNS_LINK,
      SCREEN_WIDTH / 20,
      SCREEN_HEIGHT * 0.25
    )
      .addChildTo(scene)
      .setOrigin(0.2, 0.5)
      .setBaseRotation(-8)
      .shakeAnim(1)
    ;
    label_info.width = SCREEN_WIDTH / 2;
    // label_info.height = SCREEN_HEIGHT / 8;

    scene.onenterframe = function(e) {
      //物理シミュレーション内の時間を進める
      world.step(core.fps);

      // // 接触してきたスプライトに対して
      // rotatingBar.contact(function (sprite) {
      //    sprite.applyImpulse({ x: 0, y: -0.5 });
      //    if (rotatingBar.angularVelocity < 800) {
      //      // 回転速度増加
      //      rotatingBar.angularVelocity += 1;
      //    }
      // });
      // if (rotatingBar.angularVelocity > 120) {
      //   // 減速
      //    rotatingBar.angularVelocity -= 1;
      // }
    };

    // リサイズ対策
    // window.addEventListener('resize', function(){
    //   var windowWidth = window.innerWidth;
    //   var centerX = windowWidth / 2;

      //core.width = winWidth; //canvasサイズ変更
      //ceiling.width = winWidth;
      //ceiling.x = 0;
      //floor.width = winWidth;
      //floor.x = 0;
      //scene.floor.destroy(); //ng
      //var floor = new Wall(centerX, SCREEN_HEIGHT, SCREEN_WIDTH, WALL_WIDTH);
      //rightWall.x = winWidth-20;
      //console.log(ceiling.x);
    // });

  };

  if (DEBUG_MODE) {
    core.debug();
  } else {
    core.start();
  }
};