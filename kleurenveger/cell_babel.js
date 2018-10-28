// adjusted to ES5 with https://babeljs.io/en/repl.html

"use strict";

function Cell(x, y) {
  this.index = index(x, y);
  this.x = x;
  this.y = y;
  this.hue, this.similarNeighbors;
  this.colored = false;
  this.revealed = false;

  this.show = function() {
    var x = this.x * w;
    var y = this.y * w;
    if (this.colored && this.revealed) {
      fill(this.hue, 50, 50);
      rect(x, y, w, w);
      if (this.similarNeighbors != 8) {
        textAlign(CENTER);
        fill(249, 30, 10);
        text(this.similarNeighbors, x + w * 0.5, y + w * 0.66);
      }
    } else {
      fill(21, 9, 92);
      stroke(249, 30, 10);
      rect(x, y, w, w);
    }
  };

  this.getFreeNeighbor = function() {
    var neighbors = [];

    for (var i = -1; i < 2; i++) {
      for (var j = -1; j < 2; j++) {
        var _x = this.x + i;
        var _y = this.y + j;
        if (index(_x, _y) != this.index) {
          var cell = grid[index(_x, _y)];
          if (cell && !cell.colored) {
            neighbors.push(cell);
          }
        }
      }
    }

    if (neighbors.length > 0) {
      var r = floor(random(neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  };

  this.colorUpdate = function(hue, stack) {
    var next = this.getFreeNeighbor();
    if (next) {
      next.colored = true;
      stack.push(this);
      next.hue = hue;
      return next;
    } else if (stack.length > 0) {
      next = stack.pop();
      return next;
    } else return this;
  };

  this.countNeighbors = function() {
    var c = 0;
    for (var i = -1; i < 2; i++) {
      for (var j = -1; j < 2; j++) {
        var _x2 = this.x + i;
        var _y2 = this.y + j;
        if (index(_x2, _y2) != this.index) {
          var cell = grid[index(_x2, _y2)];
          if (cell && cell.hue == this.hue) {
            c++;
          }
        }
      }
    }
    return c;
  };

  this.contain = function(x, y) {
    return (
      x >= this.x * w &&
      x < this.x * w + w &&
      y >= this.y * w &&
      y < this.y * w + w
    );
  };

  this.floodReveal = function() {
    for (var i = -1; i < 2; i++) {
      for (var j = -1; j < 2; j++) {
        var _x3 = this.x + i;
        var _y3 = this.y + j;
        if (index(_x3, _y3) != this.index) {
          var cell = grid[index(_x3, _y3)];
          if (cell && cell.revealed == false) {
            cell.revealed = true;
            if (cell.similarNeighbors == 8) {
              cell.floodReveal();
            }
          }
        }
      }
    }
  };
}

