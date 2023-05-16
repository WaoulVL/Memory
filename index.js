const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
function generateRandomLetters(count = 18) {
    var chosenLetters = []

    // Randomize array in-place using Durstenfeld shuffle algorithm
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    shuffleArray(letters)
    for (i = 0; i < count; i++) {
        chosenLetters.push(letters[i])
    }
    return chosenLetters
}

function test_letters() {
    document.getElementById("java_test").innerHTML = generateRandomLetters(5)
}

function openCard() {

}

function closeCard() {

}

function pairFound () {

}