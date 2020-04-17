let long;
let lat;
let temperatureDescription = document.querySelector('.temperature__description')
let temperatureDegree = document.querySelector('.degree')
let locationTimezone = document.querySelector('.location__timezone')
let locationImage = document.querySelector('.location__img')
let degreeSection = document.querySelector('.temperature__degreeSection')
let degreeSpan = document.querySelector('.temperature__degreeSection span')



if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        console.log(position);

        long = position.coords.longitude
        lat = position.coords.latitude
        const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=40f620c92e459b58039cbcfc3531380b`;

        fetch(api).then(Response => {
            return Response.json()
        }).then(data => {

            console.log(data);


            if (data.cod >= 400) {
                throw {
                    status: data.cod,
                    message: data.message
                }



            } else {

                const temp = Math.floor(data.current.temp - 273)
                const sammury = data.current.weather['0'].description
                const icon = data.current.weather['0'].icon

                temperatureDegree.textContent = temp
                temperatureDescription.textContent = sammury
                locationTimezone.textContent = data.timezone
                locationImage.src = `http://openweathermap.org/img/wn/${icon}@2x.png`

                degreeSection.addEventListener('click', () => {
                    if (degreeSpan.textContent === '°C') {
                        degreeSpan.textContent = '°F'
                        temperatureDegree.textContent = Math.floor((temp * (9 / 5)) + 32)
                    } else {
                        degreeSpan.textContent = '°C'
                        temperatureDegree.textContent = temp
                    }


                })
            }





        }).catch((error) => {
            console.log(error.status)
            console.log(error.message);

        })





    })
}