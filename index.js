
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

window.onload = function() {
  PORTAL.app(PATHS);
};
