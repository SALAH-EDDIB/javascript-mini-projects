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

let played


startGame()

function startGame() {

    circleTurn = false


    played = false

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

    if (cell.classList.contains(CIRCLE_CLASS)) {


        return

    }
    const currenTClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currenTClass)
    circlePlayer()
    if (checkWin(currenTClass)) {
        endGame(false)

    } else if (itDraw()) {
        endGame(true)
    } else {
        // swapTurn()

        boardHover()

    }



}


function placeMark(cell, currenTClass) {
    cell.classList.add(currenTClass)
}

// function swapTurn() {
//     circleTurn = !circleTurn
// }

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

function think(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function circlePlayer() {

    circleTurn = true








    if ([checkceel(0) || checkceel(1) || checkceel(2) || checkceel(3) || checkceel(5) || checkceel(6) || checkceel(7) || checkceel(8)] && played == false && !checkceel(4)) {
        played = true
        placecercle(4)


    } else if (!checkceel(0) && played === false) {
        played = true
        placecercle(0)
    } else if (checkceel(0, 1) || checkceel(5, 8) || checkceel(6, 4)) {
        placecercle(2)
    } else if (checkceel(0, 3) || checkceel(2, 4) || checkceel(7, 8)) {
        placecercle(6)
    } else if (checkceel(0, 4) || checkceel(2, 5) || checkceel(6, 7)) {
        placecercle(8)
    } else if (checkceel(0, 6) || checkceel(4, 5)) {
        placecercle(3)
    } else if (checkceel(4, 1) || checkceel(6, 8)) {
        placecercle(7)
    } else if (checkceel(2, 8) || checkceel(3, 4)) {
        placecercle(5)


    } else if (checkceel(0, 2) || checkceel(4, 7)) {
        placecercle(1)


    }



    circleTurn = false

}


function checkceel(ceel1, ceel2) {

    if (ceel1 != null && ceel2 == null) {
        return ceelElement[ceel1].classList.contains(X_CLASS)
    } else if (ceel1 != null && ceel2 != null) {
        return ceelElement[ceel1].classList.contains(X_CLASS) && ceelElement[ceel2].classList.contains(X_CLASS)
    }


}

function placecercle(ceel) {
    ceelElement[ceel].classList.add(CIRCLE_CLASS)
}