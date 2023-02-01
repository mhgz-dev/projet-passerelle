// VARIABLES
const motTableau = ['informatique','javascript','clavier','planete','voiture','console','appartement'];
let dernierNombreAleatoire;
let coups           = 10;
let images          = 0;
let lettreUtilisee  = 0;
let lettreChoisie;


// Récupération Event HTML
let motCache        = document.querySelector('#mot_cache');
let lettresErreurs  = document.querySelector('#lettresErreurs');
let lettresInput    = document.querySelector('#lettresInput');
let formulaire      = document.querySelector('#form');
let submit          = document.querySelector('#submit');
let coupsRestants   = document.querySelector('#coupsRestants');
let imagesPendu     = document.querySelector('#imagesPendu');
let popup           = document.querySelector('#gagne');


// Fonction pour générer un nombre entier.
function genererNombreEntier(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// Fonction pour choisir un mot au hasard dans motTableau en le stockant lettre par lettre.
function motATrouver() {
    let nombreAleatoire;
    do {
        nombreAleatoire = genererNombreEntier(motTableau.length);
    } while (nombreAleatoire == dernierNombreAleatoire);

    dernierNombreAleatoire = nombreAleatoire;

    return motTableau[nombreAleatoire];
}

// Variable pour initialisation de la fonction motATrouver ET décomposition du tableau.
let motAleatoire = motATrouver();
let motDecouper  = [...motAleatoire];


// Fonction pour afficher le mot caché par des underscores.
function cacherMot(motDecouper) {
    motDecouper.forEach(lettre => {
        motCache.innerHTML += `<span>_</span>`;
    })
}

// Activation de la fonction pour cacher le mot sur la page HTML.
cacherMot(motDecouper);

// Fonction pour bloquer la saisie à la fin de partie.
function bloquerInput() {
    lettresInput.disabled = true;
    submit.disabled = true;
}


// Fonction pour controler les lettres et les afficher

const underscores     = document.querySelectorAll('#mot_cache span');


function afficherLettreDansMot(lettreChoisie) {

    let lettreOK = false;
    
    for (let i = 0; i < motDecouper.length; i++) {
        if (lettreChoisie === motDecouper[i]) {
            underscores[i].textContent = lettreChoisie;
            lettreUtilisee++;
            lettreOK = true;
        }
    }
    
    if (!lettreOK) {
       
        lettresErreurs.textContent += `${lettreChoisie}, `;
        afficherPotence();
        nombresCoupsRestants();      
    }


    
    if (lettreUtilisee === motDecouper.length) {
        popup.innerHTML = `Bravo, vous avez gagné !!`;
        popup.append(rejouez);
        popup.style.display = 'flex';
        bloquerInput();    
    }
    
}

// Fonction pour le changement d'images de la potence.
function afficherPotence() {
    
    images++;
    sourceImages = `src/img/${images}.jpg`;
    imagesPendu.setAttribute("src", sourceImages);
 
}

// Fonction pour compter les coups restants (Défini dans la variable coups = 10).
function nombresCoupsRestants() {
    
    --coups;
    coupsRestants.innerHTML = `<span>${coups}</span>`;

    if (coups == 0) {
        popup.innerHTML = `Dommage, vous avez perdu :(`;
        popup.append(rejouez);
        popup.style.display = 'flex';
        bloquerInput();
        return coups = 10;
    }

}


// Boucle pour activer le bouton Rejouez.
let rejouez = document.querySelector('.rejouez');

rejouez.addEventListener('click', () => {
        location.reload();
});



// Empêcher le rafraichissement de la page au submit et vérification des champs fournit par l'utilisateur

formulaire.addEventListener('submit', (e) => {
    e.preventDefault();

    if(!isNaN(lettresInput.value) || lettresInput.value == '') {
        lettresInput.style.backgroundColor = 'red';
    } else {
        lettresInput.style.backgroundColor = 'white';
        lettreChoisie = lettresInput.value;
        lettresInput.value = '';
        lettresInput.focus();
        afficherLettreDansMot(lettreChoisie);
        
    }
        
});