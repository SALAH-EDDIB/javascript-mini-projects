function animatedForm() {
    const arrow = document.querySelectorAll('.fa-arrow-down')

    arrow.forEach(arrow => {
        arrow.addEventListener('click', () => {
            const input = arrow.previousElementSibling
            const parent = arrow.parentElement
            const nextForm = parent.nextElementSibling

            if (input.type === 'text' && valideUser(input)) {

                nextSlide(parent, nextForm)
            } else if (input.type === 'email' && valideEmail(input)) {
                nextSlide(parent, nextForm)
            } else if (input.type === 'password' && valideUser(input)) {

                nextSlide(parent, nextForm)
            } else {
                parent.style.animation = 'shake .5s ease'
            }

            parent.addEventListener('animationend', () => {
                parent.style.animation = ""
            })
        })
    })





}

function valideUser(user) {
    if (user.value.length < 6) {
        error('#ff6b6b')
    } else {
        error('#1dd1a1')
        return true
    }
}

function valideEmail(email) {
    const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (validation.test(email.value)) {
        error('#1dd1a1')
        return true

    } else {
        error('#ff6b6b')
    }

}


function error(color) {
    document.body.style.backgroundColor = color
}


function nextSlide(parent, nextForm) {


    parent.classList.add('innactive')
    parent.classList.remove('active')
    nextForm.classList.add('active')

}



animatedForm()