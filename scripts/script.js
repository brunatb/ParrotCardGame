function startGame(){
  let numberOfCards = prompt("Com quantas cartas você gostaria de jogar?");
  while(numberOfCards < 4 || numberOfCards > 14 || numberOfCards % 2 !== 0) {
    numberOfCards = prompt("Com quantas cartas você gostaria de jogar?");
  }

  cardsDistribution(numberOfCards);
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
      <li class="card">
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
      <li class="card">
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

function comparador() { 
	return Math.random() - 0.5; 
}

startGame();