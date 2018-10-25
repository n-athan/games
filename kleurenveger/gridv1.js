// Grid heeft:
// - #rijen en #kolommen
// - 4 verz. van cellen met een bepaalde kleur
// - functies als erop wordt geklikt. 

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

function setColors() {
//   1.  Make the initial cell the current cell and mark it as $color
    var cur_blue = init[0];
    var cur_green = init[1];
    var cur_red = init[2];
    var cur_purple = init[3];

    blue = [cur_blue];
    green = [cur_green];
    red = [cur_red];
    purple = [cur_purple];
    // colored = [];
    colored = blue.concat(green.concat(red.concat(purple)));

    // 2.  While there are uncolored cells
    while(colored.length < grid.length-cols) {
        b = step(cur_blue,blue);
        cur_blue = b[0];
        blue = b[1];
        g = step(cur_green,green);
        cur_green = g[0];
        green = g[1];
        r = step(cur_red,red);
        cur_red = r[0];
        red = r[1];
        p = step(cur_purple, purple);  
        cur_purple = p[0];
        purple = p[1];
    }
    console.log(uniq(colored));
    console.log(green);
}

// Cell heeft:
// - locatie (index in grid)
// - kleur (locatie in welke kleurverzameling).
// - cijfer (nummer van buren met zelfde kleur)
// - zichtbaarheid (telkens checken)

function Cell(x,y) {
    this.index = x*w + y;
    this.x = x;
    this.y = y;
    this.r = 0;
    
    this.show = function() {
        if (red.includes(this.index)) {
            this.r = 0;
        } else if (green.includes(this.index)) {
            this.r = 120;
        } else if (blue.includes(this.index)) {
            this.r = 210;
        } else if (purple.includes(this.index)) {
            this.r = 270;
        } else {
            this.r = 60;
        }

        var x = this.x*w;
        var y = this.y*w;
        fill(this.r,50,50);
        stroke(249,30,10);
        rect(x,y,w,w);
    
    }
}

function cellNeighbours(index,cols) {
    temp = [index-cols-1, index-cols, index-cols+1,
            index-1,                  index+1,
            index+cols-1, index+cols, index+cols+1];
    let n = [];
    for (i of temp) {
        (i >= 0 && i < w*cols)?n.push(i):false;
    }
    return n;
}

function step(current,stack) {
    c = current;
    s = stack;
    let n = cellNeighbours(c,cols); 
    let uncol = [];
    for (var j = 0; j < n.length ; j++) {
        if (!colored.includes(n[j])) {
            uncol.push(n[j]);
        };
    }
    // 1. If the current cell has any neighbours which have not been colored
    if (uncol.length > 0) {
    next = uncol[floor(random(uncol.length))];
    s.push(next);
    colored.push(next);
    } else if (s.length > 0) {
        // 2. Else if stack is not empty
        next = s.pop();
    };
    return [next,s];
}


function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })
}
