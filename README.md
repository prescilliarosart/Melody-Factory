# Melody-Factory

Un Idle Game sur le thème de la Musique !

#Projet 1 de la teamMew

Bonjour de la part de Kuider, Prescillia, Sophie, et Stacy.
<br>
Bienvenue à vous qui êtes intéressés par notre projet.
(Feel free to fork !)

guitarClick.addEventListener("click", (e) => {
    score += clickValue;
    updateDisplay();
    spawnFloatingNumbers(e);
});

setInterval(() => {
    score += passiveValue;
    updateDisplay();

}, 1000);
