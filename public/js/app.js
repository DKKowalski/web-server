const weatherForm = document.querySelector("form");
const address = document.querySelector("#address");
const weatherData = document.querySelector(".weather-data");
const forecastEl = document.querySelector(".forecast");
const locationEl = document.querySelector(".location");
let url = "";

let html = `
<div class="error bg-red-400 p-8 mt-6 text-white" ></div>
`;
weatherForm.addEventListener("submit", function (e) {
  e.preventDefault();
  locationEl.textContent = `wait...`;
  forecastEl.textContent = `wait...`;
  url = `/weather?address=${address.value}`;
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.error) {
        weatherData.insertAdjacentHTML("beforeend", html);
        document.querySelector(".error").textContent = `🥹 ${data.error}`;
      } else {
        if (document.querySelector(".error")) {
          document.querySelector(".error").remove();
        }

        setTimeout(() => {
          locationEl.textContent = data.location;
          forecastEl.textContent = data.forecast;
        }, 1000);
      }
    });
});
