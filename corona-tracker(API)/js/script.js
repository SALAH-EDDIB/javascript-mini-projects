//*   :::::::::::::::::::::::         Selectors


const infected = document.querySelector('.infected')
const recovered = document.querySelector('.recovered')
const deaths = document.querySelector('.deaths')
const date = document.querySelectorAll('.date')
const select = document.querySelector('.countries')
const countrySelected = document.querySelector('.country')





//!  ::::::::::::::::::::::            Function

fetch("https://covid-193.p.rapidapi.com/statistics", {

    method: "GET",
    headers: {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "3cf2dd2fbcmsh804698fa024c4a5p112607jsn954ea7d83d6b"
    }
}).then(Response => {
    return Response.json()

}).then(data => {
    console.log(data);

    data.response.forEach((data, index) => {

        if (index === 74) {
            select.innerHTML += `<option selected >${index}- ${data.country}</option>`
        } else {
            select.innerHTML += `<option >${index}- ${data.country}</option>`
        }

    })

    select.addEventListener('change', countries)

    function countries() {

        let index = parseFloat(select.value)

        const country = data.response[index]


        const active = country.cases.active
        const recoveries = country.cases.recovered
        const dead = country.deaths.total
        const day = country.day

        countrySelected.innerText = country.country
        infected.innerText = active
        recovered.innerText = recoveries
        deaths.innerText = dead
        date.forEach(date => {
            date.innerText = day
        })


    }

    const country = data.response[74]


    const active = country.cases.active
    const recoveries = country.cases.recovered
    const dead = country.deaths.total
    const day = country.day


    infected.innerText = active
    recovered.innerText = recoveries
    deaths.innerText = dead
    date.forEach(date => {
        date.innerText = day
    })

})