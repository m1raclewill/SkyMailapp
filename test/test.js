// Получить модальное окно
var modal = document.getElementById("modal");

// Получить кнопку, которая открывает модальное окно
var btn = document.getElementById("openModalBtn");

// Получить элемент <span>, который закрывает модальное окно
var span = document.getElementsByClassName("close-btn")[0];

// Когда пользователь нажимает на кнопку, открыть модальное окно
btn.onclick = function() {
    modal.style.display = "block";
}

// Когда пользователь нажимает на <span> (x), закрыть модальное окно
span.onclick = function() {
    modal.style.display = "none";
}

// Когда пользователь нажимает в любое место вне модального окна, закрыть его
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
