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
    console.log(playerOutcome);
    // let roundOutcome = displayRoundOutcome(playerChoice, computerChoice, playerOutcome);
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
function evalRound(playerChoice, computerChoice) {
    if (playerChoice == "Rock" && computerChoice == "Paper"
        || playerChoice == "Paper" && computerChoice == "Scissors"
        || playerChoice == "Scissors" && computerChoice == "Rock") {
            playerOutcome = "lose";
    } else if (playerChoice == "Paper" && computerChoice == "Rock"
        || playerChoice == "Scissors" && computerChoice == "Paper"
        || playerChoice == "Rock" && computerChoice == "Scissors") {
            playerOutcome = "win";
    } else {
        playerOutcome = "tie";
    };
    return playerOutcome;
};
// function displayRoundOutcome(playerChoice, computerChoice, playerOutcome) {
//     if (playerOutcome === "win") {
//         return "You win! " + playerChoice + " beats " + computerChoice + "!";
//     } else if (playerOutcome === "lose") {
//         return "You lose! " + computerChoice + " beats " + playerChoice + "!";
//     } else if (playerOutcome === "tie") {
//         return "You tied! Both of you played " + playerChoice + "!";
//     } else {
//         return null;
//     }
// };
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