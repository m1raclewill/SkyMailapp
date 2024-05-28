document.addEventListener('DOMContentLoaded', function () {
    var logoutButton = document.getElementById('logoutButton');
    
    logoutButton.addEventListener('click', function () {
        window.location.href = '/logout';
    });
    


    closeAllModals();
});

function logout() {
    window.location.href = data.redirect;
}
document.addEventListener('DOMContentLoaded', function () {
	
	closeAllModals()
})

function openModal(modalId) {
	document.getElementById(modalId).style.display = 'flex'
}

function closeModal(modalId) {
	document.getElementById(modalId).style.display = 'none'
}

function closeAllModals() {
	const modals = ['inboxModal', 'sentModal', 'deleteModal']
	modals.forEach(modalId => {
		closeModal(modalId)
	})
}


window.onclick = function (event) {
	const modals = ['inboxModal', 'sentModal', 'deleteModal']
	modals.forEach(modalId => {
		const modal = document.getElementById(modalId)
		if (event.target == modal) {
			modal.style.display = 'none'
		}
	})
}

document.addEventListener('DOMContentLoaded', function () {
	var profileIcon = document.querySelector('.profile_icon')

	profileIcon.addEventListener('click', function () {
		window.location.href = '../profile/Profile.html'
	})
})
