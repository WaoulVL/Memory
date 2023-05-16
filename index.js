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

function run() {
    const memoryContainer = document.getElementById("memory-container");
    const startButton = document.getElementById("start-button")

    startButton.addEventListener("click", function() {
        var cardCount = document.getElementById("board-width").value * document.getElementById("board-width").value;
        var cardsHTML = "";
        for (var i = 0; i < cardCount; i++) {
            cardsHTML += '<div class="card_closed"><p class="card_text">+</p></div>';
        }
    
        memoryContainer.innerHTML = cardsHTML;
        
        var letterCount = cardCount / 2
        var cards = document.getElementById("memory-container").querySelectorAll(".card_closed");
        var randomLetters = generateRandomLetters(letterCount);
    
        for (var i = 0; i < letterCount; i++) {
            const letter = randomLetters[i % letterCount]; // change
    
            cards[i].addEventListener("click", function() {
                cards[i].querySelector('.card_text').innerHTML = letter
            })
        }
    })
    
}

function openCard() {

}

function closeCard() {

}

function pairFound () {

}