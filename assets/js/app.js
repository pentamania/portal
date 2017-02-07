
var PORTAL = PORTAL || {};
PORTAL.start = function(anchorData) {
  // var field = document.getElementById("enchant-stage");
  // var fieldBounds = field.getBoundingClientRect(); //cssで余計なプロパティをつけないこと
  // var isTransed = false; // 遷移中

  var core = new Core(SCREEN_WIDTH, SCREEN_HEIGHT);
  core.fps = 60;
  core.preload(ASSETS)
  .onload = function() {
    var wallWidth = 2;
    var iconSprites = [];
    var assets = core.assets;
    var scene = core.rootScene;
    scene.backgroundColor = 'rgba(150, 0, 150, 0)';
    var world = new PhysicsWorld(0.0, 0.0); //第一項目がｘ軸の重力、第二項目がｙ軸の重力

    // マウス: 空のsprite、うまく動作せず
    //var mouse = new Sprite(16, 16);
    //mouse.position = {x:0, y:0};
    //mouse.image = new Surface(32, 32);
    //mouse.image.context.fillStyle = "red";
    //mouse.image.context.fillRect(1, 1, 30, 30);
    //mouse.position = {x:0 , y:0};
    //scene.addChild(mouse);

    // アイコン召喚
    var frames = JSON.parse(assets['spritemap']).frames;
    anchorData.forIn(function(key, value) {
      var sprite = frames[key];
      if (!sprite) return;

      var frameSize = sprite.sourceSize.w; // TEMP: 52
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
    var player = new PhyCircleSprite(16, DYNAMIC_SPRITE, 1.5, 0.7, 0.6, true);
    player.image = assets['yukkuri'];
    player.frame = 1;
    player.scale(2, 2);
    player.position = {x: SCREEN_WIDTH/3, y:SCREEN_HEIGHT/3};
    //var player = new AnchoredIcon(SCREEN_WIDTH/3, SCREEN_HEIGHT/3, iconImages, 3);
    iconSprites.push(player);
    player.on('enterframe', function() {
      // 十字キー操作
      var force = 0.5;
      if (core.input.left) this.applyImpulse({ x: -force, y: 0 });
      if (core.input.right) this.applyImpulse({ x: force, y: 0 });
      if (core.input.up) this.applyImpulse({ x: 0, y: -force });
      if (core.input.down) this.applyImpulse({ x: 0, y: force });
    });
    player.on('touchstart', function(){
      var yukkuri = confirm("ゆっくりしていってね!!");
      if (yukkuri) return;
      location.href = "http://google.com";
    });

    iconSprites.forEach(function(sprite) {
      sprite.on('enterframe', function(e){
        //ゆらゆらさせる
        if (core.frame%2 === 0) {
          sprite.applyImpulse({ x: 0.2, y: 0.1 });
        } else {
          sprite.applyImpulse({ x: -0.2, y: -0.1 });
        }
      });
      //マウスオーバー時に反応 うまくいかない
      //if (sprite.intersect(mouse)) {
      //    field.style.cursor = 'pointer'; //なぜか最後に追加されたスプライトのみ？反応
      //}else{
      //    field.style.cursor = 'default'; //マウスアウト時（通常時）
      //};

      // まとめてaddchild
      scene.addChild(sprite);
    });

    // 天井、床、側カベ
    var floor = new Wall(SCREEN_WIDTH/2, SCREEN_HEIGHT, SCREEN_WIDTH, wallWidth).addChildTo(scene);
    var ceiling = new Wall(SCREEN_WIDTH/2, 0, SCREEN_WIDTH, wallWidth).addChildTo(scene);
    var leftWall = new Wall(0, SCREEN_HEIGHT/2, wallWidth, SCREEN_HEIGHT).addChildTo(scene);
    var rightWall = new Wall(SCREEN_WIDTH, SCREEN_HEIGHT/2, wallWidth, SCREEN_HEIGHT).addChildTo(scene);

    // 回転オブジェクト（x,y,幅,高さ,回転速度）
    var rotatingBarHeight = (window.innerWidth > 480) ? SCREEN_HEIGHT*0.7 : SCREEN_HEIGHT*0.4;
    var rotatingBar = new RotatingRect(SCREEN_CENTER_X, SCREEN_CENTER_Y, 8, rotatingBarHeight, 200).addChildTo(scene);

    // ラベル
    var label_info = new MyLabel(
      "アイコンクリックで各サイトにジャンプ！",
      SCREEN_WIDTH / 20,
      SCREEN_HEIGHT * 0.25
    ).addChildTo(scene)
    .setOrigin(0.2, 0.5)
    .setBaseRotation(-8)
    .shakeAnim(1)
    ;
    label_info.width = SCREEN_WIDTH / 2;
    // label_info.height = SCREEN_HEIGHT / 8;

    // ヒント
    var label_aboutPlayer = new MyLabel(
      "方向キーで操作",
      SCREEN_WIDTH * 0.6,
      SCREEN_HEIGHT * 0.6
    ).addChildTo(scene)
    .setOrigin(1.0, 0.5)
    .setBaseRotation(-10)
    .shakeAnim(1)
    ;

    // scene.addChildren([
    //   floor, ceiling, leftWall, rightWall, rotatingBar,
    // ]);

    scene.onenterframe = function(e){
      //物理シミュレーション内の時間を進める
      world.step(core.fps);

      //rotatingBar.contact(function (sprite) {
      //    sprite.applyImpulse({ x: 0, y: -0.5 }); //接触してきたスプライトに対して
      //    if (rotatingBar.angularVelocity < 800) {
      //        rotatingBar.angularVelocity += 1;
      //    }
      //});
      //if (rotatingBar.angularVelocity > 120) {
      //    rotatingBar.angularVelocity -= 1;
      //}
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
      //var floor = new Wall(centerX, SCREEN_HEIGHT, SCREEN_WIDTH, wallWidth);
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