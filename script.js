class Weather {
	constructor(name, country, weather, temp, feels_like, wind, humidity) {
		this.name = name;
		this.country = country;
		this.weather = weather;
		this.temp = temp;
		this.feels_like = feels_like;
		this.wind = wind;
		this.humidity = humidity;
	}
}

function round(num) {
	num = Math.round(num);
	return num;
}

async function getData(location, unit) {
	if (location === null) return;
	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=8a3a9892cff691a166199f11fbcc7e55`,
		{
			mode: "cors",
		}
	);

	const weatherData = await response.json();

	return weatherData;
}

async function processData(search, unit) {
	let data = await getData(search, unit);
	console.log(data);
	let obj = new Weather(
		data.name,
		data.sys.country,
		data.weather[0].description,
		round(data.main.temp),
		round(data.main.feels_like),
		round(data.wind.speed),
		round(data.main.humidity)
	);
	console.log(obj);
	display(obj, unit);
}

function searchCity() {
	const form = document.querySelector(".form");

	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const city = document.querySelector(".city");
		processData(city.value, "imperial");
	});
}

function display(obj, unit) {
	const location = document.querySelector(".location");
	const weather = document.querySelector(".weather");
	const unitDOM = document.querySelector(".unit");
	const unit2DOM = document.querySelector(".unit2");
	const temp = document.querySelector(".temp");
	const feels_like = document.querySelector(".feels-like");
	const wind = document.querySelector(".wind");
	const humidity = document.querySelector(".humidity");
	let unitVal;

	if (unit === "metric") unitVal = "\u2103";
	else if (unit === "imperial") unitVal = "\u2109";

	location.textContent = `${obj.name}, ${obj.country}`;
	weather.textContent = obj.weather;
	temp.textContent = `${obj.temp}`;
	unitDOM.textContent = `${unitVal}`;
	feels_like.textContent = `FEELS LIKE: ${obj.feels_like} ${unitVal}`;
	wind.textContent = `WIND: ${obj.wind} MPH`;
	humidity.textContent = `HUMIDITY: ${obj.humidity}%`;
}

searchCity();
processData("Norfolk", "imperial");
// processData(getData(search));
// const dataDiv = document.querySelector(".data");
// dataDiv.textContent = getData().main.temp;
