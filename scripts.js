let playerScore = 0;
let computerScore = 0;

let imageButtons = document.getElementsByClassName('play-image');

for (i = 0; i < imageButtons.length; i++) {
    imageButtons[i].addEventListener('click', buttonClick);
};

function buttonClick(event){
    let clickedButton = event.target;
    let playerChoice = evalClick(clickedButton);
    let computerChoice = computerPlay();
    let playerOutcome = evalRound(playerChoice, computerChoice);
    let roundOutcome = createOutcomeText(playerChoice, computerChoice, playerOutcome);
    displayRoundOutcome(roundOutcome);
    incrementScore(playerOutcome);
    if (playerScore == 5 || computerScore == 5) {
        promptNewGame();
    } else {
        return;
    };
};

function evalClick(clickedButton) {
    let playerChoice = clickedButton.getAttribute('id')
    return playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1);
};
function computerPlay() {
    let choice = Math.random();
    if (choice <= 0.333) {
        return "Rock";
    } else if (choice > 0.333 && choice <= 0.666) {
        return "Paper";
    } else {
        return "Scissors";
    }
};

let playerScoreSection = document.getElementById('player-score-section');
let computerScoreSection = document.getElementById('computer-score-section');
let wholeScoreSection = document.getElementById('score-section');

let whiteGrad = 'rgba(0, 0, 0, 0)';
let greenGrad = 'radial-gradient(circle, rgba(0, 255, 0, 0.5), rgba(0, 255, 0, 0.25), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))';
let redGrad = 'radial-gradient(circle, rgba(255, 0, 0, 0.5), rgba(255, 0, 0, 0.25), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))';
let yellowGrad = 'radial-gradient(circle, rgba(255, 255, 0, 0.5), rgba(255, 255, 0, 0.125), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))';

function evalRound(playerChoice, computerChoice) {
    if (playerChoice == "Rock" && computerChoice == "Paper"
        || playerChoice == "Paper" && computerChoice == "Scissors"
        || playerChoice == "Scissors" && computerChoice == "Rock") {
            playerOutcome = "lose";
            computerScoreSection.setAttribute('style', 'background-image: ' + redGrad); 
            playerScoreSection.setAttribute('style', 'background-image: ' + whiteGrad);
            wholeScoreSection.setAttribute('style', 'background-image: ' + whiteGrad);
    } else if (playerChoice == "Paper" && computerChoice == "Rock"
        || playerChoice == "Scissors" && computerChoice == "Paper"
        || playerChoice == "Rock" && computerChoice == "Scissors") {
            playerOutcome = "win";
            playerScoreSection.setAttribute('style', 'background-image: ' + greenGrad);
            computerScoreSection.setAttribute('style', 'background-image: ' + whiteGrad);
            wholeScoreSection.setAttribute('style', 'background-image: ' + whiteGrad);
    } else {
        playerOutcome = "tie";
        playerScoreSection.setAttribute('style', 'background-image: ' + whiteGrad);
        computerScoreSection.setAttribute('style', 'background-image: ' + whiteGrad);
        wholeScoreSection.setAttribute('style', 'background-image: ' + yellowGrad);
    };
    return playerOutcome;
};
function createOutcomeText(playerChoice, computerChoice, playerOutcome) {
    if (playerOutcome === "win") {
        return "You won that round! " + playerChoice + " beats " + computerChoice + "!";
    } else if (playerOutcome === "lose") {
        return "You lost that round. " + computerChoice + " beats " + playerChoice + "!";
    } else if (playerOutcome === "tie") {
        return "You tied. Both of you played " + playerChoice + "!";
    } else {
        return null;
    }
};

let roundOutcomeText = document.getElementById('round-outcome-text');

function displayRoundOutcome(roundOutcome) {
    roundOutcomeText.textContent = roundOutcome;
};
function incrementScore(playerOutcome) {
    if (playerOutcome == 'win') {
        playerScore += 1;
        document.getElementById('player-score').textContent = playerScore.toString();
    } else if (playerOutcome == 'lose') {
        computerScore += 1;
        document.getElementById('computer-score').textContent = computerScore.toString();
    } else {
        return;
    };
};
function promptNewGame() {
    let gameOverMessage = evalGame() + "\n\n Do you want to play again?";
    let choiceToPlayAgain = confirm(gameOverMessage);
    if (choiceToPlayAgain == true) {
        playerScore = 0;
        document.getElementById('player-score').textContent = '0';
        computerScore = 0;
        document.getElementById('computer-score').textContent = '0';
        playerScoreSection.setAttribute('style', 'background-image: ' + whiteGrad);
        computerScoreSection.setAttribute('style', 'background-image: ' + whiteGrad);
        wholeScoreSection.setAttribute('style', 'background-image: ' + whiteGrad);
        roundOutcomeText.textContent = '';
    } else {
        return;
    }
}
function evalGame() {
    if (playerScore == 5) {
        return "Congratulations! You won the game.";
    } else {
        return "Sorry, you lost the game.";
    }
};