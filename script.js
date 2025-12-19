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
const scoreDisplay = document.getElementById("score");
const guitarClick = document.querySelector(".onclick");

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

mediator.addEventListener("click", () => {
    if (score < mediatorPrice) return;

    score -= mediatorPrice;
    mediatorLevel += 1;
    clickValue += 1;
    mediatorPrice = mediatorPrice * 1.7;
    refreshButtonInfo(mediator, mediatorLevel, mediatorPrice);
    updateDisplay();

});

manche.addEventListener("click", () => {
    if (score < manchePrice) return;

    score -= manchePrice;
    mancheLevel += 1;
    clickValue += 2;
    manchePrice = manchePrice * 1.6;
    refreshButtonInfo(manche, mancheLevel, manchePrice);
    updateDisplay();

});

ampli.addEventListener("click", () => {
    if (score < ampliPrice) return;

    score -= ampliPrice;
    ampliLevel += 1;
    clickValue += 3;
    ampliPrice = ampliPrice * 1.5;
    refreshButtonInfo(ampli, ampliLevel, ampliPrice);
    updateDisplay();

});

micro.addEventListener("click", () => {
    if (score < microPrice) return;

    score -= microPrice;
    microLevel += 1;
    clickValue += 4;
    microPrice = microPrice * 1.4;
    refreshButtonInfo(micro, microLevel, microPrice);
    updateDisplay();

});

corps.addEventListener("click", () => {
    if (score < corpsPrice) return;

    score -= corpsPrice;
    corpsLevel += 1;
    clickValue += 5;
    corpsPrice = corpsPrice * 1.3;
    refreshButtonInfo(corps, corpsLevel, corpsPrice);
    updateDisplay();

});

mecanique.addEventListener("click", () => {
    if (score < mecaniquePrice) return;

    score -= mecaniquePrice;
    mecaniqueLevel += 1;
    clickValue += 6;
    mecaniquePrice = mecaniquePrice * 1.2;
    refreshButtonInfo(mecanique, mecaniqueLevel, mecaniquePrice);
    updateDisplay();

});

//_____________Fonctions d'améliorations passives

cassette.addEventListener("click", () => {
    if (score < cassettePrice) return;

    score -= cassettePrice;
    cassetteQuantity += 1;
    passiveValue += 0.05 * clickValue;
    cassettePrice = cassettePrice * 2;
    refreshButtonInfo(cassette, cassetteQuantity, cassettePrice);
    updateDisplay();
    addUpgradeToScene("image/PC Cassette.png");
});

album.addEventListener("click", () => {
    if (score < albumPrice) return;

    score -= albumPrice;
    albumQuantity += 1;
    passiveValue += 0.1 * clickValue;
    albumPrice = albumPrice * 2;
    refreshButtonInfo(album, albumQuantity, albumPrice);
    updateDisplay();
    addUpgradeToScene("image/Album.png");
});

ticket.addEventListener("click", () => {
    if (score < ticketPrice) return;

    score -= ticketPrice;
    ticketQuantity += 1;
    passiveValue += 0.15 * clickValue;
    ticketPrice = ticketPrice * 2;
    refreshButtonInfo(ticket, ticketQuantity, ticketPrice);
    updateDisplay();
    addUpgradeToScene("image/Ticket.png");
});

placesConcert.addEventListener("click", () => {
    if (score < placesConcertPrice) return;

    score -= placesConcertPrice;
    placesConcertQuantity += 1;
    passiveValue += 0.2 * clickValue;
    placesConcertPrice = placesConcertPrice * 2;
    refreshButtonInfo(placesConcert, placesConcertQuantity, placesConcertPrice);
    updateDisplay();
    addUpgradeToScene("image/Places de concert.png");
});

casque.addEventListener("click", () => {
    if (score < casquePrice) return;

    score -= casquePrice;
    casqueQuantity += 1;
    passiveValue += 0.25 * clickValue;
    casquePrice = casquePrice * 2;
    refreshButtonInfo(casque, casqueQuantity, casquePrice);
    updateDisplay();
    addUpgradeToScene("image/Casque.png");
});

worldTour.addEventListener("click", () => {
    if (score < worldTourPrice) return;

    score -= worldTourPrice;
    worldTourQuantity += 1;
    passiveValue += 0.3 * clickValue;
    worldTourPrice = worldTourPrice * 2;
    refreshButtonInfo(worldTour, worldTourQuantity, worldTourPrice);
    updateDisplay();
    addUpgradeToScene("image/PC World tour.png");
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
const sceneUpgradesContainer = document.querySelector(".scene-upgrades");

function addUpgradeToScene(imageSrc) {
    const img = document.createElement("img");
    img.src = imageSrc;

    const maxX = sceneUpgradesContainer.clientWidth - 64;
    const maxY = sceneUpgradesContainer.clientHeight - 64;

    img.style.left = Math.random() * maxX + "px";
    img.style.top = Math.random() * maxY + "px";

    sceneUpgradesContainer.appendChild(img);
}