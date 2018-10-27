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
        document.getElementById("free").innerHTML = `Free ${guessesLeft}/${colors-1}`;
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
    // get user input
    w_input = document.getElementById("squares").value;
    colors_input = document.getElementById("colors").value;
    colors = constrain(colors_input,2,50);
    w = canvas_size/constrain(w_input,1,30);

    // reset buttons
    document.getElementById("paintButtons").innerHTML = "";
    
    // start new game
    setup();
}