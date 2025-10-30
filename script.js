const container = document.querySelector(".container");
const choices = document.querySelectorAll(".choice");
const choicesContainer = document.querySelector(".choices");
const yourScoreElement = document.getElementById("your-score");
const compScoreElement = document.getElementById("computer-score");

const rulebtn = document.getElementById("rulebtn");
const rulesBox = document.getElementById("rulesBox");
const crossbtn = document.getElementById("crossbtn");

const nextbtn = document.getElementById("nextbtn");
let swapped = false;

let yourScore = localStorage.getItem("yourScore") || 0;
let compScore = localStorage.getItem("compScore") || 0;

// storing scores
yourScoreElement.textContent = yourScore;
compScoreElement.textContent = compScore;

// Available Options
const options = ["rock", "paper", "scissors"];

// when the user click choice
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.id;
    const compChoice = options[Math.floor(Math.random() * options.length)];
    showResult(userChoice, compChoice);
  });
});

function showResult(userChoice, compChoice) {
  // Hiding the choices
  choicesContainer.style.display = "none";

  let winnerText = "";
  let isTie = false;
  if (userChoice === compChoice) {
    winnerText = "TIE UP";
    isTie = true;
  } else if (
    (userChoice == "rock" && compChoice == "scissors") ||
    (userChoice == "paper" && compChoice == "rock") ||
    (userChoice == "scissors" && compChoice == "paper")
  ) {
    winnerText = "YOU WON<br><h3>AGAINST PC</h3>";
    yourScore++;
    nextbtn.style.display = "block";

    if (!swapped) {
      nextbtn.style.right = "30px";
      rulebtn.style.right = "140px";
      rulesBox.style.right = "140px";
      swapped = true;
    }
  } else {
    winnerText = "YOU LOST<br><h3>AGAINST PC</h3>";
    compScore++;
    if (swapped) {
      nextbtn.style.display = "none";
      rulebtn.style.right = "30px";
      rulesBox.style.right = "30px";
      swapped = false;
    }
  }
  localStorage.setItem("yourScore", yourScore);
  localStorage.setItem("compScore", compScore);

  // updating the scores
  yourScoreElement.textContent = yourScore;
  compScoreElement.textContent = compScore;

  const resultdiv = document.createElement("div");
  resultdiv.classList.add("result-div");

  if (isTie) {
    resultdiv.innerHTML = `
      <div class="result-container">
        <div class="picked">
          <h1>YOU PICKED</h1>
          <img src="./asserts/${userChoice}1.png" alt="${userChoice}">
        </div>
        <div class="message">
        <h2>${winnerText}</h2>
          <button id="tie-btn">REPLAY</button>
        </div>
        <div class="picked">
          <h1>PC PICKED</h1>
          <img src="./asserts/${compChoice}1.png" alt="${compChoice}">
        </div>
      </div>
    `;
  } else {
    let userWon = winnerText.includes("YOU WON");
    let winnerSide = userWon ? "user" : "comp";

    resultdiv.innerHTML = `
  <div class="result-container">
    <div class="picked ${winnerSide === "user" ? "winner-effect" : ""}">
        <div class="ring ring1"></div>
        <div class="ring ring2"></div>
        <div class="ring ring3"></div>
        <h1>YOU PICKED</h1>
        <img src="./asserts/${userChoice}1.png" alt="${userChoice}" >
    </div>
    <div class="message">
        <h1>${winnerText}</h1>
        <button id="play-again">PLAY AGAIN</button>
    </div>
    <div class="picked ${winnerSide === "comp" ? "winner-effect" : ""}">
        <div class="ring ring1"></div>
        <div class="ring ring2"></div>
        <div class="ring ring3"></div>
        <h1>PC PICKED</h1>
        <img src="./asserts/${compChoice}1.png" alt="${compChoice}" >
    </div>
  </div>
  `;
  }

  container.appendChild(resultdiv);

  const playAgainBtn = document.getElementById("play-again");
  if (playAgainBtn) {
    playAgainBtn.addEventListener("click", () => {
      resultdiv.remove();
      choicesContainer.style.display = "flex";
      rulebtn.style.right = "30px";
      rulesBox.style.right = "30px";
    });
  }

  const tiebtn = document.getElementById("tie-btn");
  if (tiebtn) {
    tiebtn.addEventListener("click", () => {
      resultdiv.remove();
      choicesContainer.style.display = "flex";
    });
  }
}

rulebtn.addEventListener("click", () => {
  rulesBox.style.display = "block";
});
crossbtn.addEventListener("click", () => {
  rulesBox.style.display = "none";
});

nextbtn.addEventListener("click", () => {
  window.location.href = "./next/nextpage.html";
});
