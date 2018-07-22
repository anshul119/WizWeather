import { IForecastEntity } from 'apis/weather';
import moment from 'moment';

export interface IForecastProps extends IForecastEntity {}

export interface IForecast {
	readonly weatherId: number;
	readonly condition: string;
	readonly temperature: number;
	readonly maxTemperature: number;
	readonly minTemperature: number;
	readonly humidity: number;
	readonly clouds: number;
	readonly windSpeed: number;
	readonly windDirection: number;
	readonly rain: number;
	readonly time: string;
}

/**
 * Compact user object
 */
export class Forecast implements IForecast {
	private props: IForecastProps;

	constructor(props: IForecastProps) {
		this.props = props;
	}

	get weatherId() {
		return this.props.weather[0].id;
	}

	get temperature() {
		return this.props.main.temp;
	}

	get maxTemperature() {
		return this.props.main.temp_max;
	}

	get minTemperature() {
		return this.props.main.temp_min;
	}

	get humidity() {
		return this.props.main.humidity;
	}

	get clouds() {
		return this.props.clouds.all;
	}

	get windSpeed() {
		return this.props.wind.speed;
	}

	get windDirection() {
		return this.props.wind.deg;
	}

	get rain() {
		return this.props.rain["3h"];
	}

	get time() {
		const date = moment.unix(this.props.dt);
		return date.format('ddd hA');
	}

	get condition() {
		return this.props.weather[0].main;
	}

	get description() {
		return this.props.weather[0].description;
	}
}