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

close.addEventListener("click", function() {
  document.querySelector(".main__form").style.display = "none";
  document.querySelector(".main__add").style.visibility = "visible";
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(displayLocationInfo);
}

function displayLocationInfo(position) {
  const lng = position.coords.longitude;
  const lat = position.coords.latitude;

  let buttonArray = document.querySelector(".main__button");
//local storage
localStorage = window.localStorage;
buttonArray.addEventListener("click", function() {
 let boxvalue = document.querySelector('.main__search').value;
 localStorage.setItem("cityNames-" + boxvalue, JSON.stringify(boxvalue));
var KeyName = window.localStorage.key("cityNames-" + boxvalue);
 console.log(localStorage);
 getWeatherBox(city = boxvalue);
})
console.log(localStorage);
getWeather(lat, lng);
}

const key = "333b2639a331411cbf2e1eacb358418c";

function getWeather(lat, lng) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`).then(result => {
        return result.json();
    }).then(result => {
      drawWeather(result);
    })
 }
 
 function getWeatherBox(city) {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`).then(result => {
    return result.json();
  }).then(result => {
  drawWeatherBox(result);
  })
}

function drawWeather( d ) {
    let celcius = Math.round(parseFloat(d.main.temp)-273.15);

    document.querySelector(".weather-location__clouds").innerHTML = d.weather[0].description;
    document.querySelector(".weather-location__temp").innerHTML = 'Temperatuur: ' + celcius + '&deg;';
    document.querySelector(".weather-location__city").innerHTML = d.name;
}

function drawWeatherBox( d ) {
  for (i = 0; i < localStorage.length; i++) {
    let currentI = localStorage.getItem(localStorage.key(i));
        document.querySelector(".weather-container").innerHTML += 
        "<div class=weather-container__box> <input type=button class=box__delete value=X> <h2 class=box__title> </h2> <p class=box__temp></p> <p class=box__clouds></p> </div>";
        let celcius = Math.round(parseFloat(d.main.temp)-273.15); 
        document.querySelector(".box__clouds").innerHTML = d.weather[0].description;
        document.querySelector(".box__temp").innerHTML = 'Temperatuur: ' + celcius + '&deg;';
        document.querySelector(".box__title").innerHTML = d.name;
    }
  }
