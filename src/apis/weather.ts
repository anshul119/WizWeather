import { buildRequest, RequestMethod } from 'apis/index';
import configs from 'configs/production';

export enum units {
	METRIC = 'metric',
	IMPERIAL = 'imperial'
}

/**
 * Acceptable parameter for getCurrentWeather ndforcast API call
 */
export interface IWeatherParameters {
	q?: string;
	id?: number;
	appid: string;
	units?: units;
}

/**
 * API response of getCurrentWeather call
 */
export interface IGetCurrentWeatherResponse {
	coord: {
		lon: number;
		lat: number;
	};
	weather: [
		{
			id: number;
			main: string;
			description: string;
			icon: string;
		}
	];
	base: string;
	main: {
		temp: number;
		pressure: number;
		humidity: number;
		temp_min: number;
		temp_max: number;
	};
	wind: {
		speed: number;
		deg: number;
	};
	clouds: {
		all: number;
	};
	dt: number;
	sys: {
		type: number;
		id: number;
		message: number;
		country: string;
		sunrise: number;
		sunset: number;
	};
	id: number;
	name: string;
	cod: number;
}

/**
 * Forecast entity
 */
export interface IForecastEntity {
	dt: 1532293200;
	main: {
		temp: 299.52;
		temp_min: 298.247;
		temp_max: 299.52;
		pressure: 986.82;
		sea_level: 1009.3;
		grnd_level: 986.82;
		humidity: 99;
		temp_kf: 1.27;
	};
	weather: [
		{
			id: 500;
			main: 'Rain';
			description: 'light rain';
			icon: '10n';
		}
	];
	clouds: {
		all: 80;
	};
	wind: {
		speed: 1.02;
		deg: 206.507;
	};
	rain: {
		'3h': 0.335;
	};
	sys: {
		pod: 'n';
	};
	dt_txt: '2018-07-22 21:00:00';
}

/**
 * API response of forecast call
 */
export interface IForecastResponse {
	cod: '200';
	message: 0.0024;
	cnt: 40;
	list: IForecastEntity[];
	city: {
		id: 1270583;
		name: 'Gwalior';
		coord: {
			lat: 26.2037;
			lon: 78.1574;
		};
		country: 'IN';
		population: 882458;
	};
}

export default {
	getCurrentWeather: (parameters: IWeatherParameters): Promise<IGetCurrentWeatherResponse> => {
		return buildRequest({
			api: configs.api.weather,
			pathname: '/weather',
			method: RequestMethod.GET,
			parameters
		});
	},

	getForecast: (parameters: IWeatherParameters): Promise<IForecastResponse> => {
		return buildRequest({
			api: configs.api.weather,
			pathname: '/forecast',
			method: RequestMethod.GET,
			parameters
		});
	}
};
