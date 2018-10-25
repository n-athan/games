function Cell(x,y) {
    this.index = index(x,y);
    this.x = x;
    this.y = y;
    this.hue, this.similarNeighbors;
    this.colored = false;
    this.revealed = false;
    
    this.show = function() {
        var x = this.x*w;
        var y = this.y*w;
        if (this.colored && this.revealed) {
            fill(this.hue,50,50);
            rect(x,y,w,w); 
            if (this.similarNeighbors != 8) {
                textAlign(CENTER);
                fill(249,30,10);
                text(this.similarNeighbors, x + w*0.5 ,y + w*0.66);
            }
        } else {
            fill(21,9,92);
            stroke(249,30,10);
            rect(x,y,w,w);
        }
    };

    this.getFreeNeighbor = function() {
        let neighbors = [];

        for (var i = -1; i < 2; i ++) {
            for (var j = -1; j < 2; j ++) {
                let x = this.x + i;
                let y = this.y + j;
                if (index(x,y) != this.index) {
                    let cell = grid[index(x,y)];
                    if (cell && !cell.colored) {
                        neighbors.push(cell)
                    }
                }
            }
        }

        if (neighbors.length > 0) {
            const r = floor(random(neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }
    };

    this.colorUpdate = function(hue,stack) {
        let next = this.getFreeNeighbor();
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
        let c = 0;
        for (var i = -1; i < 2; i ++) {
            for (var j = -1; j < 2; j ++) {
                let x = this.x + i;
                let y = this.y + j;
                if (index(x,y) != this.index) {
                    let cell = grid[index(x,y)];
                    if (cell && cell.hue == this.hue) {
                       c++;
                    };
                };
            };
        };
        return c;
    };

    this.contain = function(x,y) {
        return (x >= this.x*w && 
            x < this.x*w + w && 
            y >= this.y*w  && 
            y < this.y*w + w) 
    }

    this.floodReveal = function() {
        for (var i = -1; i < 2; i ++) {
            for (var j = -1; j < 2; j ++) {
                let x = this.x + i;
                let y = this.y + j;
                if (index(x,y) != this.index) {
                    let cell = grid[index(x,y)];
                    if (cell && cell.revealed == false) {
                       cell.revealed = true;
                       if (cell.similarNeighbors == 8) {
                           cell.floodReveal();
                       }
                    };
                };
            };
        };
    }


}

function newGrid(cols,rows) {
    grid = [];
    for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
            var cell = new Cell(x,y);
            grid.push(cell);
        }
    }
    return grid;
}

function index(i,j) {
    if ( i < 0 || j < 0 || i > cols-1 || j > rows - 1){
        return -1
    }
    return  i + j * cols;
}

function invertHSL(h,s,l) {
    rh = (180 + h) % 360;
    rl = 100 - l;
    return [rh,s,rl];
}