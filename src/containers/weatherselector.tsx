import React from 'react';
import WeatherCard from 'components/weathercard';
import { getBackgroundImage } from 'services/imageservice'
import { ICurrentWeather, ICurrentWeatherProps, CurrentWeather } from 'models/weather';
import apis from 'apis/index';
import { units } from 'apis/weather';
import config from 'configs/production';
import 'styles/weatherselector.scss';

interface IWeatherSelectorState {
	currentWeathers: ICurrentWeather[];
}

const cities = ['New York', 'Paris', 'New Delhi', 'Tokyo'];

export default class WeatherSelector extends React.Component<{}, IWeatherSelectorState> {
	state: IWeatherSelectorState = {
		currentWeathers: []
	}

	renderWeatherCards = () => {
		return this.state.currentWeathers.map((weather: ICurrentWeather) => {
			const background = getBackgroundImage(weather.id);
			return (
				<WeatherCard
					key={weather.id}
					id={weather.id}
					weatherId={weather.weatherId}
					background={background}
					city={weather.city}
					condition={weather.condition}
					temperature={weather.temperature}
					description={weather.description}
				/>
			);
		});
	};

	componentDidMount() {
		const promises = cities.map((city: string) => {
			return apis.weather
				.getCurrentWeather({ q: city, appid: config.openWeatherApiKey, units: units.METRIC })
				.then((response: ICurrentWeatherProps) => {
					return new CurrentWeather(response);
				});
		});

		Promise.all(promises).then((weatherData: ICurrentWeather[]) => {
			this.setState({currentWeathers: weatherData});
		});
	}

	render() {
		return (
			<div className="weatherselector">
				{this.renderWeatherCards()}
			</div>
		);
	}
}
