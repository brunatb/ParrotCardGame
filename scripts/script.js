let numberOfMoves = 0;
let clockId;

function startGame(){
  let numberOfCards = prompt("Com quantas cartas você gostaria de jogar?");
  while(numberOfCards < 4 || numberOfCards > 14 || numberOfCards % 2 !== 0) {
    numberOfCards = prompt("Com quantas cartas você gostaria de jogar?");
  }

  cardsDistribution(numberOfCards);
  clockId = setInterval(() => {
    const clock = document.querySelector(".clock span");
    clock.innerHTML = parseInt(clock.innerHTML) + 1;
  }, 1000);
}

function cardsDistribution(numberOfCards) {
  const parrots = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];
  const selectedParrots = []

  parrots.sort(comparador);
  for(let i = 0; i < numberOfCards/2; i++){
    selectedParrots.push(parrots[i]);
    selectedParrots.push(parrots[i]);
  }

  selectedParrots.sort(comparador);
  showCards(selectedParrots);
}

function showCards(selectedParrots) {
  const upRow = document.querySelector(".up-row");
  const downRow = document.querySelector(".down-row");

  for(let i = 0; i < selectedParrots.length/2; i++) {
    upRow.innerHTML+= `
      <li class="card" onclick="turnCard(this)">
        <div class="face front-face"> 
          <img src="./images/front.png" alt="Imagem de  papagaio">
        </div>
        <div class="face back-face">
          <img src="./images/${selectedParrots[i]}.gif" alt="Gif de papagaio">
        </div>
      </li>
    `
  }

  for(let j = selectedParrots.length/2; j < selectedParrots.length; j++){
    downRow.innerHTML+= `
      <li class="card" onclick="turnCard(this)">
        <div class="face front-face"> 
          <img src="./images/front.png" alt="Imagem de  papagaio">
        </div>
        <div class="face back-face">
          <img src="./images/${selectedParrots[j]}.gif" alt="Gif de papagaio">
        </div>
      </li>
    `
  }
}

function turnCard(card, check=true) {
  card.classList.toggle("turned");
  const frontFace = card.querySelector(".front-face");
  const backFace = card.querySelector(".back-face");

  frontFace.classList.toggle("rotate-front");
  backFace.classList.toggle("rotate-back");

  if(check) checkCards();
}

function checkCards() {
  const turnedCards = document.querySelectorAll(".turned");
  numberOfMoves++;
  if(turnedCards.length === 1){
    turnedCards[0].setAttribute("onclick","");
    return;
  }

  disableOrEnableCards("disable");

  const firstCardSrc = turnedCards[0].querySelector(".back-face img").src;
  const secondCardSrc = turnedCards[1].querySelector(".back-face img").src;

  if(firstCardSrc === secondCardSrc) {
    turnedCards[0].classList.remove("turned");
    turnedCards[1].classList.remove("turned");

    turnedCards[0].classList.add("matched");
    turnedCards[1].classList.add("matched");

    disableOrEnableCards("enable");
    turnedCards[0].setAttribute("onclick","");
    turnedCards[1].setAttribute("onclick","");

    checkEndOfGame()
  }else {
    setTimeout(turnCard, 1000, turnedCards[0], false);
    setTimeout(turnCard, 1000, turnedCards[1], false);
    setTimeout(disableOrEnableCards, 1000, "enable");
  }

}

function disableOrEnableCards(action) {
  const allCards = document.querySelectorAll(".card");

  if(action === "disable") {
    for(let i = 0; i < allCards.length; i++) {
      allCards[i].setAttribute("onclick", "")
    }
  } else {
    for(let i = 0; i < allCards.length; i++) {
      allCards[i].setAttribute("onclick", "turnCard(this)")
    }
  } 
}

function checkEndOfGame() {
  const allCards = document.querySelectorAll(".card");
  const matchedCards = document.querySelectorAll(".matched");

  if(allCards.length === matchedCards.length) {
    clearInterval(clockId);
    disableOrEnableCards("disable");

    const clock = document.querySelector(".clock span");
    setTimeout(alert, 1000, `Você ganhou em ${numberOfMoves} jogadas e ${clock.innerHTML} segundos`)
  }
}

function comparador() { 
	return Math.random() - 0.5; 
}

startGame();