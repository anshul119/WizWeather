export interface IConfig {
	openWeatherApiKey: string;
	api: {
		protocol: string;
		host: string;
		weather: string;
	};
}
export default IConfig;