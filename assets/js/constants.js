//var SCREEN_WIDTH = (windowWidth > 480) ? 768 : 360;
var SCREEN_WIDTH = window.innerWidth - 20; //画面いっぱいだと横スクロールしてしまうため
var SCREEN_HEIGHT = 280;
var SCREEN_CENTER_X = SCREEN_WIDTH / 2;
var SCREEN_CENTER_Y = SCREEN_HEIGHT / 2;

var DEBUG_MODE = false;
// DEBUG_MODE = true;

var ASSETS = {
  spritemap: 'assets/images/spritesheet.json',
  // icons: 'assets/images/icons_big.png',
  icons: 'assets/images/spritesheet.png',
  yukkuri: 'assets/images/yukkuris.gif',
};

;(function(){
  var assetPath = "./assets/images/works-thumbnail/";

  var linkList = {
    blog: {
      url: "http://pentamania.hatenablog.com/",
      label: "BLOG",
      // frameIndex: 0
    },
    // deviantArt: {
    //   url: "http://pentamania.deviantart.com/",
      // frameIndex: 1
    // },
    drawr: {
      url: "http://drawr.net/pentamania",
      // frameIndex: 2
    },
    pixiv: {
      url: "http://pixiv.me/pentamania",
      // frameIndex: 6
    },
    jsdoit: {
      url: "http://jsdo.it/pentamania",
      // frameIndex: 7
    },
    twitter: {
      url: "http://twitter.com/p3ntamania",
      // frameIndex: 8
    },
    github: {
      url: "http://github.com/pentamania",
    },
    //apps: "http://pentamania.com/apps",
    //works: "http://pentamania.com/works",
    //about: "http://pentamania.com/about",
  };
  window.SNS_LINK_LIST = linkList;

  var GAME_LIST = [
    {
      "name": "リズミックレイン",
      "descriptions": "シンプルな雰囲気音ゲー",
      "imagepath": assetPath+"rrain.gif",
      "url":"https://pentamania.github.io/rhythmic-rain/game/dist"
    },
    {
      "name": "ナズーリン・ザ・ダウザー",
      "descriptions": "東方二次創作、モノ探しミニゲーム",
      "imagepath": assetPath+"naz-game.gif",
      "url":"http://9leap.net/games/4692"
    },
    {
      "name": "BBEMYBABYゲーム",
      "descriptions": "例のあのクソコラを再現",
      "imagepath": assetPath+"bbmb-game.gif",
      "url":"https://pentamania.github.io/bbemybaby-game/"
    },
    // {
    //   "name": "スライドパズる",
    //   "descriptions": "インターネットの画像で15パズル",
    //   "url":""
    // },
    // {
    //   "name": "ランダムに選ばれたお題の数字と同じ数字を選ぶゲーム",
    //   "descriptions": "処女作。とても普通",
    //   "url":""
    // },
    {
      "name": "ゲーム(仮)",
      "descriptions": "人生",
      "url": ""
    },
  ];
  window.GAME_LIST = GAME_LIST;

  var APPLICATION_LIST = [
    // {
    //   "name": "PxBエディター",
    //   "descriptions": "クロスビーツ風の譜面が作れるデスクトップアプリケーション",
    //   "imagepath": assetPath+"./assets/images/",
    //   "url":""
    // },
    {
      "name": "いらもじ",
      "descriptions": "いらすとやさんのあの文字",
      "imagepath": assetPath+"iramoji.gif",
      "url":"https://pentamania.github.io/iramoji"
    }
  ];
  window.APPLICATION_LIST = APPLICATION_LIST;

  var ZATTA = [
    {
      "name" : "フラワーマスター",
      "descriptions": "花",
      "url" : "https://pentamania.github.io/flower-master/",
    },
    {
      "name" : "未完成パズルゲーム",
      "url" : "https://pentamania.github.io/chem-puzzle/build/",
    },
    // {
    //   "name" : "SIIG Shadow",
    //   "descriptions": "影",
    //   "url" : "",
    // },
  ];
  window.ZATTA_LIST = ZATTA;

}());
