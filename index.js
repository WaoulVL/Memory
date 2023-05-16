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

function reveal_card(card) {
    card.classList.remove("card_closed");
    card.classList.add("card_open");
}
function hide_card(card) {
    card.classList.remove("card_closed");
    card.classList.add("card_open");
}
function found_card(card) {
    card.classList.remove("card_open");
    card.classList.add("card_found");
}

function getCardValue(card) {
    return card.querySelector('.card_text').innerHTML
}

function run() {
    const memoryContainer = document.getElementById("memory-container");
    const startButton = document.getElementById("start-button")

    startButton.addEventListener("click", function() { // New game
        // Generate cards
        const width = document.getElementById("board-width").value
        var cardCount = width * width
        var cardsHTML = "";
        for (var i = 0; i < cardCount; i++) {
            cardsHTML += '<div class="card_closed"><p class="card_text">+</p></div>';
        }

        // Change grid layout
        memoryContainer.style.gridTemplateRows = "repeat(" + width + ", 1fr)";
        memoryContainer.style.gridTemplateColumns = "repeat(" + width + ", 1fr)";
    
        memoryContainer.innerHTML = cardsHTML;
        
        // Generate letters
        var letterCount = cardCount / 2
        var cards = document.getElementById("memory-container").querySelectorAll(".card_closed");
        var randomLetters = generateRandomLetters(letterCount);
    
        var OpenedCard = null
        for (var i = 0; i < cardCount; i++) {
            const letter = randomLetters[i % letterCount];
          
            (function() {
              cards[i].addEventListener("click", function() {
                this.querySelector('.card_text').innerHTML = letter;

                // Reveal card
                reveal_card(this)

                if (OpenedCard === null) {
                    // First card
                    OpenedCard = this;
                } else {
                    // Second card
                    if (getCardValue(this) === getCardValue(OpenedCard)) {
                        // Match found
                        found_card(this)
                        found_card(OpenedCard)
                        OpenedCard = null
                    }
                }
              });
            })();
          }
    })
    
}

function openCard() {

}

function closeCard() {

}

function pairFound () {

}