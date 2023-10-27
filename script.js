const searchButton = document.getElementById('generate-btn');

const output = document.getElementById('output-wrapper');
const others= document.getElementById('others');
const errorBox=document.getElementById('error');

const city = document.getElementById('input-city');
const apiKey = "a99cf4c2969a3490fbbb079ac7a00077";

const weatherImg = document.getElementById('w-img');
const temp = document.getElementById('temprature');
const cityOutput = document.getElementById('city-output');
const humidity = document.getElementById('humid');
const windSpeed = document.getElementById('wind');

async function fetchWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;

    try {
        let response = await fetch(url);
        if (response.status === 200) {
            console.log('Data Fetched from the API: Success Code: 200')

            let data = await response.json();
            // let imgsrc= `./images/${data.weather[0].main}.png`;
            weatherImg.src=`./images/${data.weather[0].main}.png`;
            temp.textContent = `${data.main.temp}°C`;
            cityOutput.textContent = data.name;

            windSpeed.textContent = `${data.wind.speed} km/hr`;
            humidity.textContent = `${data.main.humidity}%`;

   
            //making error box inivisible             
            errorBox.style.display='none';

            // make weather output visible 
            output.style.display='flex';
            others.style.display='flex';
        }
        else{
            output.style.display='none';
            others.style.display='none';

           errorBox.style.display='flex';
           throw new Error('Api Request Unsuccessful')
        }

    } catch (error) {
        console.error(error);
    }


}
searchButton.addEventListener('click', function () {
    fetchWeather();
})
city.addEventListener('keydown',function(event){
    if(event.key==="Enter"){
        fetchWeather();
    }
})
