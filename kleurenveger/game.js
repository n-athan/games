var cols, rows, blue, red, m, paint, guessesLeft, gameOver, go_i, canvas_size;
getSize();
var w = canvas_size/10;
var colors = 4;
//set canvas size
function getSize() {
    if (window.innerWidth < 450) {
        canvas_size = 400;
    } else if (window.innerWidth < 900) {
        let w_col = window.innerWidth * 0.7;
        if (w_col > window.innerHeight) {
            canvas_size = window.innerHeight - 250;
            console.log("portrait")
        } else {canvas_size = Math.floor(w_col)}
    } else {
        let w_col = document.getElementById("controls").offsetWidth;
        if (w_col > window.innerHeight) {
            canvas_size = window.innerHeight - 50
            console.log("portrait")
        } else {canvas_size = Math.floor(w_col)}
    }
}



function setup() {
    createCanvas(canvas_size+1, canvas_size+1);
    colorMode(HSL, 360, 100, 100);
    cols = floor(width / w);
    rows = floor(height / w);
    grid = newGrid(cols, rows);
    m = cols * rows;
    guessesLeft = colors-1;
    gameOver = false;
    paint = undefined;
    go_i = 0;

    //Setting the colors. Using a dynamic naming, to account for user set number of colors.    
    for (var i = 0; i < colors; i++) {
        window['color'+i] = -1; //initialize var
        
        // Add button : example html
        //<button onclick="paintColor(180)" aria-label="blue-paint-color" id="180" name="paint">Blue</button>
        let hue = i*(360/colors)
        html = `<button onclick="paintColor(${hue})" aria-label="${hue}-paint-color" id="${hue}" name="paint" style="color: hsl(${hue},50%,50%)"> Paint ${hue}</button>`;
        document.getElementById("paintButtons").insertAdjacentHTML("afterbegin",html);
    }
    //Add free guess button
    document.getElementById("paintButtons").insertAdjacentHTML("beforeend", 
    `<button onclick='freeColor()' aria-label='no-paint-color' id='free' name='paint'>Free ${guessesLeft}/${guessesLeft}</button>`);

    // color the field based on the recursive backtracking Maze Generation algorithm.
    // https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker
    // https://www.youtube.com/watch?v=8Ju_uxJ9v44 
   
    for (var i = 0; i < colors; i++) {
        window['color'+i] = grid[floor(random(m))]; 
        window['color'+i].hue = i*(360/colors); 
        window['color'+i+'_stack'] = []; 
    }

    while (grid.filter(function (i) { return i.colored == false }).length > 0) {

        for (var i = 0; i < colors; i++) {
            window['color'+i].colored = true;
            window['color'+i] = window['color'+i].colorUpdate(window['color'+i].hue, window['color'+i+'_stack']);
        }
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


