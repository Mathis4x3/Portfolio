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