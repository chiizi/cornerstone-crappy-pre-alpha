var main;
(main = (function() {
  window.scopeEval = function(name) {
    return eval(name); // deliberate security vulnerability to allow people to execute code within the otherwise impenetrable main function's scope without changing any code
  };
  
  var iteration = 0;
  
  var canvas = document.getElementById("frame");
  var ctx = canvas.getContext("2d");
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  canvas.x = canvas.y = 0;
  
  var player = {
    x: 0,
    y: 0,
    width: 32,
    height: 32,
    speed: 256,
    color: "#00ff88"
  };
  
  var keysDown = {};

  addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
  }, false);
  addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
  }, false);
  
  var draw = function(obj) {
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
  };
  
  var render = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    draw(player);
  };
  
  var constrain = function(obj1, obj2) {
    obj1.x = Math.min(Math.max(obj1.x, 0), obj2.width - obj1.width);
    obj1.y = Math.min(Math.max(obj1.y, 0), obj2.height - obj1.height);
    return obj1;
  };
  
  var update = function() {
    if (38 in keysDown) { // up
      player.y -= player.speed / 60;
    }
    if (40 in keysDown) { // down
      player.y += player.speed / 60;
    }
    if (37 in keysDown) { // left
      player.x -= player.speed / 60;
    }
    if (39 in keysDown) { // right
      player.x += player.speed / 60;
    }
    
    player = constrain(player, canvas);
  };
  
  return (function() {
    update();
    
    render();
    
    iteration++;
    window.requestAnimationFrame(main);
  });
})())();
