var main;
main = (function() {
  window.mainScopeExec = function(name) {
    return name(); // yay no more eval :3
  };
  
  var canvas = document.getElementById("frame");
  var ctx = canvas.getContext("2d");
  
  (window.onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  })();
  
  canvas.x = canvas.y = 0;
  
  var iteration = 0;
  
  var keysDown = {};
  
  addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
  }, false);
  addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
  }, false);
  
  return function() {
    update();
    
    render();
    
    iteration++;
    window.requestAnimationFrame(main);
  };
})();
