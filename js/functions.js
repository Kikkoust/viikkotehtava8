const icon_url = 'http://openweathermap.org/img/wn';
const api_key = '5e8698fa2c220615b7cfd21507f40eb1';

const temp_span = document.querySelector('#temp');
const speed_span = document.querySelector('#speed');
const direction_span = document.querySelector('#direction');
const description_span = document.querySelector('#description');
const icon_img = document.querySelector('img');

const getWeather = (lat, lng) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`;
    
    axios.get(url)
        .then(response => {
            const json = response.data;
            temp_span.innerHTML = json.main.temp + '&#8451;';
            speed_span.innerHTML = json.wind.speed + ' m/s';
            direction_span.innerHTML = json.wind.deg + '&#176;';
            description_span.innerHTML = json.weather[0].description;
            const image = icon_url + json.weather[0].icon + '@2x.png';
            icon_img.src = image;
        })
        .catch(error => {
            console.error(error);
        });
};

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude.toFixed(3);
            const lng = position.coords.longitude.toFixed(3);
            document.querySelector('#lat').innerHTML = lat + ', ';
            document.querySelector('#lng').innerHTML = lng;
            getWeather(lat, lng);
        });
    } else {
        alert("Your browser does not support geolocation!");
    }
};

getLocation();
