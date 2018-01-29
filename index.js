
// firefox, safariで「戻る」した時に画面効果が残ってしまう対策
// http://www.gravity-works.jp/gravica/web/js/004374.html
window.onunload = function(){};

// Ready enchant field
window.onload = function() {
  PORTAL.start(SNS_LINK_LIST);
};

// create DOM link
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
  riot.mount('#gallery-game', 'gallery', {heading: "#ゲーム", items: GAME_LIST});
  riot.mount('#gallery-application', 'gallery', {heading: "#ツール", items: APPLICATION_LIST});
  riot.mount('#gallery-zatta', 'simple-gallery', {heading: "#ソノタ", items: ZATTA_LIST});
});