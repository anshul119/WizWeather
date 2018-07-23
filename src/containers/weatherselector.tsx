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
import { Line } from 'react-chartjs-2';
import 'styles/weatherselector.scss';

interface IWeatherSelectorState {
	currentWeathers: ICurrentWeather[];
	forecasts: IForecast[];
	selectedCityId: number;
	selectedCity: string;
	chartData: any;
	chartLabels: string[];
	chartTempData: number[];
	chartHumidData: number[];
}

const cities = ['Paris', 'New York', 'New Delhi', 'Tokyo'];

export default class WeatherSelector extends React.Component<{}, IWeatherSelectorState> {
	state: IWeatherSelectorState = {
		currentWeathers: [],
		selectedCityId: null,
		selectedCity: '',
		forecasts: [],
		chartData: {},
		chartLabels: [],
		chartTempData: [],
		chartHumidData: []
	};

	getForecast = (id: number) => {
		apis.weather
			.getForecast({ id, appid: config.openWeatherApiKey, units: units.METRIC })
			.then((response: IForecastResponse) => {
				const cityName = response.city.name;
				const forecasts = response.list.map((forecastProps: IForecastProps) => {
					return new Forecast(forecastProps);
				});
				const chartTempData: number[] = [];
				const chartHumidData: number[] = [];
				const chartLabels: string[] = [];
				forecasts.slice(0, 8).forEach((forecast: IForecast) => {
					chartTempData.push(forecast.temperature);
					chartHumidData.push(forecast.humidity);
					chartLabels.push(forecast.time);
				});
				const data = {
					labels: chartLabels,
					datasets: [
						{
							label: 'Temperature',
							backgroundColor: 'rgba(229, 80, 57, 0.5)',
							borderColor: 'rgba(229, 80, 57, 1.0)',
							data: chartTempData
						},
						{
							label: 'Humidity',
							backgroundColor: 'rgba(7, 153, 146,0.5)',
							borderColor: 'rgba(7, 153, 146,1.0)',
							data: chartHumidData
						}
					]
				};
				this.setState({ forecasts, chartData: data, selectedCityId: id, selectedCity: cityName });
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
					active={this.state.selectedCityId === weather.id}
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
			this.setState(
				{ currentWeathers: weatherData, selectedCityId: weatherData[0].id, selectedCity: weatherData[0].city },
				() => {
					this.getForecast(this.state.selectedCityId);
				}
			);
		});
	}

	render() {
		return (
			<div className="weatherselector">
				<div className="weatherselector__cards">{this.renderWeatherCards()}</div>
				<h3 className="weatherselector__heading">Whats the weather like in {this.state.selectedCity}?</h3>
				{this.state.forecasts.length ? (
					<div>
						<div className="weatherselector__chart">
							<Line data={this.state.chartData} />
						</div>
						<h3 className="weatherselector__subheading">Here is some more info for you...</h3>
						<div className="weatherselector__forecast">{this.renderForecast()}</div>
					</div>
				) : (
					<h1 className="weatherselector__placeholder">Loading...</h1>
				)}
			</div>
		);
	}
}
