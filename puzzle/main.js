SlidePuzzle = {};
SlidePuzzle.model = function() {
  var tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
  var home = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
  return {
    slide: function(tile) {
      if(tiles[tile] === 0) return;
      if(tiles[tile+1] === 0) {
        tiles[tile+1] = tiles[tile];
      } else if(tiles[tile-1] === 0) {
        tiles[tile-1] = tiles[tile];
      } else if(tiles[tile+4] === 0) {
        tiles[tile+4] = tiles[tile];
      } else if(tiles[tile-4] === 0) {
        tiles[tile-4] = tiles[tile];
      } else return;
      tiles[tile] = 0;
    },
    get: function(tile) {
      return tiles[tile];
    },
    isHome: function() {
      for(var tile in tiles) {
        if(tiles[tile] !== home[tile]) {
          return false;
        }
      }
      return true;
    },
    reset: function() {
      for(var tile in home) {
        tiles[tile] = home[tile];
      }
    }
  }
};

SlidePuzzle.view = function(canvas, model) {
  var elements = [];
  var context = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;
  var that = {
    display: function() {
      context.clearRect(0, 0, width, height);
      context.strokeRect(0, 0, width, height);
      var tileWidth = width/4;
      var tileHeight = height/4;
      var i = 0;
      for(var y=0; y<height; y+=height/4) {
        for(var x=0; x<width; x+=width/4) {
          context.strokeRect(x, y, tileWidth, tileHeight);
          var element = {
            index: i,
            tile: model.get(i),
            top: y,
            left: x,
            width: tileWidth,
            height: tileHeight,
          };
          elements.push(element);
          if(element.tile !== 0) {
            context.fillText(element.tile, x+tileWidth/2, y+tileHeight/2);
          }
          i++;
        }
      }
      if(model.isHome()) {
        context.fillText('Solved!', tileWidth/10, tileHeight/10);
      }
    },
    onclick: function(event) {
      var x = event.pageX - canvas.offsetLeft;
      var y = event.pageY - canvas.offsetTop;
      var refresh = false;
      elements.forEach(function(element) {
        if(y > element.top
            && x > element.left
            && x < element.left + element.width
            && y < element.top + element.height) {
          model.slide(element.index);
          refresh = true;
        }
      });
      if(refresh) {
        that.display();
      }
      return true;
    },
  };
  return that;
};

window.onload = function() {
  var canvas = document.querySelector("#puzzle");
  var model = SlidePuzzle.model();
  var view = SlidePuzzle.view(canvas, model);
  canvas.onclick = view.onclick;
  view.display();
}

