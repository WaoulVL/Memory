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

// Function returns specified amount of unique random numbers
function generateUniqueRandomNumbers(numberCount = 18) {
    const numbers = Array.from({ length: numberCount }, (_, index) => index + 1);
    shuffleArray(numbers);
    return numbers;
  }
  

// Function returns randomised card values with 2 copies per value
async function generateCardValues(cardCount = 36, cardType = 'letters') {
    var valueSet = []
    switch(cardType) {
        case 'letters':
            valueSet = generateUniqueRandomLetters(cardCount / 2)
            break
        case 'numbers':
            valueSet = generateUniqueRandomNumbers(cardCount / 2)
            break
        case 'dogs':
            try {
                const images = await getApiImages('dogs', cardCount / 2);
                valueSet = images;
              } catch {
                throw new error("Failed to get dog images")
            }
            break
        case 'cats':
            try {
                const images = await getApiImages('cats', cardCount / 2);
                valueSet = images;
              } catch {
                throw new error("Failed to get cat images")
            }
            break
    }

    // Create an extra copy for each value
    valueSet = valueSet.concat(valueSet);

    shuffleArray(valueSet)
    return valueSet
}

// Class changing functions
function revealCard(card) {
    card.classList.remove("card-closed")
    card.classList.add("card-open")
}
function hideCard(card) {
    card.classList.remove("card-open")
    card.classList.add("card-closed")
}
function lockCard(card) {
    card.classList.remove("card-open")
    card.classList.add("card-found")
}

// Checking functions
function isCardClosed(card) {
    return card.classList.contains("card-closed")
}
function isCardFound(card) {
    return card.classList.contains("card-found")
}

// Card value functions
function getCardDisplayValue(card) {
    var cardImageElement = card.querySelector('.card-image')
    if (cardImageElement) {
        return cardImageElement.src
    } else {
        return card.querySelector('.card-text').textContent
    }
}
function setCardDisplayValue(card, value) {
    var cardImageElement = card.querySelector('.card-image')
    if (cardImageElement) {
        cardImageElement.src = value
    } else {
        card.querySelector('.card-text').textContent = value
    }
}

// Image API request functions
function getApiImages(cardType = "dogs", imageCount = 18) {
    return new Promise((resolve, reject) => {
        var imageURLs = [];
        switch (cardType) {
            case 'dogs':
                var apiURL = 'https://dog.ceo/api/breeds/image/random/' + imageCount;
                fetch(apiURL)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    for (var i = 0; i < imageCount; i++) {
                        imageURLs.push(data.message[i]);
                    }
                    resolve(imageURLs);
                })
                .catch((error) => {
                reject(error);
                });
                break
            case 'cats':
                var apiURL = 'https://api.thecatapi.com/v1/images/search?limit=' + imageCount + '&breed_ids=beng&api_key=live_mcM2SvZ2sNm0CzL9eoYx3QoykICpt3ece0yOH7yMbCtZE5AYWritFAXH3pAAwv8m'
                fetch(apiURL)
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(function (data) {
                    for (var i = 0; i < imageCount; i++) {
                        imageURLs.push(data[i].url);
                    }
                    resolve(imageURLs);
                })
                .catch(function (error) {
                    reject(error);
                });
                break;
            default:
            reject(new Error("Invalid card type"))
        }
    });
}

// Function updates card colors from color pickers
function updateColor() {
    const pickerOpen = document.getElementById("color-picker-open")
    const pickerClosed = document.getElementById("color-picker-closed")
    const pickerFound = document.getElementById("color-picker-found")
    document.documentElement.style.setProperty("--card-open-color", pickerOpen.value);
    document.documentElement.style.setProperty("--card-closed-color", pickerClosed.value);
    document.documentElement.style.setProperty("--card-found-color", pickerFound.value);
}

const createAPIHeaders = () => {
    const headers = {
        'Content-Type': 'application/json'
    }
    jwtToken = localStorage.getItem("jwtToken")
    if (jwtToken) {
        headers['Authorization'] = `Bearer ${jwtToken}`
    }
    return headers
}

function getPlayerIdFromJWT(jwtToken) {
    const tokenParts = jwtToken.split('.')

    const encodedPayload = tokenParts[1]
    const decodedPayload = atob(encodedPayload)
    const payload = JSON.parse(decodedPayload)

    return payload.sub
}

function loadUserData() {
    const jwtToken = localStorage.getItem("jwtToken")
    const isLoggedIn = jwtToken != null

    const loginBtn = document.getElementById("login_btn")
    const registerBtn = document.getElementById("register_btn")
    const logoutBtn = document.getElementById("logout_btn")
    if (isLoggedIn) {
        // Update user data
        const id = getPlayerIdFromJWT(jwtToken)
        const url = `http://localhost:8000/api/player/${id}`

        fetch(url, {
            method: 'GET',
            headers: createAPIHeaders()
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .then(data => {
            document.getElementById('welcome-message').innerHTML = 'Welkom ' + data.name + '!'
        })

        // Update button visibility
        loginBtn.style.display = "none"
        registerBtn.style.display = "none"
        logoutBtn.style.display = ""
    } else {
        // Update button visibility
        loginBtn.style.display = ""
        registerBtn.style.display = ""
        logoutBtn.style.display = "none"
    }
}

function run() {
    const memoryContainer = document.getElementById("memory-container")
    const startButton = document.getElementById("start-button")

    loadUserData()

    // Start new game
    startButton.addEventListener("click", function() {
        // Hide win message
        document.getElementById("win-message").style.display = 'none'

        // Gather settings
        const width = document.getElementById("board-width").value
        const closedCharacter = document.getElementById("closed-character").value
        const cardType = document.getElementById("card-type").value

        // Generate cards HTML
        var cardHTML = ""
        var cardsHTML = ""
        var closedDisplayValue = ""
        if (cardType == "letters" || cardType == "numbers") {
            // Text based cards
            cardHTML = '<div class="card-closed"><p class="card-text">' + closedCharacter + '</p></div>'
            closedDisplayValue = closedCharacter
        } else {
            // Image based cards
            cardHTML = '<div class="card-closed"><img src="images/closed-card-image.png" class="card-image"></img></div>'
            closedDisplayValue = "images/closed-card-image.png"
        }
        var cardCount = width * width
        for (var i = 0; i < cardCount; i++) {
            cardsHTML += cardHTML
        }
        memoryContainer.innerHTML = cardsHTML;

        // Change card color
        updateColor()

        // Change grid layout
        memoryContainer.style.gridTemplateRows = "repeat(" + width + ", 1fr)"
        memoryContainer.style.gridTemplateColumns = "repeat(" + width + ", 1fr)"
    
        // Card logic
        var cards = document.getElementById("memory-container").querySelectorAll(".card-closed")
        // var cardsValues = generateCardValues(cardCount, cardType)

        let cardsValues
        generateCardValues(cardCount, cardType)
        .then((generatedValues) => {
            cardsValues = generatedValues
            var openCard1 = null
            var openCard2 = null

            for (var i = 0; i < cardCount; i++) {
                const cardValue = cardsValues[i];
            
                (function() {
                    cards[i].addEventListener("click", function() {
                        // Ignore clicks on already opened/revealed cards
                        if (!isCardClosed(this)) {
                            return
                        }

                        if (!(openCard1 === null) && !(openCard2 === null)) {
                            // Third card clicked, hide previously revealed cards
                            hideCard(openCard1)
                            setCardDisplayValue(openCard1, closedDisplayValue)
                            hideCard(openCard2)
                            setCardDisplayValue(openCard2, closedDisplayValue)
                            openCard1 = null
                            openCard2 = null
                        }

                        // Reveal clicked card
                        revealCard(this)
                        setCardDisplayValue(this, cardValue)

                        // Matching logic
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
                        
                        // Check if game has been won
                        var isGameWon = true;
                        for (var ii = 0; ii < cards.length; ii++) {
                            if (!isCardFound(cards[ii])) {
                                isGameWon = false;
                                break
                            }
                        }
                        if (isGameWon) {
                            // Un-hide winning message
                            document.getElementById("win-message").style.display = '';
                        }
                    })
                })()
            }
        })
    })
}

