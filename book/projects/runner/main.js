if(!NSMscsBend) {
  var NSMscsBend = {};
}

NSMscsBend.runner = function(spec) {
  var that = {};
  
  that.bodyPart = function(spec) {
      var part = {};
      part.spec = spec;
      part.image = new Image();
      part.image.src = "body-parts.png";
      part.render = function(context, x, y) {
        context.drawImage(part.image, spec.x, spec.y, spec.width, spec.height, x, y, spec.width, spec.height);
      };
      return part;
  };
  
  that.renderLimb = function(spec) {
    var context = spec.context;
    context.save();
    if(spec.parts) {
      context.translate(spec.hingePoint.x, spec.hingePoint.y);
      context.rotate(spec.topJointAngle * Math.PI / 180);
      context.translate(-spec.parts[0].spec.width/2, 0);
      spec.parts[0].render(context, 0, 0);
      context.translate(0, spec.parts[0].spec.height);
      context.rotate(spec.lowerJointAngle * Math.PI / 180);
      spec.parts[1].render(context, 0, 0);
    } else {
      context.translate(spec.hingePoint.x, spec.hingePoint.y);
      context.beginPath();
      context.moveTo(0, 0);
      context.rotate(spec.topJointAngle * Math.PI / 180);
      context.lineTo(0, spec.length);
      context.translate(0, spec.length);
      context.rotate(spec.lowerJointAngle * Math.PI / 180);
      context.lineTo(0, spec.length);
      context.stroke();
    }
    context.restore();
  };
  
  that.render = function(context, angle) {
    var canvas = context.canvas;
    var center = {x: canvas.width/2, y: canvas.height/2};
    context.fillStyle = "blue";
    context.lineJoin = "round";
    context.lineCap = "round";
    context.lineWidth = 10;

    var head = that.bodyPart({x: 52, y: 2, width: 40, height: 50});
    var body = that.bodyPart({x: 100, y: 2, width: 40, height: 100});
    var upperLeg = that.bodyPart({x: 27, y: 5, width: 20, height: 45});
    var lowerLeg = that.bodyPart({x: 27, y: 56, width: 20, height: 45});
    var upperArm = that.bodyPart({x: 4, y: 5, width: 20, height: 45});
    var lowerArm = that.bodyPart({x: 4, y: 56, width: 20, height: 45});
    
    // Head
    context.save();
    context.translate(center.x, center.y);
    context.rotate(15 * Math.PI / 180);
    context.translate(-center.x, -center.y);
    // Simple rendering
    // context.beginPath();
    // context.ellipse(center.x, 50, 20, 25, 0, 0, Math.PI * 2);
    // context.fill();
    head.render(context, center.x-20, 25);
    // Arm back
    that.renderLimb({parts:[upperArm, lowerArm], context: context, hingePoint: {x: center.x, y: 90}, length: 45, topJointAngle: -angle, lowerJointAngle:-45});
    // Leg back
    that.renderLimb({parts:[upperLeg, lowerLeg], context: context, hingePoint: {x: center.x, y: 165}, length: 45, topJointAngle: angle-10, lowerJointAngle:Math.abs(angle/2)+15});
    // Body
    // Simple rendering
    // context.beginPath();
    // context.ellipse(center.x, 125, 20, 50, 0, 0, Math.PI * 2);
    // context.fill();
    body.render(context, center.x-20, 75);
    // Arm front
    that.renderLimb({parts:[upperArm, lowerArm], context: context, hingePoint: {x: center.x, y: 90}, length: 45, topJointAngle: angle, lowerJointAngle:-45});
    // Leg front
    that.renderLimb({parts:[upperLeg, lowerLeg], context: context, hingePoint: {x: center.x, y: 165}, length: 45, topJointAngle: -angle-10, lowerJointAngle:Math.abs(angle/2)+15});
    context.restore();
  };
  
  that.animate = function(context) {
    var start = new Date().getTime();
    var background = new Image();
    var loaded = false;
    background.addEventListener("load", function() {
      loaded = true;
    });
    background.src = "background.png";
    window.requestAnimationFrame(function() {
      var renderFrame = function() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        var now = new Date().getTime();
        var offset = ((now - start) / 5) % background.width;
        if(loaded) {
          context.drawImage(background, offset, 0, background.width-offset, background.height, 0, 0, background.width-offset, background.height);
          context.drawImage(background, 0, 0, offset, background.height, background.width-offset, 0, offset, background.height);
        }

        context.save();
        context.translate(0, 40);
        var speed = 10;
        var height = Math.sin(Math.PI/2 + ((now - start) / 100)) * 20;
        var angle = Math.sin(Math.PI/2 + ((now - start) / 200)) * (360/6);
        
        context.translate(0, height);
        that.render(context, angle);
        context.restore();
        var now = new Date().getTime();
        window.requestAnimationFrame(renderFrame);
      };
      renderFrame();
    });
  };
  
  return that;
};

(function(){
  window.addEventListener("load", function() {
    var runner = NSMscsBend.runner();
    var canvas = document.querySelector("#canvas");
    var context = canvas.getContext("2d");
    runner.animate(context);
  });
}());