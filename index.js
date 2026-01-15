const sections = document.querySelectorAll('section');
const buttonsNavBar = document.querySelectorAll('#navBar>button');
const arrows = document.querySelectorAll('.arrow');

//fleches sur le côté
arrows.forEach(arrow => {
    arrow.addEventListener('click', function () {
        if(arrow.classList.contains('right')) {
            afficherSectionSuivante();
        } else {
            afficherSectionPrecedente();
        }
    })
})

//bouton en bas de l'écran
buttonsNavBar.forEach(function(button) {
    button.addEventListener("click", function() {
        let choice = button.classList[0];
        let section = document.getElementById(choice);
        afficherSection(section);
    });
});

function afficherSection(section){
    changerAffichageSection(section);
    changerAffichageButtons(section);
}

function changerAffichageButtons(section) {
    const indiceChosen = [...sections].indexOf(section);
    const indiceActual = [...sections].indexOf(actual);
    buttonsNavBar[indiceActual].classList.remove('active');
    buttonsNavBar[indiceChosen].classList.add('active');
}

let actual = sections[0];
function changerAffichageSection(section){
    const width = screen.width;
    const indiceChosen = [...sections].indexOf(section);
    const indiceActual = [...sections].indexOf(actual);
    let timeout = 0;
    if(indiceActual < indiceChosen){
        for(let i = 0; i < sections.length; i++) {
            setTimeout(function() {
                if (i < indiceChosen) {
                    sections[i].style.left = '-' + width + 'px';
                } else if (i === indiceChosen) {
                    sections[i].style.left = '0';
                    actual = sections[i];
                } else {
                    sections[i].style.left = width + 'px';
                }
            }, timeout + (i*150));
        }
    }else{
        for(let i = sections.length - 1; i > -1; i--) {
            setTimeout(function() {
                if (i < indiceChosen) {
                    sections[i].style.left = '-' + width + 'px';
                } else if (i === indiceChosen) {
                    sections[i].style.left = '0';
                    actual = sections[i];
                } else {
                    sections[i].style.left = width + 'px';
                }
            }, timeout + ((sections.length-1-i)*150));
        }
    }

}

function afficherSectionSuivante(){
    const indiceActual = [...sections].indexOf(actual)
    let section;
    if(indiceActual + 1 > sections.length - 1) {
        section = sections[0];
    } else {
        section = sections[[...sections].indexOf(actual) + 1];
    }
    afficherSection(section);
}
function afficherSectionPrecedente() {
    const indiceActual = [...sections].indexOf(actual)
    let section;
    if (indiceActual - 1 < 0) {
        section = sections[sections.length - 1];
    } else {
        section = sections[[...sections].indexOf(actual) - 1];
    }
    afficherSection(section);
}

// Gestion du hash dans l'URL au chargement
window.addEventListener('load', function() {
    const hash = window.location.hash;
    if (hash) {
        const sectionId = hash.substring(1);
        const section = document.getElementById(sectionId);
        if (section) {
            afficherSection(section);
        }
    } else{
        afficherSection(sections[0])
    }
});

let isScrolling = false;
const SEUIL = 50; // Distance minimum pour déclencher le changement
const DEBOUNCE_DELAY = 200; // Délai en ms avant de pouvoir refaire un swipe
document.addEventListener('wheel', (e) => {
    if (isScrolling) return;

    if (Math.abs(e.deltaX) > SEUIL) {
        isScrolling = true; // Bloquer les événements suivants
        if (e.deltaX > 0) {
            afficherSectionSuivante()
        } else {
            afficherSectionPrecedente()
        }

        setTimeout(function() {
            isScrolling = false;
        }, DEBOUNCE_DELAY);

        e.preventDefault();
    }
}, { passive: false });