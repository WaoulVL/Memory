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

// Function returns specified amount of unique random letters
function generateUniqueRandomLetters(letterCount = 18) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    shuffleArray(letters)
    var chosenLetters = []
    for (i = 0; i < letterCount; i++) {
        chosenLetters.push(letters[i])
    }
    return chosenLetters
}

// Function returns randomised card values with 2 copies per value
function generateCardValues(cardCount = 36) {
    var valueSet = generateUniqueRandomLetters(cardCount / 2)

    for (var i = 0; i < cardCount / 2; i++) {
        // Create an extra copy for each value
        valueSet.push(valueSet[i])
    }
    shuffleArray(valueSet)
    return valueSet
}

function revealCard(card) {
    card.classList.remove("card_closed")
    card.classList.add("card_open")
}
function hideCard(card) {
    card.classList.remove("card_open")
    card.classList.add("card_closed")
}
function lockCard(card) {
    card.classList.remove("card_open")
    card.classList.add("card_found")
}

function isCardClosed(card) {
    return card.classList.contains("card_closed")
}

function getCardDisplayValue(card) {
    return card.querySelector('.card_text').innerHTML
}
function setCardDisplayValue(card, value) {
    card.querySelector('.card_text').innerHTML = value
}

function run() {
    const memoryContainer = document.getElementById("memory-container");
    const startButton = document.getElementById("start-button")

    // Start new game
    startButton.addEventListener("click", function() {
        // Gather settings
        const width = document.getElementById("board-width").value
        const closedCharacter = document.getElementById("closed-character").value

        // Generate card HTML
        var cardCount = width * width
        var cardsHTML = "";
        for (var i = 0; i < cardCount; i++) {
            cardsHTML += '<div class="card_closed"><p class="card_text">' + closedCharacter + '</p></div>';
        }
        memoryContainer.innerHTML = cardsHTML;

        // Change grid layout
        memoryContainer.style.gridTemplateRows = "repeat(" + width + ", 1fr)";
        memoryContainer.style.gridTemplateColumns = "repeat(" + width + ", 1fr)";
    
        // Card logic
        var cards = document.getElementById("memory-container").querySelectorAll(".card_closed");
        var cardsValues = generateCardValues(cardCount)
        var openCard1 = null
        var openCard2 = null

        for (var i = 0; i < cardCount; i++) {
            const letter = cardsValues[i];
          
            (function() {
                cards[i].addEventListener("click", function() {
                    // Ignore clicks on already opened/revealed cards
                    if (!isCardClosed(this)) {
                        return
                    }

                    if (!(openCard1 === null) && !(openCard2 === null)) {
                        // Third card clicked, hide previously revealed cards
                        hideCard(openCard1)
                        setCardDisplayValue(openCard1, closedCharacter)
                        hideCard(openCard2)
                        setCardDisplayValue(openCard2, closedCharacter)
                        openCard1 = null
                        openCard2 = null
                    }

                    // Reveal clicked card
                    revealCard(this)
                    setCardDisplayValue(this, letter)

                    if (openCard1 === null) {
                        // First card clicked
                        openCard1 = this;
                    } else if (openCard2 === null) {
                        // Second card clicked
                        openCard2 = this;
                        if (getCardDisplayValue(openCard1) === getCardDisplayValue(openCard2)) {
                            // Match found
                            lockCard(openCard1)
                            lockCard(openCard2)
                            openCard1 = null
                            openCard2 = null
                        }
                    }
                })
            })()
          }
    })
}