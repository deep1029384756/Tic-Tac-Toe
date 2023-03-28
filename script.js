const boxElements = document.querySelectorAll(".box");
const gameContainer = document.querySelector(".game__container");
const winningText = document.querySelector(".game-winner__text");
const winningConetnt = document.querySelector(".game-winner");
const restart = document.querySelector(".restart");
const x_class = "x";
const circle_class = "circle";
let circleTurn;

//winning combination
const winning_combo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const tictactoeFunctions = {
startGame : function(){
    boxElements.forEach((box) => {
        box.addEventListener("click", tictactoeFunctions.handleClick, { once: true }); //once means cant click again
      });
},
handleClick : function(e){
    const box = e.target;
    //console.log(e);
    const currentClass = circleTurn ? x_class : circle_class;
    //
    //placemark
    tictactoeFunctions.placeMark(box, currentClass);
    //check for win
    var checkwin = tictactoeFunctions.checkWin(currentClass);
    if (checkwin) {
      tictactoeFunctions.endGame(false);
    }
    //check for draw
    if (!checkwin && tictactoeFunctions.checkDraw()) {
      tictactoeFunctions.endGame(true);
    }
    //switchturn
     tictactoeFunctions.switchTurn();
     tictactoeFunctions.setBoardHover(currentClass);
},
placeMark : function(box, currentClass) {
    box.classList.add(currentClass);
  },
endGame :function(draw){
    if (draw) {
        winningText.innerText = `DRAW, TRY AGAIN`;
        tictactoeFunctions.restartGame();
      } else {
        winningText.innerText = `${circleTurn ? "Player X" : "Player O"} WON`;
      }
      winningConetnt.classList.add("show");

},
switchTurn : function(){
    circleTurn = !circleTurn;
},
setBoardHover : function(currentClass) {
    gameContainer.classList.remove(x_class);
    gameContainer.classList.remove(circle_class);
    if (currentClass === x_class) gameContainer.classList.add(circle_class);
    else gameContainer.classList.add(x_class);
  },
checkWin : function(currentClass) {
    return winning_combo.some((combo) => {
      return combo.every((idx) => {
        return boxElements[idx].classList.contains(currentClass);
      });
    });
  },
checkDraw : function(){
    return [...boxElements].every((box) => {
        if (box.classList.contains(x_class) || box.classList.contains(circle_class))
          return true;
        else return false;
      });
},
restartGame : function(){
    boxElements.forEach((box) => {
        box.classList.remove(x_class);
        box.classList.remove(circle_class);
      });
      gameContainer.classList.remove(x_class);
      gameContainer.classList.remove(circle_class);
      if (circleTurn) gameContainer.classList.add(x_class);
      else gameContainer.classList.add(circle_class);
      winningConetnt.classList.remove("show");
     tictactoeFunctions.startGame();
}
}

// call and start the game
window.onload = function() {
    tictactoeFunctions.startGame(); 
}

// restart button handling
restart.addEventListener("click",  tictactoeFunctions.restartGame);

