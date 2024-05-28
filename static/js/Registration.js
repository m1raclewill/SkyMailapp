function updateEmail() {
    const inputValue = document.getElementById('emailName');

    inputValue.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addSignature();
        }
    });

    function addSignature() {
        const currentValue = inputValue.value;
        if (currentValue && !currentValue.endsWith('@skymail.com')) {
            inputValue.value = currentValue + '@skymail.com';
        }
    }

    inputValue.addEventListener('focus', function () {
        const currentValue = inputValue.value;
        if (!currentValue) {
            inputValue.placeholder = '@skymail.com';
        }
    });

    inputValue.addEventListener('blur', function () {
        const currentValue = inputValue.value;
        if (!currentValue) {
            inputValue.placeholder = '@skymail.com';
        } else {
            addSignature();
        }
    });

    inputValue.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addSignature();
        }
    });
}

updateEmail();

function checkPassword(password) {
    if (
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/[0-9]/.test(password)
    ) {
        return false;
    }
    if (password.length < 8) {
        return false;
    }
    return true;
}

document.getElementById('registerButton').onclick = function (eventButton) {
    eventButton.preventDefault();

    let isValid = true;

    const userName = document.getElementById('name').value;
    const skyMailName = document.getElementById('emailName').value;
    const userPassword = document.getElementById('password').value;

    if (skyMailName === '@skymail.com') {
        document.getElementById('emailName').value = '';
        document.getElementById('emailName').placeholder = 'Неверный формат';
        isValid = false;
    }

    if (!userName) {
        document.getElementById('name').placeholder = 'Обязательное поле';
        isValid = false;
    }
    if (!skyMailName) {
        document.getElementById('emailName').placeholder = 'Обязательное поле';
        isValid = false;
    }
    if (!userPassword) {
        document.getElementById('password').placeholder = 'Обязательное поле';
        isValid = false;
    }
    if (!checkPassword(userPassword)) {
        document.getElementById('password').value = '';
        document.getElementById('password').placeholder = 'Неверный формат пароля';
        isValid = false;
    }
    if (isValid) {
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'name': userName,
                'emailName': skyMailName,
                'password': userPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'User registered successfully') {
                window.location.href = data.redirect;
            } else {
                alert('User with this email already exists');
            }
        });
    }
};
