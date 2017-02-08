
// firefox, safariで「戻る」した時に画面効果が残ってしまう対策
// http://www.gravity-works.jp/gravica/web/js/004374.html
window.onunload = function(){};

// create DOM link
PATHS.forIn(function(key, value) {
  //console.log([index, key, value].join(','));
  var link = document.createElement("a");
  link.href = value.url;
  link.target = "_self";
  link.innerHTML = '<span>'+key+"</span>";
  var li = document.createElement("li");
  li.appendChild(link);
  links.appendChild(li);
});

GAMES.forEach(function(value) {
  var holder = document.getElementById('game-links');
  var link = document.createElement("a");
  link.href = value.url;
  link.target = "_blank";
  link.innerHTML = '<span>'+value.name+"</span>";
  var li = document.createElement("li");
  li.appendChild(link);
  holder.appendChild(li);
});

window.onload = function() {
  PORTAL.start(PATHS);
};
