emailjs.init("ZLl7-Vqtjxw8walNE");

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const btn = document.getElementById('submitBtn');
    const status = document.getElementById('status');
    const statusText = status.querySelector('.status-text');

    btn.disabled = true;
    btn.textContent = 'Envoi en cours...';
    hideStatus();

    // Envoie l'email
    emailjs.sendForm(
        'service_s8dwu4b',
        'template_ww83agp',
        this
    )
        .then(function() {
            showStatus('✓ Message envoyé avec succès !', 'success');
            document.getElementById('contactForm').reset();
        })
        .catch(function(error) {
            showStatus('✗ Erreur lors de l\'envoi. Réessayez.', 'error');
            console.error('Erreur:', error);
        })
        .finally(function() {
            btn.disabled = false;
            btn.textContent = 'Envoyer';
        });
});

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

function validateForm() {
    const nameValid = nameInput.value.trim() !== '';
    const emailValid = emailInput.value.trim() !== '' && emailInput.validity.valid;
    const messageValid = messageInput.value.trim() !== '';

    // Active le bouton seulement si tous les champs sont remplis
    if (nameValid && emailValid && messageValid) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

// Écoute les changements sur chaque champ
nameInput.addEventListener('input', validateForm);
emailInput.addEventListener('input', validateForm);
messageInput.addEventListener('input', validateForm);

// Validation initiale au chargement
validateForm();

// Fonctions pour gérer l'affichage du status
function showStatus(message, type) {
    const status = document.getElementById('status');
    const statusText = status.querySelector('.status-text');

    statusText.textContent = message;
    status.className = 'status ' + type + ' show';

    // Clear le timeout précédent s'il existe
    if (window.statusTimeout) {
        clearTimeout(window.statusTimeout);
    }

    // Masquer automatiquement après 5 secondes
    window.statusTimeout = setTimeout(hideStatus, 5000);
}

function hideStatus() {
    const status = document.getElementById('status');
    status.classList.remove('show');

    if (window.statusTimeout) {
        clearTimeout(window.statusTimeout);
    }
}

// Gestionnaire pour le bouton de fermeture
document.querySelector('.status-close').addEventListener('click', hideStatus);