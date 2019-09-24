let input = document.querySelector('.main__add');
let close = document.querySelector('.main__button');
let f = document.querySelector('.loc');

    input.addEventListener("click", function() {
    document.querySelector(".main__form").style.display = "block";
    document.querySelector(".main__add").style.visibility = "hidden";
});

let deleteLocal = document.querySelector('.main__delete');

  deleteLocal.addEventListener("click", function() {
    localStorage.clear();
    console.log(localStorage);
});

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocationInfo);
  }
  
  function displayLocationInfo(position) {
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;
  
    getWeather(lat, lng);
  }

let buttonArray = document.querySelector(".main__button");
//local storage
localStorage = window.localStorage;
buttonArray.addEventListener("click", function() {
 let boxvalue = document.querySelector('.main__search').value;
 localStorage.setItem("cityNames-" + boxvalue, JSON.stringify(boxvalue));
 console.log(localStorage);
})
console.log(localStorage);

close.addEventListener("click", function() {
  document.querySelector(".main__form").style.display = "none";
  document.querySelector(".main__add").style.visibility = "visible";
});

function getWeather(lat, lng) {
    const key = "333b2639a331411cbf2e1eacb358418c";
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`)
    .then(function(resp) { return resp.json() })
    .then(function(data) {
      console.log(data);
      drawWeather(data);
    })
    .catch(function() {
    });
 }
 
function drawWeather( d ) {
    let celcius = Math.round(parseFloat(d.main.temp)-273.15);

    document.querySelector(".weather-location__clouds").innerHTML = d.weather[0].description;
    document.querySelector(".weather-location__temp").innerHTML = 'Temperatuur: ' + celcius + '&deg;';
    document.querySelector(".weather-location__city").innerHTML = d.name;
}