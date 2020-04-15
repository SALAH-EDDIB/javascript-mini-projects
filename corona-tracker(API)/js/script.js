//*   :::::::::::::::::::::::         Selectors


const infected = document.querySelector('.infected')
const recovered = document.querySelector('.recovered')
const deaths = document.querySelector('.deaths')
const date = document.querySelectorAll('.date')
console.log(date);






//!  ::::::::::::::::::::::           Function 
fetch("https://covid-193.p.rapidapi.com/statistics", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "3cf2dd2fbcmsh804698fa024c4a5p112607jsn954ea7d83d6b"
    }
}).then(Response => {
    return Response.json()

}).then(data => {

    const country = data.response[74]
    console.log(country);

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