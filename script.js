/*

╔╗ ┬ ┬  ╔╦╗┌─┐┌─┐┌┬┐  ╔╦╗┌─┐┬ ┬
╠╩╗└┬┘   ║ ├┤ ├─┤│││  ║║║├┤ │││
╚═╝ ┴    ╩ └─┘┴ ┴┴ ┴  ╩ ╩└─┘└┴┘
 ,  ,                            , _                                 
/|_/        o  _|   _  ,_       /|/ \ ,_   _  ,   _  o |\ |\ o  _,   
 |\   |  |  | / |  |/ /  |       |__//  | |/ / \_/   | |/ |/ | / |   
 | \_/ \/|_/|/\/|_/|_/   |/o     |      |/|_/ \/ \__/|/|_/|_/|/\/|_/o
                                                                    /
 ()  _      |)   o  _      ()      ()_|_  _,   _                    
 /\ / \_|/\_|/\  | |/      /\/     /\ |  / |  /   |  |               
/(_)\_/ |_/ |  |/|/|_/o    \/\    /(_)|_/\/|_/\__/ \/|/o             
       (|             /                             (|             
           Date de création: 09 Décembre 2025
           Dernière modification : 19 Décembre 2025
  
*/
//_____________La base du jeu (variables, constantes, et fonctions primordiales)

let score = 0;
let clickValue = 1;
let passiveValue = 0;
let currentSkinLevel = 0;
const LEVEL_STEP = 10;
const buttonLv = document.querySelector(".button-lv");
const scoreDisplay = document.getElementById("score");
const guitarClick = document.querySelector(".onclick");
const sceneUpgradesContainer = document.querySelector(".scene-upgrades");

function updateDisplay() {
    scoreDisplay.textContent = Math.floor(score);
}

guitarClick.addEventListener("click", (e) => {
    score += clickValue;
    updateDisplay();
    spawnFloatingNumbers(e);
});

setInterval(() => {
    score += passiveValue;
    updateDisplay();

}, 1000);

//_____________Bouton Level Up doit être activé

function checkLevelUp() {
    const commonLevel = getCommonLevel();
    const nextLevel = currentSkinLevel + LEVEL_STEP;

    if (commonLevel >= nextLevel) {
        buttonLv.disabled = false;
    } else {
        buttonLv.disabled = true;
    }
}

buttonLv.addEventListener("click", () => {
    if (buttonLv.disabled) return;

    currentSkinLevel += LEVEL_STEP;
    updateGuitarSkin();
    buttonLv.disabled = true;
});

function updateGuitarSkin() {
    let selectedSkin = guitarSkins[0].src;

    for (const skin of guitarSkins) {
        if (currentSkinLevel >= skin.level) {
            selectedSkin = skin.src;
        }
    }

    guitarImg.src = selectedSkin;
}


//_____________Affichage des nombrea au click
function spawnFloatingNumbers(e) {
    const floatingText = document.createElement("span");
    floatingText.classList.add("floating-number");
    floatingText.textContent = `+${clickValue}`;
    floatingText.style.left = `${e.clientX}px`;
    floatingText.style.top = `${e.clientY}px`;
    const randomX = (Math.random() - 0.5) * 200; // Déplacement entre -100px et 100px
    floatingText.style.setProperty('--random-x', `${randomX}px`);

    document.body.appendChild(floatingText);
    setTimeout(() => {
        floatingText.remove();
    }, 1200);
}



//_____________Variables amélioration par click
let mediatorLevel = 0;
let mediatorPrice = 15;
let mancheLevel = 0;
let manchePrice = 40;
let ampliLevel = 0;
let ampliPrice = 80;
let microLevel = 0;
let microPrice = 160;
let corpsLevel = 0;
let corpsPrice = 320;
let mecaniqueLevel = 0;
let mecaniquePrice = 640;
const upgrades = [
    { name: 'mediator', level: 0, price: 15 },
    { name: 'manche', level: 0, price: 40 },
    { name: 'ampli', level: 0, price: 80 },
    { name: 'micro', level: 0, price: 160 },
    { name: 'corps', level: 0, price: 320 },
    { name: 'mecanique', level: 0, price: 640 }
];
function getCurrentDecadeLimit() {
    const minLevel = Math.min(...upgrades.map(u => u.level));
    return Math.floor(minLevel / 10) * 10 + 10;
}
function canUpgrade(upgrade) {
    const limit = getCurrentDecadeLimit();
    return upgrade.level < limit;
}

//_____________Variables des gains passifs
let cassetteQuantity = 0;
let cassettePrice = 100;
let albumQuantity = 0;
let albumPrice = 200;
let ticketQuantity = 0;
let ticketPrice = 400;
let placesConcertQuantity = 0;
let placesConcertPrice = 800;
let casqueQuantity = 0;
let casquePrice = 1600;
let worldTourQuantity = 0;
let worldTourPrice = 3200;

//_____________Constantes skin guitare par pallier de niveau

const guitarSkins = [
    { level: 0, src: "image/PC GUITAR Niveau1 1.png" },
    { level: 10, src: "image/GUITAR Niveau2.png" },
    { level: 20, src: "image/GUITAR Niveau3.png" },
    { level: 30, src: "image/GUITAR Niveau4.png" },
    { level: 40, src: "image/GUITAR Niveau5.png" }
];

//_____________Création des boutons amélioration par click
const mediator = document.querySelector(".mediator");
const manche = document.querySelector(".manche");
const ampli = document.querySelector(".ampli");
const micro = document.querySelector(".micro");
const corps = document.querySelector(".corps");
const mecanique = document.querySelector(".mecanique");

//_____________Création des boutons de gain passif
const cassette = document.querySelector(".cassette");
const album = document.querySelector(".album");
const ticket = document.querySelector(".ticket");
const placesConcert = document.querySelector(".placesConcert");
const casque = document.querySelector(".casque");
const worldTour = document.querySelector(".worldTour");

//_____________Fonctions d'améliorations par click
/*_____________Ancienne méthode.
mediator.addEventListener("click", () => {
    if (score < mediatorPrice) return;
    const up = upgrades.find(u => u.name === name);
    if (!up) return console.error('Upgrade inconnu :', name);
    if (!canUpgrade(up)) return;
    score -= mediatorPrice;
    mediatorLevel += 1;
    clickValue += 1;
    mediatorPrice = mediatorPrice * 1.3;
    refreshButtonInfo(mediator, mediatorLevel, mediatorPrice);
    updateDisplay();
    checkLevelUp();
});

manche.addEventListener("click", () => {
    if (score < manchePrice) return;
    const up = upgrades.find(u => u.name === name);
    if (!up) return console.error('Upgrade inconnu :', name);
    if (!canUpgrade(up)) return;
    score -= manchePrice;
    mancheLevel += 1;
    clickValue += 2;
    manchePrice = manchePrice * 1.3;
    refreshButtonInfo(manche, mancheLevel, manchePrice);
    updateDisplay();
    checkLevelUp();
});

ampli.addEventListener("click", () => {
    if (score < ampliPrice) return;
    const up = upgrades.find(u => u.name === name);
    if (!up) return console.error('Upgrade inconnu :', name);
    if (!canUpgrade(up)) return;
    score -= ampliPrice;
    ampliLevel += 1;
    clickValue += 3;
    ampliPrice = ampliPrice * 1.3;
    refreshButtonInfo(ampli, ampliLevel, ampliPrice);
    updateDisplay();
    checkLevelUp();
});

micro.addEventListener("click", () => {
    if (score < microPrice) return;
    const up = upgrades.find(u => u.name === name);
    if (!up) return console.error('Upgrade inconnu :', name);
    if (!canUpgrade(up)) return;
    score -= microPrice;
    microLevel += 1;
    clickValue += 4;
    microPrice = microPrice * 1.3;
    refreshButtonInfo(micro, microLevel, microPrice);
    updateDisplay();
    checkLevelUp();
});

corps.addEventListener("click", () => {
    if (score < corpsPrice) return;
    const up = upgrades.find(u => u.name === name);
    if (!up) return console.error('Upgrade inconnu :', name);
    if (!canUpgrade(up)) return;
    score -= corpsPrice;
    corpsLevel += 1;
    clickValue += 5;
    corpsPrice = corpsPrice * 1.3;
    refreshButtonInfo(corps, corpsLevel, corpsPrice);
    updateDisplay();
    checkLevelUp();
});

mecanique.addEventListener("click", () => {
    if (score < mecaniquePrice) return;
    const up = upgrades.find(u => u.name === name);
    if (!up) return console.error('Upgrade inconnu :', name);
    if (!canUpgrade(up)) return;
    score -= mecaniquePrice;
    mecaniqueLevel += 1;
    clickValue += 6;
    mecaniquePrice = mecaniquePrice * 1.3;
    refreshButtonInfo(mecanique, mecaniqueLevel, mecaniquePrice);
    updateDisplay();
<<<<<<< HEAD
    checkLevelUp();
});
*/
// Remplacez tout le bloc commenté (Ancienne méthode) par ceci :

//_____________Gestion des améliorations par clic (TALENT)
upgrades.forEach((up, index) => {
    const buttonElement = document.querySelector(`.${up.name}`);

    if (buttonElement) {
        buttonElement.addEventListener("click", () => {
            // 1. Vérifier le score
            if (score < up.price) return;

            // 2. Vérifier la règle de palier (tous les éléments doivent monter ensemble)
            if (!canUpgrade(up)) {
                alert("Montez les autres éléments de talent pour débloquer ce niveau !");
                return;
            }

            // 3. Appliquer l'achat
            score -= up.price;
            up.level += 1;

            // 4. Synchroniser les anciennes variables pour les fonctions globales
            if (up.name === 'mediator') mediatorLevel = up.level;
            if (up.name === 'manche') mancheLevel = up.level;
            if (up.name === 'ampli') ampliLevel = up.level;
            if (up.name === 'micro') microLevel = up.level;
            if (up.name === 'corps') corpsLevel = up.level;
            if (up.name === 'mecanique') mecaniqueLevel = up.level;

            // 5. Calcul des gains
            clickValue += (index + 1);
            up.price = Math.floor(up.price * 1.3);

            // 6. Mise à jour UI
            refreshButtonInfo(buttonElement, up.level, up.price);
            updateDisplay();
            checkLevelUp();
        });
    }
});

function addIconToScene(imagePath) {
    const img = document.createElement("img");
    img.src = imagePath;

    // Position aléatoire sur la scène
    const randomX = Math.random() * 80; // entre 0 et 80%
    const randomY = Math.random() * 80;

    img.style.left = `${randomX}%`;
    img.style.top = `${randomY}%`;

    sceneUpgradesContainer.appendChild(img);
}

//_____________Fonctions d'améliorations passives

cassette.addEventListener("click", () => {
    if (score < cassettePrice) return;

    score -= cassettePrice;
    cassetteQuantity += 1;
    passiveValue += 0.05 * clickValue;
    cassettePrice = cassettePrice * 2;
    addIconToScene("image/PC Cassette.png");
    refreshButtonInfo(cassette, cassetteQuantity, cassettePrice);
    updateDisplay();
    checkLevelUp();
});

album.addEventListener("click", () => {
    if (score < albumPrice) return;

    score -= albumPrice;
    albumQuantity += 1;
    passiveValue += 0.1 * clickValue;
    albumPrice = albumPrice * 2;
    addIconToScene("image/Album.png");
    refreshButtonInfo(album, albumQuantity, albumPrice);
    updateDisplay();
    checkLevelUp();
});

ticket.addEventListener("click", () => {
    if (score < ticketPrice) return;

    score -= ticketPrice;
    ticketQuantity += 1;
    passiveValue += 0.15 * clickValue;
    ticketPrice = ticketPrice * 2;
    addIconToScene("image/Ticket.png");
    refreshButtonInfo(ticket, ticketQuantity, ticketPrice);
    updateDisplay();
    checkLevelUp();
});

placesConcert.addEventListener("click", () => {
    if (score < placesConcertPrice) return;

    score -= placesConcertPrice;
    placesConcertQuantity += 1;
    passiveValue += 0.2 * clickValue;
    placesConcertPrice = placesConcertPrice * 2;
    addIconToScene("image/Places de concert.png");
    refreshButtonInfo(placesConcert, placesConcertQuantity, placesConcertPrice);
    updateDisplay();
    checkLevelUp();
});

casque.addEventListener("click", () => {
    if (score < casquePrice) return;

    score -= casquePrice;
    casqueQuantity += 1;
    passiveValue += 0.25 * clickValue;
    casquePrice = casquePrice * 2;
    addIconToScene("image/Casque.png");
    refreshButtonInfo(casque, casqueQuantity, casquePrice);
    updateDisplay();
    checkLevelUp();
});

worldTour.addEventListener("click", () => {
    if (score < worldTourPrice) return;

    score -= worldTourPrice;
    worldTourQuantity += 1;
    passiveValue += 0.3 * clickValue;
    worldTourPrice = worldTourPrice * 2;
    addIconToScene("image/PC World tour.png");
    refreshButtonInfo(worldTour, worldTourQuantity, worldTourPrice);
    updateDisplay();
    checkLevelUp();
});

window.addEventListener('DOMContentLoaded', () => {
    // Boutons d’amélioration par clic
    refreshButtonInfo(mediator, mediatorLevel, mediatorPrice);
    refreshButtonInfo(manche, mancheLevel, manchePrice);
    refreshButtonInfo(ampli, ampliLevel, ampliPrice);
    refreshButtonInfo(micro, microLevel, microPrice);
    refreshButtonInfo(corps, corpsLevel, corpsPrice);
    refreshButtonInfo(mecanique, mecaniqueLevel, mecaniquePrice);

    // Boutons de gain passif (niveau = quantité possédée)
    refreshButtonInfo(cassette, cassetteQuantity, cassettePrice);
    refreshButtonInfo(album, albumQuantity, albumPrice);
    refreshButtonInfo(ticket, ticketQuantity, ticketPrice);
    refreshButtonInfo(placesConcert, placesConcertQuantity, placesConcertPrice);
    refreshButtonInfo(casque, casqueQuantity, casquePrice);
    refreshButtonInfo(worldTour, worldTourQuantity, worldTourPrice);
});

function refreshButtonInfo(buttonEl, level, price) {
    const levelSpan = buttonEl.querySelector('.level');
    const priceSpan = buttonEl.querySelector('.price');

    if (levelSpan) levelSpan.textContent = `Niv ${level}`;
    if (priceSpan) {
        const roundedPrice = Math.floor(price);
        priceSpan.textContent = `${roundedPrice} €`;
    }

}

//_____________Fonction pour calculuer le niveau global

function getCommonLevel() {
    return Math.min(
        mediatorLevel,
        mancheLevel,
        ampliLevel,
        microLevel,
        corpsLevel,
        mecaniqueLevel
    );
}

//_____________Fonction de mise à jour du skin

const guitarImg = document.querySelector(".button-guitar");

function updateGuitarSkin() {
    const level = getCommonLevel();
    let selectedSkin = guitarSkins[0].src;

    for (const skin of guitarSkins) {
        if (level >= skin.level) {
            selectedSkin = skin.src;
        }
    }

    guitarImg.src = selectedSkin;
}

// ================== PARAMÈTRES / LUMINOSITÉ ==================

const settingsBtn = document.getElementById("settingsBtn");
const settingsPanel = document.getElementById("settingsPanel");
const brightnessSlider = document.getElementById("brightness");
const brightnessValue = document.getElementById("brightnessValue");

// Ouvrir / fermer le panneau
settingsBtn.addEventListener("click", () => {
    settingsPanel.classList.toggle("hidden");
});

// Charger la luminosité sauvegardée
const savedBrightness = localStorage.getItem("brightness") || 100;
brightnessSlider.value = savedBrightness;
brightnessValue.textContent = `${savedBrightness}%`;
document.documentElement.style.setProperty(
    "--brightness",
    `${savedBrightness}%`
);

// Modifier la luminosité
brightnessSlider.addEventListener("input", () => {
    const value = brightnessSlider.value;
    brightnessValue.textContent = `${value}%`;
    document.documentElement.style.setProperty("--brightness", `${value}%`);
    localStorage.setItem("brightness", value);
});

// Fermer si clic en dehors
document.addEventListener("click", (e) => {
    if (!settingsPanel.contains(e.target) && !settingsBtn.contains(e.target)) {
        settingsPanel.classList.add("hidden");
    }
});
const audio = document.getElementById('monAudio');
const toggleMusicBtn = document.getElementById('toggleMusic');

function lancerMusiqueAutomatique() {
    audio.play().then(() => {
        document.removeEventListener('click', lancerMusiqueAutomatique);
    }).catch(e => console.log("Attente d'interaction pour l'audio"));
}
document.addEventListener('click', lancerMusiqueAutomatique);

// Gestion du bouton Play/Pause dans les paramètres
toggleMusicBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        toggleMusicBtn.textContent = "Pause";
    } else {
        audio.pause();
        toggleMusicBtn.textContent = "Play";
    }
});



function getIncrement(name) {
    switch (name) {
        case 'mediator': return 1;
        case 'manche': return 2;
        case 'ampli': return 3;
        case 'micro': return 4;
        case 'corps': return 5;
        case 'mecanique': return 6;
        default: return 0;
    }
}

document.querySelector('.mediator').addEventListener('click', () => tryUpgrade('mediator'));
document.querySelector('.manche').addEventListener('click', () => tryUpgrade('manche'));
document.querySelector('.ampli').addEventListener('click', () => tryUpgrade('ampli'));
document.querySelector('.micro').addEventListener('click', () => tryUpgrade('micro'));
document.querySelector('.corps').addEventListener('click', () => tryUpgrade('corps'));
document.querySelector('.mecanique').addEventListener('click', () => tryUpgrade('mecanique'));

window.addEventListener('DOMContentLoaded', () => {
    upgrades.forEach(u => {
        const btn = document.querySelector(`.${u.name}`);
        if (btn) refreshButtonInfo(btn, u.level, u.price);
    });
});

// Sélection des nouveaux éléments
const volumeSlider = document.getElementById("volumeSlider");
const volumeValue = document.getElementById("volumeValue");

// Initialisation du volume par défaut (50%)
audio.volume = 0.5;

// Écouteur pour changer le volume
volumeSlider.addEventListener("input", () => {
    const vol = volumeSlider.value;
    audio.volume = vol; // Modifie le volume de l'élément <audio>
    volumeValue.textContent = `${Math.round(vol * 100)}%`;
});