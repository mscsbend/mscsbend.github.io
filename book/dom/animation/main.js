(function(){
  window.addEventListener("load", function() {
    var bell = document.querySelector("#bell");
    var context = bell.getContext("2d");
    var image = new Image();
    image.addEventListener("load", function() {
      context.drawImage(image, 0, 0);
    });
    image.src = "https://cdn0.iconfinder.com/data/icons/IS_Christmas/512/bells.png";
    var sound = new Audio("http://www.freesound.org/data/previews/30/30157_129090-lq.mp3");
    bell.addEventListener("click", function() {
      var start = new Date().getTime();
      sound.play();
      window.requestAnimationFrame(function() {
        var renderFrame = function() {
          var now = new Date().getTime();
          context.clearRect(0, 0, context.canvas.width, context.canvas.height);
          context.save();
          var rotation = Math.sin((now - start) / 100) * (Math.PI/4);
          context.translate(context.canvas.width/2, context.canvas.height/2);
          context.rotate(rotation);
          context.translate(-context.canvas.width/2, -context.canvas.height/2);
          context.drawImage(image, 0, 0);
          context.restore();
          var now = new Date().getTime();
          if(now - start < sound.duration * 1000) {
            window.requestAnimationFrame(renderFrame);
          }
        };
        renderFrame();
      });
    });
  });
}());
