var cols, rows, blue, red, m, paint, guessesLeft, gameOver, go_i;
var w = 40;
var colored = [];


function setup() {
    createCanvas(401, 401);
    colorMode(HSL, 360, 100, 100);
    cols = floor(width / w);
    rows = floor(height / w);
    grid = newGrid(cols, rows);
    m = cols * rows;
    guessesLeft = 3;
    gameOver = false;
    paint = undefined;
    go_i = 0;


    // color the field based on the recursive backtracking Maze Generation algorithm.
    // https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker
    // https://www.youtube.com/watch?v=8Ju_uxJ9v44 
    blue = grid[floor(random(m))];
    blue.hue = 180;
    blue_stack = [];

    red = grid[floor(random(m))];
    red.hue = 0;
    red_stack = [];

    green = grid[floor(random(m))];
    green.hue = 90;
    green_stack = [];

    purple = grid[floor(random(m))];
    purple.hue = 270;
    purple_stack = [];

    while (grid.filter(function (i) { return i.colored == false }).length > 0) {

        blue.colored = true;
        blue = blue.colorUpdate(180, blue_stack);

        red.colored = true;
        red = red.colorUpdate(0, red_stack);

        green.colored = true;
        green = green.colorUpdate(90, green_stack);

        purple.colored = true;
        purple = purple.colorUpdate(270, purple_stack);
    }
    // end of making the colored field. 

    // count the neighbors with the same color
    for (var i = 0; i < grid.length; i++) {
        grid[i].similarNeighbors = grid[i].countNeighbors();
    }
}

// actualy draws the frames
function draw() {
    background(21, 9, 92);
    for (i in grid) {
        grid[i].show();
    }

    if (gameOver && go_i < grid.length) {
        grid[go_i].revealed = true;
        go_i ++;
    }
}


function mousePressed() {
    for (i in grid) {
        if (grid[i].contain(mouseX, mouseY)) {
            rev = grid[i].revealed;
            grid[i].revealed = true;
            if (grid[i].similarNeighbors == 8) {
                grid[i].floodReveal();
            }
            if (!paint) { //Free guess
                paintColor(grid[i].hue);
            } else if (paint != grid[i].hue && rev == false) {
                //GAME OVER
                gameOver = true;
            }
        }
    }
}

function paintColor(hue) {
    paint = hue;
    let buttons = document.getElementsByName('paint');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = `hsla(249, 9%, 92%,0.3)`;
        buttons[i].style.fontWeight = 400;
    }
    let b = document.getElementById(hue);
    b.style.backgroundColor = `hsla(${hue}, 9%, 50%,0.9)`;
    b.style.fontWeight = 800;
}

function freeColor() {
    if (guessesLeft > 0) {
        paint = undefined;
        guessesLeft --; 
        document.getElementById("free").innerHTML = `Free ${guessesLeft}/3`;
        let buttons = document.getElementsByName('paint');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.backgroundColor = `hsla(249, 9%, 92%,0.3)`;
            buttons[i].style.fontWeight = 400;
        }
        document.getElementById("free").style.backgroundColor = `hsla(60, 9%, 92%,0.9)`;
        document.getElementById("free").style.fontWeight = 800;
    } else {
        document.getElementById("free").innerHTML = '-';
    }
}

function refresh() {
    w = 400/document.getElementById("squares").value;
    setup();

}