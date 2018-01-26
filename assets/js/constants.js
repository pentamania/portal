
/**
 * params
 */
//var SCREEN_WIDTH = (windowWidth > 480) ? 768 : 360;
var SCREEN_WIDTH = window.innerWidth - 20; //画面いっぱいだと横スクロールしてしまうため
var SCREEN_HEIGHT = 280;
var SCREEN_CENTER_X = SCREEN_WIDTH / 2;
var SCREEN_CENTER_Y = SCREEN_HEIGHT / 2;
var PLAYER_FORCE = 3.2;
var DEBUG_MODE = false;
// DEBUG_MODE = true;

var WALL_WIDTH = 2;
var ROTATING_BAR_LENGTH = (window.innerWidth > 480) ? SCREEN_HEIGHT*0.7 : SCREEN_HEIGHT*0.4;


/**
 * アセットとか
 */
var FOX_LINES = [
  "お腹すいた...",
  "だるい...",
  "ぷかぷか...",
  "300点",
  "あっ、UFO...",
  "十字キーでぼくを操作できるの、知ってた？",
  "きゅー",
];
var ASSETS = {
  spritemap: 'assets/images/spritesheet.json',
  icons: 'assets/images/spritesheet.png',
  fox: 'assets/images/fox.png',
};

;(function(){
  var assetPath = "./assets/images/works-thumbnail/";

  // キー名はスプライトシート情報と連動しているため、変更の際は注意する
  var linkList = {
    blog: {
      url: "http://pentamania.hatenablog.com/",
      label: "BLOG",
      // frameIndex: 0
    },
    // deviantArt: {
    //   url: "http://pentamania.deviantart.com/",
    //   frameIndex: 1
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
  };
  window.SNS_LINK_LIST = linkList;

  var GAME_LIST = [
    {
      "name": "リズミックレイン",
      "descriptions": "シンプルな雰囲気音ゲー",
      "imagepath": assetPath+"rrain.gif",
      "url": "https://pentamania.github.io/rhythmic-rain/game/dist"
    },
    {
      "name": "BBEMYBABYゲーム",
      "descriptions": "例のあのクソコラを再現",
      "imagepath": assetPath+"bbmb-game.gif",
      "url": "https://pentamania.github.io/bbemybaby-game/"
    },
    {
      "name": "ナズーリン・ザ・ダウザー",
      "descriptions": "東方二次創作、モノ探しミニゲーム",
      "imagepath": assetPath+"naz-game.gif",
      "url": "http://9leap.net/games/4692"
    },
    {
      "name": "シマウマちゃん探しゲーム",
      "descriptions": "けものフレンズ二次創作（？）ミニゲーム",
      "imagepath": assetPath+"shimaumachan-game.gif",
      "url": "https://pentamania.github.io/find-shimauma-chan"
    },
    {
      "name": "(仮)",
      "descriptions": "なんか神ゲーが追加される予定です",
      "url": ""
    },
  ];
  window.GAME_LIST = GAME_LIST;

  var APPLICATION_LIST = [
    {
      "name": "PxB Editor",
      "descriptions": "某クロスでビーツな音ゲー風の譜面が作れるデスクトップアプリケーション",
      "imagepath": assetPath+"pxb-editor.gif",
      "url": "http://pentamania.hatenablog.com/entry/2017/03/16/155547"
    },
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
      "name" : "デレマスアイドル紹介相関図",
      "descriptions": "第６回シンデレラガールズ総選挙のアレ",
      "url" : "http://pentamania.github.io/imcg-idol-shoukai/",
    },
    {
      "name" : "フラワーマスター",
      "descriptions": "＊花＊",
      "url" : "https://pentamania.github.io/flower-master/",
    },
    {
      "name" : "未完成パズルゲーム",
      "descriptions": "一週間で作ろうとした",
      "url" : "https://pentamania.github.io/chem-puzzle/build/",
    },
    {
      "name" : "SIIG Shadow",
      "descriptions": "† 影 †",
      // https通信はIE, Edgeでは無効
      "url" : "http://www47.atpages.jp/ptmania/works/shadow",
    },
  ];
  window.ZATTA_LIST = ZATTA;

}());
