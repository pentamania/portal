(function(){
    //Objectの拡張: http://qiita.com/phi/items/98975e1bb4995c1f1bcf
    Object.defineProperty(Object.prototype, "forIn", {
        value: function(fn, self) {
            self = self || this;

            Object.keys(this).forEach(function(key, index) {
                var value = this[key];

                fn.call(self, key, value, index);
            }, this);
        }
    });
}());

enchant();
var windowWidth = window.innerWidth;

//var SCREEN_WIDTH = (windowWidth > 480) ? 768 : 360;
var SCREEN_WIDTH = windowWidth-20; //画面いっぱいだと横スクロールしてしまうため
var SCREEN_HEIGHT = 280;
var SCREEN_CENTER_X = SCREEN_WIDTH / 2;
var SCREEN_CENTER_Y = SCREEN_HEIGHT / 2;
var SPRITES = new Array;
var ICON_SIZE = 52; // 26*26の正方形

var $host = location.host;
// console.log($host);
//abc順
var path = {
    blog: {
        url: "http://pentamania.hatenablog.com/",
        frameIndex: 0
    },
    deviantArt: {
        url: "http://pentamania.deviantart.com/",
        frameIndex: 1
    },
    drawr: {
        url: "http://drawr.net/pentamania",
        frameIndex: 2
    },
    pixiv: {
        url: "http://pixiv.me/pentamania",
        frameIndex: 6
    },
    jsdoit: {
        url: "http://jsdo.it/pentamania",
        frameIndex: 7
    },
    twitter: {
        url: "http://twitter.com/p3ntamania",
        frameIndex: 8
    },
    // apps: {
    //     url: $host+"/apps.html",
    //     frameIndex: 5
    // },

    //tumblr:"http://tumblr/pentamania",

    //apps: "http://pentamania.com/apps",
    //works: "http://pentamania.com/works",
    //about: "http://pentamania.com/about",
};

// create DOM link
path.forIn(function(key, value) {
    //console.log([index, key, value].join(','));
    var link = document.createElement("a");
    link.href = value.url;
    link.target = "_self";
    link.innerHTML = '<span>'+key+"</span>";
    var li = document.createElement("li");
    li.appendChild(link);
    links.appendChild(li);
});

window.onload = function(){
    var field = document.getElementById("enchant-stage");
    var fieldBounds = field.getBoundingClientRect(); //cssで余計なプロパティをつけないこと

    var core = new Core(SCREEN_WIDTH, SCREEN_HEIGHT);
    core.scale = 1;
    core.preload(
        'assets/images/yukkuris.gif',
        'assets/images/icons_big.png',
        'assets/images/icons.png'
    );
    core.fps = (navigator.userAgent.indexOf("Firefox")>-1) ? 30 : 60; //firefoxだとカクカク
    core.onload = function(){
        //物理世界の構築
        var world = new PhysicsWorld(0.0, 0.0); //第一項目がｘ軸の重力、第二項目がｙ軸の重力
        var scene = core.rootScene;
        scene.backgroundColor = 'rgba(150,0,150, 0)';
        var iconImages = core.assets['assets/images/icons_big.png']; //preload後に宣言
        var yukkuriImages = core.assets['assets/images/yukkuris.gif']; //preload後に宣言

        // マウス: 空のsprite、うまく動作せず
        //var mouse = new Sprite(16, 16);
        //mouse.position = {x:0, y:0};
        //mouse.image = new Surface(32, 32);
        //mouse.image.context.fillStyle = "red";
        //mouse.image.context.fillRect(1, 1, 30, 30);
        //mouse.position = {x:0 , y:0};
        //scene.addChild(mouse);
        // 操作可能なキャラ
        //引数：円の半径（スプライトサイズ/2）、動的か静的か,密度（重さ）、摩擦、反発、物理演算を適用するか

        // アイコン召喚
        path.forIn(function(key, value) {
            var randPos = {
                x: Math.floor (Math.random() * SCREEN_WIDTH),
                y: Math.floor (Math.random() * SCREEN_HEIGHT)
            };
            var url = value.url;
            var frameIndex =  value.frameIndex;
            var icon = new AnchoredIcon(randPos.x, randPos.y, iconImages, frameIndex, url);
            SPRITES.push(icon);
        });

        //player召喚： ゆっくり
        var player = new PhyCircleSprite(16, DYNAMIC_SPRITE, 1.5, 0.7, 0.6, true);
        player.image = yukkuriImages;
        player.frame = 1;
        player.scale = 1;
        player.position = {x: SCREEN_WIDTH/3, y:SCREEN_HEIGHT/3};
        //var player = new AnchoredIcon(SCREEN_WIDTH/3, SCREEN_HEIGHT/3, iconImages, 3);
        SPRITES.push(player);
        player.addEventListener ('enterframe', function() {
            // 十字キー操作
            var force = 0.5;
            if (core.input.left) this.applyImpulse({ x: -force, y: 0 });
            if (core.input.right) this.applyImpulse({ x: force, y: 0 });
            if (core.input.up) this.applyImpulse({ x: 0, y: -force });
            if (core.input.down) this.applyImpulse({ x: 0, y: force });
        });
        player.addEventListener('touchstart', function(){
            var yukkuri = confirm("ゆっくりしていってね!!");
            if (yukkuri === true) {
                return;
            } else {
                location.href = "http://google.com";
            }
        });

        SPRITES.forEach(function(sprite){
            // まとめてaddchild
            scene.addChild(sprite);

            //ゆらゆらさせる
            sprite.addEventListener('enterframe',function(){
                if (core.frame%2==1) {
                    sprite.applyImpulse({ x: 0.2, y: 0.1 });
                }else{
                    sprite.applyImpulse({ x: -0.2, y: -0.1 });
                }

            });
            //マウスオーバー時に反応 NG
            //if (sprite.intersect(mouse)) {
            //    field.style.cursor = 'pointer'; //なぜか最後に追加されたスプライトのみ？反応
            //}else{
            //    field.style.cursor = 'default'; //マウスアウト時（通常時）
            //};
        });

        //　天井、床、カベ
        var wallWidth = 2;
        var floor = new Wall(SCREEN_WIDTH/2, SCREEN_HEIGHT, SCREEN_WIDTH, wallWidth);
        var ceiling = new Wall(SCREEN_WIDTH/2, 0, SCREEN_WIDTH, wallWidth);
        var leftWall = new Wall(0, SCREEN_HEIGHT/2, wallWidth, SCREEN_HEIGHT);
        var rightWall = new Wall(SCREEN_WIDTH, SCREEN_HEIGHT/2, wallWidth, SCREEN_HEIGHT);

        //回転オブジェクト（x,y,幅,高さ,回転速度）
        var rotatingBarHeight = (windowWidth > 480) ? SCREEN_HEIGHT*0.7 : SCREEN_HEIGHT*0.4;
        var rotatingBar = new RotatingRect(SCREEN_CENTER_X, SCREEN_CENTER_Y, 8, rotatingBarHeight, 200);

        scene.addChild(floor);
        scene.addChild(ceiling);
        scene.addChild(leftWall);
        scene.addChild(rightWall);
        scene.addChild(rotatingBar);

        //ラベル
        var label = new Label("アイコンクリックで各サイトにジャンプ！");
        label.x = SCREEN_WIDTH/20;
        label.y = SCREEN_HEIGHT/20;
        label.width = SCREEN_WIDTH;

        label.color = 'white';
        //label.font = '15px "Impact"';
        label.font = "18px 'MSゴシック'";
        scene.addChild(label);

        //ヒント
        var label_aboutPlayer = new Label("方向キーを押すと?");
        label_aboutPlayer.x = SCREEN_WIDTH*0.8;
        label_aboutPlayer.y = SCREEN_HEIGHT*0.8;
        label_aboutPlayer.color = 'limegreen';
        scene.addChild(label_aboutPlayer);

        scene.onenterframe = function(e){
            world.step(core.fps); //物理シミュレーション内の時間を進める

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

        //リサイズ対策
        window.addEventListener('resize', function(){
            var windowWidth = window.innerWidth;
            var centerX = windowWidth / 2;

            //core.width = winWidth; //canvasサイズ変更
            //ceiling.width = winWidth;
            //ceiling.x = 0;
            //floor.width = winWidth;
            //floor.x = 0;
            //scene.floor.destroy(); //ng
            //var floor = new Wall(centerX, SCREEN_HEIGHT, SCREEN_WIDTH, wallWidth);
            //rightWall.x = winWidth-20;
            //console.log(ceiling.x);
        });

    };//--core.onload

    // classes
    //アンカー付きアイコン
    var AnchoredIcon = Class.create(PhyCircleSprite, {
        initialize: function (x, y, image, frameIndex, anchor){
            PhyCircleSprite.call(this, ICON_SIZE/2, DYNAMIC_SPRITE, 1.0, 0.7, 0.6, true); //初期化
            this.image = image;
            this.frame = frameIndex || 0;
            this.scale = 2;
            this.anchor = anchor || null;
            this.isTargeted = true;
            this.position = {x: x||0, y: y||0};
            this.duration = 30;
        },
        onenterframe: function(){
            //(core.frame%10==0) ? this.frame = 2 : this.frame = 3;
            //if (core.input.left) this.applyImpulse({ x: -0.4, y: 0 });
        },
        ontouchstart: function(){
            if (this.anchor !== null && this.isTargeted !== false) {
                // var ret = confirm(this.anchor+" へ飛びます。宜しいですか？");
                // if (ret === true) {
                    this.transAnim();
                    location.href = this.anchor;
                    console.log(this.anchor);
                // }
            };
            //if (this.isTargeted === false) {
            //    //this.addChild(lock);
            //    this.isTargeted = true;
            //};
        },
        transAnim: function(){
            var self = this;
            this.angularVelocity += 1200; //回転
            this.tl
                // .tween({scale:10, rotation:360, time:self.duration, easing:enchant.Easing.BOUNCE_EASEIN})
                .scaleTo(100, self.duration, enchant.Easing.QUAD_EASEINOUT)
        }
    });

    // 回転するアイコン
    var rotatingIcon = Class.create(PhyCircleSprite, {
        initialize: function (x, y){
            PhyCircleSprite.call(this, 16, STATIC_SPRITE, 1.0, 0.7, 2.0, true); //初期化
            this.image = iconImages;
            this.frame = 2;
            this.degree = 0;
            this.rad = 100; //回転半径
            this.center = {x:x, y:y};
        },
        onenterframe:function(){
            this.degree += 128;
            this.position = {
                x: this.center.x + Math.cos(Math.PI/180 * this.degree) * this.rad,
                y: this.center.y + Math.sin(Math.PI/180 * this.degree) * this.rad
            };
        }
    });

    // wall
    var Wall = Class.create(PhyBoxSprite, {
        initialize: function (x,y,width,height){
            PhyBoxSprite.call(this, width, height, STATIC_SPRITE, 1.0, 0.5, 0, true); //初期化
            this.image = new Surface(width, height);
            this.image.context.fillStyle = "yellow";
            this.image.context.fillRect(1, 1, width-2, height-2);
            this.position = {x:x, y:y};
        }
    });

    // rotating box
    var RotatingRect = Class.create(PhyBoxSprite, {
        initialize: function(x,y,width,height,radian){
            PhyBoxSprite.call(this, width, height, KINEMATIC_SPRITE, 1.0, 0.5, 0.3, true);
            this.height = height;
            this.image = new Surface(width, height);
            this.image.context.strokeStyle = "green";
            this.image.context.fillStyle = "#3cce46";
            this.image.context.fillRect(1, 1, width-2, height-2);
            this.position = {x: x, y: y};
            this.angularVelocity = radian || 90;    //継続的な回転を行う(90度/s

            this.duration = 200; // 往来速度
            this.backAndForthAnim();
        },
        onenterframe: function(){
        },
        backAndForthAnim: function(){
            this.tl.moveTo(SCREEN_WIDTH-this.height*0.5, SCREEN_CENTER_Y/2, this.duration, enchant.Easing.QUAD_EASEINOUT)
                .moveTo(0+this.height*0.5, SCREEN_CENTER_Y/2, this.duration, enchant.Easing.QUAD_EASEINOUT)
                .loop();
        }
    });

    core.start();

};//--window.onload
