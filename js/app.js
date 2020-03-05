const api = {
  key: '5482ba6debbf7049cabb78a51fe336a6',
  baseUrl: 'https://api.openweathermap.org/data/2.5/weather?q='
};

const search = document.querySelector('#search');

function set(e) {
  e.preventDefault();
  getResult(search.value);
  search.value = '';
}


function getResult(input) {
  fetch(`${api.baseUrl}${input}&appid=${api.key}&units=metric&lang=en`)
    .then(weather => {
      return weather.json();
    })
    .then(displayResult)
}

function dateBuilder(now) {
  const m = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const d = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  let day = d[now.getDay()];
  let date = now.getDate();
  let month = m[now.getMonth()];
  let year = now.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

function displayResult(weather) {
  console.log(weather);

  let city = document.querySelector('#city');
  city.textContent = weather.name;

  let temp = document.querySelector('#temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>&#8451;</span>`;

  let status = document.querySelector('#status');
  status.textContent = weather.weather[0].description;

  let now = new Date();
  let date = document.querySelector('#date');
  date.innerHTML = dateBuilder(now);
}

document.querySelector('.header').addEventListener('submit', set);
