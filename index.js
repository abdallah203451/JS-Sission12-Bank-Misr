const gameBoard = document.getElementById("gameBoard");
const resetButton = document.getElementById("resetButton");
const message = document.getElementById("message");
let flippedCards = [];
let matchedCards = [];
let timeoutId;

const images = [
  "./assets/cherries.png",
  "./assets/chili.png",
  "./assets/grapes.png",
  "./assets/lemon.png",
  "./assets/orange.png",
  "./assets/pineapple.png",
  "./assets/strawberry.png",
  "./assets/watermelon.png",
  "./assets/cherries.png",
  "./assets/chili.png",
  "./assets/grapes.png",
  "./assets/lemon.png",
  "./assets/orange.png",
  "./assets/pineapple.png",
  "./assets/strawberry.png",
  "./assets/watermelon.png",
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  gameBoard.innerHTML = "";
  shuffle(images);
  for (let i = 0; i < images.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image = images[i];

    const img = document.createElement("img");
    img.src = images[i];
    card.appendChild(img);

    card.addEventListener("click", handleCardClick);
    gameBoard.appendChild(card);
  }
}

function handleCardClick(event) {
  const card = event.currentTarget;

  if (
    flippedCards.length < 2 &&
    !card.classList.contains("flipped") &&
    !matchedCards.includes(card)
  ) {
    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      clearTimeout(timeoutId);
      checkForMatch();
    } else {
      timeoutId = setTimeout(() => {
        flippedCards.forEach((card) => card.classList.remove("flipped"));
        flippedCards = [];
      }, 5000);
    }
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.image === card2.dataset.image) {
    matchedCards.push(card1, card2);
    flippedCards = [];
    setTimeout(() => {
      card1.firstChild.style.display = "none";
      card2.firstChild.style.display = "none";
      card1.style.backgroundColor = "green";
      card2.style.backgroundColor = "green";
    }, 1000);

    if (matchedCards.length === images.length) {
      message.textContent = "You win!";
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 1000);
  }
}

resetButton.addEventListener("click", () => {
  clearTimeout(timeoutId);
  message.textContent = "";
  flippedCards = [];
  matchedCards = [];
  createBoard();
});

window.onload = createBoard;
