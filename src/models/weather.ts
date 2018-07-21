import { IGetCurrentWeatherResponse } from 'apis/weather';

export interface ICurrentWeatherProps extends IGetCurrentWeatherResponse {}

export interface ICurrentWeather {
	readonly id: number;
	readonly city: string;
	readonly iconCode: string;
	readonly temperature: number;
	readonly condition: string;
	readonly description: string;
}

/**
 * Compact user object
 */
export class CurrentWeather implements ICurrentWeather {
	private props: ICurrentWeatherProps;

	constructor(props: ICurrentWeatherProps) {
		this.props = props;
	}

	get id() {
		return this.props.id;
	}

	get city() {
		return this.props.name;
	}

	get iconCode() {
		return this.props.weather[0].icon;
	}

	get temperature() {
		return this.props.main.temp;
	}

	get condition() {
		return this.props.weather[0].main;
	}

	get description() {
		return this.props.weather[0].description;
	}
}