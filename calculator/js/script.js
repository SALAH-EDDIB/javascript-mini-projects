class Calculator {
    constructor(previousOperentTextElement, currentOperentTextElement) {
        this.previousOperentTextElement = previousOperentTextElement
        this.currentOperentTextElement = currentOperentTextElement
        this.clear();
    }

    clear() {
        this.previousOperent = '';
        this.currentOperent = '';
        this.operation = undefined;
    }

    delete() {

        this.currentOperent = this.currentOperent.toString().slice(0, -1)

    }
    appendNumber(number) {
        if (number === "." && this.currentOperent.includes('.')) return
        this.currentOperent = this.currentOperent.toString() + number.toString()

    }

    chooseOperation(operation) {
        if (this.currentOperent === '') return
        if (this.previousOperent !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperent = this.currentOperent + ' ' + this.operation
        this.currentOperent = ''

    }

    compute() {

        let computation;
        const prev = parseFloat(this.previousOperent)
        const current = parseFloat(this.currentOperent)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return

        }
        this.currentOperent = computation
        this.operation = undefined
        this.previousOperent = ''

    }
    updateDisplay() {
        this.currentOperentTextElement.innerText = this.currentOperent

        this.previousOperentTextElement.innerText = this.previousOperent

    }
}






const numberButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperentTextElement = document.querySelector('[data-previous-operent]')
const currentOperentTextElement = document.querySelector('[data-current-operent]')


const calculator = new Calculator(previousOperentTextElement, currentOperentTextElement)


numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML)
        calculator.updateDisplay()
    })

})
operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerHTML)
        calculator.updateDisplay()
    })

})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})