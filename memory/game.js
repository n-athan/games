let state;
//states: playerNoCardFlipped, playerOneCardFlipped. 
let initialMemory = document.getElementById("initialMemory").value;
let forgetfulness = document.getElementById("forgetfulness").value;
let botMemory = [];
let allCards;
let alphabet = ("abcdefghijklmnopqrstuvwxyz").toUpperCase().split("");
let scorePlayer = 0;
let scoreBot = 0;
let flipped = [];
let ignoreMouse = false;
let pairsLeft;

setup(12);

// random function, returns true $percent of the time, else false
function prc(percent) {
    let a = Math.random();
    return (a < percent/100);
}

//remove function
function remove(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
}

//start a game 
function setup(n) {
    if (n%2 == 1) {alert("there must be an even number of cards to start a game"); return false}
    pairsLeft = n/2;
    allCards = shuffle(newSet(n));
    let div = document.getElementById("field");
    for (var c = 0; c < allCards.length; c++) {
        div.insertAdjacentHTML('beforeend', allCards[c].toHTML());
    }
    state = "playerNoCardFlipped"
}

//click on a card
function cardClick(id) {
    if (ignoreMouse){return}
    //testing stateless
    // console.log(id);
    // let ct = document.getElementById(id).firstChild;
    // ct.classList.add("open");
    // allCards.find(x => x.id === id).memorize();

    //get state of game
    if (state == "playerNoCardFlipped") {
        flip(id);
        // find card object that matches flipped DOM-element, to memorize.
        let f = allCards.find(x => x.id === id);
        flipped.push(f);
        state = "playerOneCardFlipped";        
        f.memorize();

    } else if (state == "playerOneCardFlipped") {
        //ensure you don't click on same card twice.
        if (id == flipped[0].id) {return}
        flip(id);
        // find card object that matches flipped DOM-element, to memorize.
        let f = allCards.find(x => x.id === id);
        f.memorize();
        flipped.push(f);
        checkSimilar(); //changes state of game if pair is flipped.
        if (state === "playerOneCardFlipped") {
            ignoreMouse = true;
            setTimeout(function() {
                unflip();
                state = "playerNoCardFlipped"; //remove for botTurn after testing.
                ignoreMouse = false;
            },1000);            
            forget();
            // botTurn();
        };
    };
    console.log(state);
    // } else if (state == "botPlayed") {
    //     setTimeout(unflip(),1000);
    //     state = "playerNoCardFlipped";
    //     forget();
    // }
}

function botTurn() {
    //if known pair in botMemory > play pair.
    //else turn unkown card and check memory for pair.
        //if known pair > play pair.
        //else play unknown card. 
    for (let i = 0; i < botMemory.length; i++) {
        let j = botMemory[i];
        let p = botMemory.find(x => (x.pair === j.pair)&&(x !== j));
        if (p) {
            let foundPair = [botMemory[i],p];
            // for (let k = 0; k < 2; k++){
            //     flip(foundPair[k].id);
            //     flipped.push(foundPair[k]);
            // } 
            // checkSimilar();
            // setTimeout(unflip(),300);
            break
        }
    }
    state = "playerNoCardFlipped";
    forget();
}

function checkSimilar() {
    let a = flipped[0];
    let b = flipped[1];
    if (a.pair == b.pair) {
        if (state.indexOf("player") !== -1) {
            scorePlayer+=1;
            ignoreMouse= true;
            setTimeout(function() {
                removePair(a,b);
                state = "playerNoCardFlipped";
                ignoreMouse = false;
            },500);    
            updateScore("Player", scorePlayer);
        } else {
            scoreBot+=1;
            state == "botTurn"; 
            updateScore("Bot", scoreBot)            
            //add function to start bots turn
        }
        pairsLeft -= 1;
        if (pairsLeft == 0) {gameOver();}          
    } //else do nothing
    flipped = [];
}

function updateScore(person, score) {
    let p = document.getElementById(`score${person}`);
    p.innerHTML = person + ": " + score;
}

function gameOver() {
    alert(`Game Over. \n Score player: ${scorePlayer} \n Score bot: ${scoreBot}`);
}
