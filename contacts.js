emailjs.init("ZLl7-Vqtjxw8walNE"); // ← Remplace ici

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const btn = document.getElementById('submitBtn');
    const status = document.getElementById('status');

    btn.disabled = true;
    btn.textContent = 'Envoi en cours...';
    status.className = 'status';

    // Envoie l'email
    emailjs.sendForm(
        'service_s8dwu4b',
        'template_ww83agp',
        this
    )
        .then(function() {
            status.textContent = '✓ Message envoyé avec succès !';
            status.className = 'status success';
            document.getElementById('contactForm').reset();
        })
        .catch(function(error) {
            status.textContent = '✗ Erreur lors de l\'envoi. Réessayez.';
            status.className = 'status error';
            console.error('Erreur:', error);
        })
        .finally(function() {
            btn.disabled = false;
            btn.textContent = 'Envoyer';
            setTimeout(function() {status.className = 'status';}, 5000)
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