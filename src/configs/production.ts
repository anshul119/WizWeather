import IConfig from './index';

const config: IConfig = {
	openWeatherApiKey: '3e294c0796928a0194adf8d142b3f9f3',
	api: {
		protocol: 'https:',
		host: 'api.openweathermap.org',
		weather: '/data/2.5',
	}
}

export default config;