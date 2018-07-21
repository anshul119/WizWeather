import { buildRequest, RequestMethod } from 'apis/index';
import configs from 'configs/production';

export interface IGetCurrentWeatherParameters {
	q: string;
	appid: string;
}

export interface IGetCurrentWeatherResponse {
	coord: {
		lon: number;
		lat: number
	};
	weather: [
		{
			id: number;
			main: string;
			description: string;
			icon: string
		}
	];
	base: string;
	main: {
		temp: number;
		pressure: number;
		humidity: number;
		temp_min: number;
		temp_max: number
	};
	wind: {
		speed: number;
		deg: number
	};
	clouds: {
		all: number
	};
	dt: number;
	sys: {
		type: number;
		id: number;
		message: number;
		country: string;
		sunrise: number;
		sunset: number
	};
	id: number;
	name: string;
	cod: number;
}

export default {
	getCurrentWeather: (parameters: IGetCurrentWeatherParameters): Promise<IGetCurrentWeatherResponse> => {
		return buildRequest({
			api: configs.api.weather,
			pathname: '/weather',
			method: RequestMethod.GET,
			parameters
		});
	}
};
