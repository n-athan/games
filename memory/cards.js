let colorOffset = Math.floor(Math.random()*40);

function Card(i,p) {
    this.id = i;
    this.pair = p;
    this.color = (p*55+colorOffset)%360;
    this.letter = alphabet[p];

    this.memorize = function() {
        if (prc(initialMemory)&&botMemory.indexOf(this) == -1) {
            console.log(this.id, " memorized")
            botMemory.push(this);
        } else console.log("card not memorized");
    }

    this.toHTML = function() {
        return `<div class="card" unselectable="on" onclick="cardClick(${this.id})" id="${this.id}"><p style="color:hsl(${this.color},80%,50%);">${this.letter}</p></div>`
    }

}

function forget() {
    for (var c = 0; c < botMemory.length; c++){
        if (prc(forgetfulness)) {
            console.log(botMemory[c].id, " forgotten");
            remove(botMemory,botMemory[c]);
        }
    }
}

function newSet(number) {
    let set = [];
    let p = 0;
    for (var i = 0; i < number; i += 2) {
        var card = new Card(i,p);
        set.push(card);
        var card = new Card(i+1,p);
        set.push(card);
        p++;
    }
    return set;
}

function removePair(a,b) {
    let d1 = document.getElementById(a.id);
    let d2 = document.getElementById(b.id);
    d1.style.visibility="hidden";
    d1.childNodes[0].remove();
    d2.style.visibility="hidden";
    d2.childNodes[0].remove();
}

function unflip() {
    let cards = document.getElementsByClassName("card");
    for (var c = 0; c < cards.length; c++) {
        if (cards[c].firstChild){
            cards[c].firstChild.classList.remove("open");
        }
    }
    flipped=[];
}

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }