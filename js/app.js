const api = {
  key: 'caa1ef6403f7ae0da57ee5d219c7a2ac',
  baseUrl: 'http://api.weatherstack.com/current?access_key='
};

const search = document.querySelector('#search');

function set(e) {
  e.preventDefault();
  getResult(search.value);
  search.value = '';
}


function getResult(input) {
  fetch(`${api.baseUrl}${api.key}&query=${input}`)
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
  city.textContent = weather.location.name;

  let temp = document.querySelector('#temp');
  temp.innerHTML = `${Math.round(weather.current.temperature)}<span>&#8451;</span>`;

  let status = document.querySelector('#status');
  status.textContent = weather.current.weather_descriptions;

  let now = new Date();
  let date = document.querySelector('#date');
  date.innerHTML = dateBuilder(now);
}

document.querySelector('.header').addEventListener('submit', set);
