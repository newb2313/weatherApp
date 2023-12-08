//weather script
let lat, lon;
const notFoundCode = '404';

let weather = {
    "apiKey": "079b8873b6337dec6ec9bd818da65a4f",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        if (data.cod === notFoundCode) {
            alert(data.message);

            return "";
        }

        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        lat = data.coord.lat;
        lon = data.coord.lon;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + description + "')"
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};
// Pressing enter function
const searchBar = document.querySelector(".search-bar");
const searchButton = document.querySelector(".search button");

searchButton.addEventListener("click", function () {
    searchBar.value ? weather.search() : alert('Please input City');
});

searchBar.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        if (searchBar.value) {
            weather.search();
        } else {
            alert('Please input city.');
        }
    }
});

// loading my home page
fetch('http://ip-api.com/json/?fields=city')
    .then((response) => response.json())
    .then((data) => weather.fetchWeather(data.city));

//GEOMAPPING...
var map = L.map('map').setView([36.2048, 138.2529], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap'
}).addTo(map);
var marker = L.marker([36.2048, 138.2529])
    .addTo(map);
