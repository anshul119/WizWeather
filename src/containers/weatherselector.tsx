import React from 'react';
// import WeatherCard from 'components/weathercard';
import apis from 'apis/index';
import config from 'configs/production';
import 'styles/weatherselector.scss';

const cities = [
	'New York',
	'Paris',
	'New Delhi',
	'Tokyo'
]

export default class WeatherSelector extends React.Component<{}, {}> {
	renderWeatherCards = () => {
		cities.forEach((city: string) => {
			apis.weather.getCurrentWeather({q: city, appid: config.openWeatherApiKey}).then((response: any) => {
				console.log(response);
			});
		})
	};

	componentDidMount() {
		this.renderWeatherCards();
	}

	render() {
		return (
			<header className="header">
				sel
			</header>
		)
	}
}