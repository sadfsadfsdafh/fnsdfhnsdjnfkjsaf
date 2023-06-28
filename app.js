const wrapper = document.querySelector(".wrapper");
inputPart = wrapper.querySelector(".input-part");
infoTxt = inputPart.querySelector(".info-txt");
inputField = inputPart.querySelector("input");
locationBtn = inputPart.querySelector("button");
wIcon = document.querySelector(".weather-part img");
arrowBack = document.querySelector("header i");
let api;
inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    console.log("Konuma izin verilmedi!");
  }
});

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=7dc80be2005287232e38e0c9588478f2`;
  fetchData();
}

function onError(error) {
  const mess = "Konuma izin verilmedi!";
  infoTxt.innerText = `${mess}`;
  infoTxt.classList.add("error");
}

function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7dc80be2005287232e38e0c9588478f2`;
  infoTxt.innerText = "Veri Çekiliyor!";
  infoTxt.classList.add("pending");
  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherDetails(result));
  fetchData();
}

function fetchData() {
  infoTxt.innerText = "Veri Çekiliyor!";
  infoTxt.classList.add("pending");
  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherDetails(result));
}

function weatherDetails(info) {
  if (info.cod == "404") {
    infoTxt.classList.replace("pending", "error");
    infoTxt.innerText = `${inputField.value} Adında bir şehir yok.`;
  } else {
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { feels_like, humidity, temp } = info.main;

    if (id == 800) {
      wIcon.src = "clear.svg";
    } else if ((id) => 200 && id <= 232) {
      wIcon.src = "storm.svg";
    } else if ((id) => 600 && id <= 622) {
      wIcon.src = "snow.svg";
    } else if ((id) => 701 && id <= 781) {
      wIcon.src = "haze.svg";
    } else if ((id) => 801 && id <= 804) {
      wIcon.src = "cloud.svg";
    } else if ((id) => (300 && id <= 321) || ((id) => 500 && id <= 531)) {
      wIcon.src = "rain.svg";
    }
    wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
    wrapper.querySelector(".weather").innerText = description;
    wrapper.querySelector(".location").innerText = `${city}, ${country}`;
    wrapper.querySelector(".humidity span").innerText = `${humidity}%`;
    wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);

    infoTxt.classList.remove("pending", "error");
    wrapper.classList.add("active");
    console.log(info);
  }
}

arrowBack.addEventListener("click", () => {
  wrapper.classList.remove("active");
});