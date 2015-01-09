if(!NSMscsBend) {
  if(!Math.g) {
    Math.g = -32.185;
    Math.toRadians = function(degrees) {
      return degrees * Math.PI / 180;
    };
  }
  var NSMscsBend = {};
  NSMscsBend.Arrow = function(spec) {
    var that = {};
    var context = spec.context;
    var x0 = 50;
    var y0 = 50;
    that.angle = spec.angle || 0;
    that.x = 0;
    that.y = 0;
    that.currentAngle = 0;
    var renderArrow = function(context) {
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(50, 0);
      context.lineTo(45, 2);
      context.moveTo(50, 0);
      context.lineTo(45, -2);
      context.moveTo(5, 0);
      context.lineTo(0, 2);
      context.moveTo(5, 0);
      context.lineTo(0, -2);
      context.stroke();
    };
    that.render = function() {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.save();
      context.translate(x0 + that.x, context.canvas.height-that.y-y0);
      context.rotate(-that.currentAngle);
      renderArrow(context);
      context.restore();
    };
    that.xt = function(t) {
      return that.speed * t * Math.cos(Math.toRadians(that.angle));
    };
    that.yt = function(t) {
      return that.speed * t * Math.sin(Math.toRadians(that.angle)) + ((Math.g/2) * Math.pow(t, 2));
    };
    that.vxt = function(t) {
      return that.speed * Math.cos(Math.toRadians(that.angle));
    };
    that.vyt = function(t) {
      return that.speed * Math.sin(Math.toRadians(that.angle)) + (Math.g*t);
    };
    that.at = function(t) {
      return Math.atan(that.vyt(t)/that.vxt(t));
    };
    that.shoot = function(spec) {
      var start = new Date().getTime();
      that.speed = spec.speed;
      window.requestAnimationFrame(function() {
        var animate = function() {
          var now = new Date().getTime();
          var t = (now - start) / 1000;
          that.x = that.xt(t);
          that.y = that.yt(t);
          that.currentAngle = that.at(t);
          if(that.y >= 0) {
            that.render();
            window.requestAnimationFrame(animate);
          }
        };
        animate();
      });
    };
    that.render();
    return that;
  };
}
(function(){
  window.addEventListener("load", function() {
    var canvas = document.querySelector("#game-canvas");
    var context = canvas.getContext("2d");
    var arrow = NSMscsBend.Arrow({context: context});
    arrow.angle = 25;
    arrow.shoot({speed: 150});
  });
}());