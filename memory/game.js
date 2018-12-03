

// random function, returns true $percent of the time, else false
function prc(percent){
    let a = Math.random();
    return (a < 100/percent);
}
