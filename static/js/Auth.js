document.getElementById('loginButton').onclick = function(eventButtonLogin) {
    eventButtonLogin.preventDefault();

    let isValid = true;
    let userName = document.getElementById("skyname").value;
    let userPassword = document.getElementById("password").value;

    if (!userName.endsWith('@skymail.com')) {
        document.getElementById("skyname").value = "";
        document.getElementById("skyname").placeholder = "Неправильный email";
        isValid = false;
    }
    if (!userName) {
        document.getElementById("skyname").placeholder = "Обязательное поле";
        isValid = false;
    }
    if (!userPassword) {
        document.getElementById("password").placeholder = "Обязательное поле";
        isValid = false;
    }

    if (isValid) {
        validateCredentials(userName, userPassword);
    }
};

function validateCredentials(userName, password) {
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'skyname': userName,
            'password': password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.redirect) {
            window.location.href = data.redirect;
        } else {
            alert("Invalid username or password.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
