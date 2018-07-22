import React from 'react';
import WeatherCard from 'components/weathercard';
import ForecastCard from 'components/forecastcard';
import { getBackgroundImage } from 'services/imageservice';
import { ICurrentWeather, ICurrentWeatherProps, CurrentWeather } from 'models/weather';
import { IForecast, IForecastProps, Forecast } from 'models/forecast';
import apis from 'apis/index';
import { IForecastResponse } from 'apis/weather';
import { units } from 'apis/weather';
import config from 'configs/production';
import 'styles/weatherselector.scss';

interface IWeatherSelectorState {
	currentWeathers: ICurrentWeather[];
	forecasts: IForecast[];
}

const cities = ['New York', 'Paris', 'New Delhi', 'Tokyo'];

export default class WeatherSelector extends React.Component<{}, IWeatherSelectorState> {
	state: IWeatherSelectorState = {
		currentWeathers: [],
		forecasts: []
	};

	getForecast = (id: number) => {
		apis.weather
			.getForecast({ id, appid: config.openWeatherApiKey, units: units.METRIC })
			.then((response: IForecastResponse) => {
				const forecasts = response.list.map((forecastProps: IForecastProps) => {
					return new Forecast(forecastProps);
				});
				console.log(forecasts);
				this.setState({ forecasts });
			});
	};

	renderForecast = () => {
		return this.state.forecasts.map((forecast: IForecast, i: number) => {
			return (
				<ForecastCard
					key={i}
					time={forecast.time}
					weatherId={forecast.weatherId}
					temperature={forecast.temperature}
					condition={forecast.condition}
				/>
			);
		});
	};

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
					onClick={this.getForecast}
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
			this.setState({ currentWeathers: weatherData });
		});
	}

	render() {
		return (
			<div className="weatherselector">
				{this.renderWeatherCards()}
				<div className="weatherselector__forecast">
					{this.renderForecast()}
				</div>
			</div>
		);
	}
}
