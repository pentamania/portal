//var SCREEN_WIDTH = (windowWidth > 480) ? 768 : 360;
var SCREEN_WIDTH = window.innerWidth - 20; //画面いっぱいだと横スクロールしてしまうため
var SCREEN_HEIGHT = 280;
var SCREEN_CENTER_X = SCREEN_WIDTH / 2;
var SCREEN_CENTER_Y = SCREEN_HEIGHT / 2;
var ICON_SIZE = 52; // 26*26の正方形
var DEBUG_MODE = true;
// var DEBUG_MODE = false;

//abc順
var PATHS = {
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
