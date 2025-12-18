let score = 0;
let clickValue = 1;
const scoreDisplay = document.getElementById("score");

const guitarClick = document.querySelector(".onclick");

function updateDisplay() {
    scoreDisplay.textContent = Math.floor(score);
}

guitarClick.addEventListener("click",() => {
    score += clickValue;
    updateDisplay();
   
});
