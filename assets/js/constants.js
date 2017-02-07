//var SCREEN_WIDTH = (windowWidth > 480) ? 768 : 360;
var SCREEN_WIDTH = window.innerWidth - 20; //画面いっぱいだと横スクロールしてしまうため
var SCREEN_HEIGHT = 280;
var SCREEN_CENTER_X = SCREEN_WIDTH / 2;
var SCREEN_CENTER_Y = SCREEN_HEIGHT / 2;

var DEBUG_MODE = false;
DEBUG_MODE = true;
var ASSETS = {
  spritemap: 'assets/images/spritesheet.json',
  // icons: 'assets/images/icons_big.png',
  icons: 'assets/images/spritesheet.png',
  yukkuri: 'assets/images/yukkuris.gif',
}

// abc順
var PATHS = {
  blog: {
    url: "http://pentamania.hatenablog.com/",
    label: "BLOG",
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
  github: {
    url: "http://github.com/pentamania",
  },
  // games: {
  //   url: $host+"/apps.html",
  //   frameIndex: 5
  // },
  // art: {
  //   url: $host+"/apps.html",
  //   frameIndex: 5
  // },

  //apps: "http://pentamania.com/apps",
  //works: "http://pentamania.com/works",
  //about: "http://pentamania.com/about",
};
