const api = {
  key: '85ee8e7f5ac47dd30958b9c762941400',
  baseUrl: 'http://api.openweathermap.org/data/2.5/'
};

const search = document.querySelector('#search');

function set(e) {
  if (e.keyCode === 13) {
    getResult(search.value);
    search.value = '';
  }
}


function getResult(input) {
  fetch(`${api.baseUrl}weather?q=${input}&units=metric&APPID=${api.key}`)
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
  status.textContent = weather.weather[0].main;

  let now = new Date();
  let date = document.querySelector('#date');
  date.innerHTML = dateBuilder(now);
}

search.addEventListener('keypress', set);
search.addEventListener('submit', set);
