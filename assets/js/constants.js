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
      "descriptions": "＊花＊",
      "url" : "https://pentamania.github.io/flower-master/",
    },
    {
      "name" : "未完成パズルゲーム",
      "url" : "https://pentamania.github.io/chem-puzzle/build/",
    },
    // 実行時、enchantの処理がおかしくなるため、保留
    // {
      // "name" : "幸子",
      // "url" : "javascript:(function(){var c='color:#FFE5FF;background:#b6c2e9;font-size:.6em;vertical-align:middle;',d=document.body.innerHTML,_p='%E3%82%AB%E3%83%AF%E3%82%A4%E3%82%A4%EF%BC%8A',_s='%EF%BC%8A%E3%82%AB%E3%83%AF%E3%82%A4%E3%82%A4',p='<span style='+c+'>'+_p+'</span>',s='<span style='+c+'>'+_s+'</span>',n=d.match(/%E3%81%95%E3%81%A1%E3%81%93|%E3%82%B5%E3%83%81%E3%82%B3|%E3%81%95%E3%81%A1%E5%AD%90|%E5%B9%B8%E5%AD%90|%E8%BC%BF%E6%B0%B4%E5%B9%B8%E5%AD%90|%E3%81%93%E3%81%97%E3%81%BF%E3%81%9A%E3%81%95%E3%81%A1%E3%81%93|%E3%82%B3%E3%82%B7%E3%83%9F%E3%82%BA%E3%82%B5%E3%83%81%E3%82%B3|%E3%81%95%E3%81%A3%E3%81%A1%E3%82%93|%E3%81%95%E3%81%A3%E3%81%A1%E3%82%83%E3%82%93|%E3%81%95%E3%81%A3%E3%81%A1%E3%83%BC/mg),u,i,l;if(n){for(i=0,l=n.length;i<l;i++){u=new RegExp(n[i]+'(?!'+s+')');d=d.replace(u,p+n[i]+s);}document.body.innerHTML=d;}})();",
      // "url" : 'http://pentamania.hatenablog.com/entry/2015/12/10/201342',
      // "descriptions": "ブックマークレット",
    // },
    {
      "name" : "SIIG Shadow",
      "descriptions": "† 影 †",
      // https通信はIE, Edgeでは無効
      "url" : "http://www47.atpages.jp/ptmania/works/shadow",
    },
  ];
  window.ZATTA_LIST = ZATTA;

}());
