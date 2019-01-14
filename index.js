
// firefox, safariで「戻る」した時に画面効果が残ってしまう対策
// http://www.gravity-works.jp/gravica/web/js/004374.html
window.onunload = function(){};

// Setup enchant field
document.addEventListener('DOMContentLoaded', function (event) {
  var bg = document.getElementById('enchant-background');
  bg.style.height = SCREEN_HEIGHT + "px";
  bg.style.backgroundRepeat = "repeat-x";
  bg.style.backgroundImage = "url('./assets/images/bg-space02_repX.jpg')";

  // 中央に寄せる
  var stage = document.getElementById('enchant-stage');
  stage.style.margin = "0 auto";

  PORTAL.start(SNS_LINK_LIST);
});

riot.compile(function() {
  riot.mount('link-list', { items: SNS_LINK_LIST });
  riot.mount('#gallery-game', 'gallery', {heading: "ゲーム", items: GAME_LIST});
  riot.mount('#gallery-application', 'gallery', {heading: "ツール", items: APPLICATION_LIST});
  riot.mount('#gallery-zatta', 'gallery', { heading: "ソノタ", items: ZATTA_LIST });
});