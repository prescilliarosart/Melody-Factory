let score = 0;
let clickValue = 1;
let mediatorLevel = 0;
let mediatorPrice = 10;

const scoreDisplay = document.getElementById("score");
const guitarClick = document.querySelector(".onclick");
const mediator = document.querySelector(".mediator");

function updateDisplay() {
    scoreDisplay.textContent = Math.floor(score);
}

guitarClick.addEventListener("click", () => {
    score += clickValue;
    updateDisplay();

});


mediator.addEventListener("click", () => {
    if (score < mediatorPrice) {
        return
    }

    score -= mediatorPrice;
    mediatorLevel += 1;
    clickValue += 1;
    mediatorPrice = mediatorPrice * 1.2;
    updateDisplay();

});


