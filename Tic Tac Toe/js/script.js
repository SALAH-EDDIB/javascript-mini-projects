const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'

const ceelElement = document.querySelectorAll("[data-cell]");
const board = document.querySelector("#board");
const winningMessage = document.querySelector('[data-winning-message-text]')
const winningMessageContainer = document.querySelector('#winningMessage')
const restartBtn = document.querySelector('#restartButton')

const WINNING_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

restartBtn.addEventListener('click', startGame)
let circleTurn
startGame()

function startGame() {

    circleTurn = false

    ceelElement.forEach((ceel) => {
        ceel.classList.remove(X_CLASS)
        ceel.classList.remove(CIRCLE_CLASS)
        ceel.addEventListener("click", handleClick, {
            once: true
        });
    });

    boardHover()
    winningMessageContainer.classList.remove('show')

}



function handleClick(e) {

    const cell = e.target
    const currenTClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currenTClass)
    if (checkWin(currenTClass)) {
        endGame(false)

    } else if (itDraw()) {
        endGame(true)
    } else {
        swapTurn()
        boardHover()
    }



}


function placeMark(cell, currenTClass) {
    cell.classList.add(currenTClass)
}

function swapTurn() {
    circleTurn = !circleTurn
}

function boardHover() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)

    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currenTClass) {
    return WINNING_COMBINATION.some(combinaton => {
        return combinaton.every(index => {
            return ceelElement[index].classList.contains(currenTClass)
        })
    })
}

function endGame(draw) {
    if (draw) {
        winningMessage.innerText = `draw!`

    } else {
        winningMessage.innerText = `${circleTurn ? "O's" : "X's" } Wins!`
    }
    winningMessageContainer.classList.add('show')
}

function itDraw() {
    return [...ceelElement].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}