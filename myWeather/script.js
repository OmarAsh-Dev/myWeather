const apikey = "d2e58d0932881249421abcd5f8878ab4";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const searchInput = document.getElementById("pac-input");
const searchButton = document.getElementById("search-button");

window.onload = () => {
    checkweather("Cairo");
  
};

async function checkweather(city) {
    const response = await fetch(apiurl + `&q=${city}` + `&appid=${apikey}`);
    if (!response.ok) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }
    const data = await response.json();
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").textContent = data.main.humidity + "%";
    document.querySelector(".wind").textContent = data.wind.speed + "m/s";
    document.querySelector(".weather-icon").src = "images/" + data.weather[0].main + ".png";
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    document.querySelector(".feelslike").textContent = Math.round(data.main.feels_like)+ "°c";
    document.querySelector(".description").textContent = data.weather[0].description;
    document.querySelector(".Country").textContent = "Country: " + data.sys.country;
    document.querySelector(".pressure").textContent = "Pressure: " + data.main.pressure + " psu";
    document.querySelector(".sea_level").textContent = "Sea-level: " + data.main.sea_level;
    document.querySelector(".max_temp").textContent = "Max-temp: " + data.main.temp_max + "°c";
    document.querySelector(".min_temp").textContent = "Min-temp: " + data.main.temp_min + "°c";




    console.log(data);
}

searchButton.addEventListener("click", () => {
    const city = searchInput.value;
    checkweather(city);

});

function initAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(searchInput, {
        types: ['(cities)'],
    });

    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place && place.geometry) {
            const city = place.name;
            searchInput.value = city;
            checkweather(city);
        }
    });
}

window.initAutocomplete = initAutocomplete;
