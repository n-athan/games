let state;
//states: playerNoCardFlipped, playerOneCardFlipped, playerTwoCardFlipped, playerPlayed, botPlayed. 
let initialMemory = document.getElementById("initialMemory").value;
let forgetfulness = document.getElementById("forgetfulness").value;
let botMemory = [];
let allCards;
let alphabet = ("abcdefghijklmnopqrstuvwxyz").toUpperCase().split("");

setup(24);

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
    allCards = shuffle(newSet(n));
    let div = document.getElementById("field");
    for (var c = 0; c < allCards.length; c++) {
        div.insertAdjacentHTML('beforeend', allCards[c].toHTML());
    }
    state = "playerNoCardFlipped"
}

//click on a card
function cardClick(id) {
    //testing stateless
    // console.log(id);
    // let ct = document.getElementById(id).firstChild;
    // ct.classList.add("open");
    // allCards.find(x => x.id === id).memorize();

    //get state of game
    if (state == "playerNoCardFlipped") {
        //flip clicked card
        let c = document.getElementById(id).firstChild;
        c.classList.add("open");
        state = "playerOneCardFlipped";
        allCards.find(x => x.id === id).memorize();
    } else if (state == "playerOneCardFlipped") {
        //flip clicked card
        let c = document.getElementById(id).firstChild;
        c.classList.add("open");
        state = "playerTwoCardFlipped";
        allCards.find(x => x.id === id).memorize();
    } else if (state == "playerTwoCardFlipped") {
        // unflip all cards
        let cards = document.getElementsByClassName("card");
        for (var c = 0; c < cards.length; c++) {
            cards[c].firstChild.classList.remove("open");
        }
        // state = "playerPlayed";
        state = "playerNoCardFlipped";
        forget();
    } else if (state == "botPlayed") {
        // unflip all cards
        let cards = document.getElementsByClassName("card").firstChild;
        for (var c = 0; c < cards.length; c++) {
            cards[c].firstChild.classList.remove("open");
        }
        state = "playerNoCardFlipped";
        forget();
    }
}

