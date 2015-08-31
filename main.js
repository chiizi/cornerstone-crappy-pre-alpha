var main;
(main = (function() {
  window.scopeFuncExec = function(name) {
    return name(); // yay no more eval :3
  };
  
  var iteration = 0;
  
  var canvas = document.getElementById("frame");
  var ctx = canvas.getContext("2d");
  
  (window.onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  })();
  
  canvas.x = canvas.y = 0;
  
  
  
  var player = {
    x: 0,
    y: 0,
    xv: 0,
    yv: 0,
    xxl: 32,
    yxl: 32,
    xvmax: 8,
    yvmax: 8,
    width: 32,
    height: 32,
    color: "#000000" // "#00ff88"
  };
  
  var toggleKeys = {
    9: false
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
  
  var isColliding = function(obj1, obj2) {
    return (obj1.x + obj1.width < obj2.x || obj1.x > obj2.x + obj2.width) && (obj1.y +  obj1.height < obj2.y || obj1.y > obj2.y + obj2.height);
  };
  
  var deCollide = function(obj1, obj2) {
    // do things
  };
  
  var constrain = function(obj1, obj2) {
    obj1.x = Math.min(Math.max(obj1.x, 0), obj2.width - obj1.width);
    obj1.y = Math.min(Math.max(obj1.y, 0), obj2.height - obj1.height);
    return obj1;
  };
  
  var update = function() {
    // add key toggling code
    
    if (37 in keysDown) { // left
      player.xv -= player.xxl / 60;
    } else if (39 in keysDown) { // right
      player.xv += player.xxl / 60;
    } else {
      player.xv = Math.floor((player.xv + (player.xv < 0)) / 1.2);
    }
    if (38 in keysDown) { // up
      player.yv -= player.yxl / 60;
    } else if (40 in keysDown) { // down
      player.yv += player.yxl / 60;
    } else {
      player.yv = Math.floor((player.yv + (player.yv < 0)) / 1.2);
    }
    
    player.xv = Math.max(-player.xvmax, Math.min(player.xv, player.xvmax)); console.log(player.xv);
    player.yv = Math.max(-player.yvmax, Math.min(player.yv, player.yvmax)); console.log(player.yv);
    
    player.x += player.xv;
    player.y += player.yv;
    
    constrain(player, canvas)
  };
  
  return (function() {
    update();
    
    render();
    
    iteration++;
    window.requestAnimationFrame(main);
  });
})())();
