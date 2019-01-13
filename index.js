
// firefox, safariで「戻る」した時に画面効果が残ってしまう対策
// http://www.gravity-works.jp/gravica/web/js/004374.html
window.onunload = function(){};

// Ready enchant field
window.onload = function() {
  PORTAL.start(SNS_LINK_LIST);
  var bg = document.getElementById('enchant-background');
  bg.style.backgroundImage = "url('./assets/images/bg-space02_repX.jpg')";
  bg.style.backgroundRepeat = "repeat-x";

  // 範囲を中央に寄せる
  var stage = document.getElementById('enchant-stage');
  stage.style.margin = "0 auto";
};

// create SNS DOM link
SNS_LINK_LIST.forIn(function(key, value) {
  //console.log([index, key, value].join(','));
  var link = document.createElement("a");
  link.href = value.url;
  link.target = "_self";
  link.innerHTML = '<span>'+key+"</span>";
  var li = document.createElement("li");
  li.appendChild(link);
  links.appendChild(li);
});

riot.compile(function() {
  riot.mount('#gallery-game', 'gallery', {heading: "ゲーム", items: GAME_LIST});
  riot.mount('#gallery-application', 'gallery', {heading: "ツール", items: APPLICATION_LIST});
  riot.mount('#gallery-zatta', 'gallery', { heading: "ソノタ", items: ZATTA_LIST });
});