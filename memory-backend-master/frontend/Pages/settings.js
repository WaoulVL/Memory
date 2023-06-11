function redirectToLogin() {
    const notificationMessage = "Uw sessie is verlopen, log opnieuw in"
    window.location.href = "login.html?message=" + encodeURIComponent(notificationMessage)
}

function redirectToMemory() {
    window.location.href = "memory.html";
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

function getPayloadFromJWT(jwtToken) {
    return JSON.parse(atob(jwtToken.split('.')[1]))
}

function getPlayerIdFromJWT(jwtToken) {
    return getPayloadFromJWT(jwtToken).sub
}

function isTokenActive(jwtToken) {
    return jwtToken && ((Date.now()) < (getPayloadFromJWT(jwtToken).exp * 1000))
}

function checkTokenExpiration(jwtToken) {
    const tokenIsActive = isTokenActive(jwtToken)

    // If token exists and became inactive, redirect user to login screen after deleting token
    if (jwtToken && !tokenIsActive) {
        localStorage.removeItem("jwtToken")
        redirectToLogin()
    }
}

function savePreferences() {
    const jwtToken = localStorage.getItem("jwtToken")
    const playerId = getPlayerIdFromJWT(jwtToken)
    const newEmail = document.getElementById("email").value
    const preferences = {
        api: document.getElementById("card-type").value,
        color_closed: document.getElementById("color-picker-found").value,
        color_found: document.getElementById("color-picker-closed").value
    }

    const headers = createAPIHeaders()

    // Update player data
    Promise.all([
        fetch(`http://localhost:8000/api/player/${playerId}/email`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({ email: newEmail })
        }),
        fetch(`http://localhost:8000/api/player/${playerId}/preferences`, {
            method: 'POST',
            headers,
            body: JSON.stringify(preferences)
        })
    ])
    .then(responses => {
        const [emailResponse, preferencesResponse] = responses

        if (emailResponse.ok && preferencesResponse.ok) {
            redirectToMemory()
        } else {
            throw new Error('Failed to update email and preferences')
        }
    })
}

function run() {
    // Retrieve player token
    const jwtToken = localStorage.getItem("jwtToken")

    // Check if token exists, otherwise redirect
    if (!jwtToken) {
        redirectToLogin()
    }

    // Periodically check if existing token is still valid while on page
    checkTokenExpiration(jwtToken)
    setInterval(() => {
        checkTokenExpiration(jwtToken)
    }, 1000);

    const loginBtn = document.getElementById("login_btn")

    // Retrieve user data and set email address in the text box
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
        // Display user data
        document.getElementById('username').innerHTML = 'Naam: ' + data.name

        // Set email address in the text box
        document.getElementById('email').value = data.email
    })
    fetch(`http://localhost:8000/api/player/${id}/preferences`, {
        method: 'GET',
        headers: createAPIHeaders()
    })
    .then(response => response.json())
    .then(preferences => {
        const favoriteCards = preferences.preferred_api
        const favoriteClosedColors = preferences.color_closed
        const foundCardColors = preferences.color_found
    
        const closedColorPicker = document.getElementById("color-picker-closed")
        if (favoriteClosedColors) {
            closedColorPicker.value = favoriteClosedColors
        }
    
        const foundColorPicker = document.getElementById("color-picker-found")
        if (foundCardColors) {
            foundColorPicker.value = foundCardColors
        }
    
        const cardTypeSelect = document.getElementById("card-type")
        if (favoriteCards) {
            cardTypeSelect.value = favoriteCards
        }
    })
}