var core = (function() {
  return function(fn) {
    return fn();
  };
})();

core.add = function(src) {
  var http = new XMLHttpRequest();
  http.open("HEAD", src, true);
  http.send();
  var script = document.createElement("script");
  script.src = src;
  document.body.appendChild(script);
};

core.add("core/cfg.js");
