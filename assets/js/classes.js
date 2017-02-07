'use strict';
enchant();

var AnchoredIcon = Class.create(PhyCircleSprite, {
  initialize: function (x, y, image, frameIndex, anchor){
    PhyCircleSprite.call(this, ICON_SIZE/2, DYNAMIC_SPRITE, 1.0, 0.7, 0.6, true);
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
      // if (!ret) return
      this.transAnim();
      location.href = this.anchor;
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
var RotatingIcon = Class.create(PhyCircleSprite, {
  initialize: function (x, y){
    PhyCircleSprite.call(this, 16, STATIC_SPRITE, 1.0, 0.7, 2.0, true); //初期化
    this.image = iconImages;
    this.frame = 2;
    this.degree = 0;
    this.rad = 100; //回転半径
    this.center = {x:x, y:y};
  },
  onenterframe: function() {
    this.degree += 128;
    this.position = {
      x: this.center.x + Math.cos(Math.PI/180 * this.degree) * this.rad,
      y: this.center.y + Math.sin(Math.PI/180 * this.degree) * this.rad
    };
  }
});

var Wall = Class.create(PhyBoxSprite, {
  initialize: function (x,y,width,height){
    PhyBoxSprite.call(this, width, height, STATIC_SPRITE, 1.0, 0.5, 0, true); //初期化
    this.image = new Surface(width, height);
    this.image.context.fillStyle = "yellow";
    this.image.context.fillRect(1, 1, width-2, height-2);
    this.position = {x:x, y:y};
  }
});

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

var MyLabel =  Class.create(Label, {
  initialize: function(text, x, y, font, color) {
    Label.call(this, text);
    x = x || 0;
    y = y || 0;
    this.moveTo(x, y);
    this.font = font || "18px 'MSゴシック'";
    this.color = color || 'white';
  }
});