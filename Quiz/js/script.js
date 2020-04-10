const startbtn = document.querySelector('#start-btn')
const nextbtn = document.querySelector('#next-btn')

const questionContainer = document.querySelector('#question-container')

let sheffledQuestion, currentQuestionIndex;

const questionElement = document.querySelector('#question')

const answerbuttons = document.querySelector('#answer-buttons')

startbtn.addEventListener('click', startGame)

nextbtn.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})


function startGame() {
    startbtn.classList.add('hide')
    questionContainer.classList.remove('hide')
    sheffledQuestion = questions.sort(() => {
        Math.random() - .5
    })
    currentQuestionIndex = 0
    setNextQuestion()
}

function setNextQuestion() {
    resetStat();
    showQuestion(sheffledQuestion[currentQuestionIndex])

}

function showQuestion(question) {

    questionElement.innerText = question.question
    question.answer.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerbuttons.appendChild(button)


    });

}

function resetStat() {
    clearStatuClass(document.body)
    nextbtn.classList.add('hide')
    while (answerbuttons.firstChild) {
        answerbuttons.removeChild(answerbuttons.firstChild)
    }
}

function selectAnswer(e) {

    const selectbtn = e.target
    const correct = selectbtn.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerbuttons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (sheffledQuestion.length > currentQuestionIndex + 1) {
        nextbtn.classList.remove('hide')

    } else {
        startbtn.innerText = 'Restart'
        startbtn.classList.remove('hide')
    }

}

function setStatusClass(element, correct) {
    clearStatuClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }

}

function clearStatuClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [{
    question: 'What is 2 + 2',

    answer: [{
        text: '4',
        correct: true
    }, {
        text: '22',
        correct: false
    }]


}]