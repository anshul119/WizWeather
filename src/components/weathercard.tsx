import React from 'react';
import 'styles/weathercard.scss';

interface IWeatherCardProps {
	city: string;
	id: number,
	iconCode: number;
	temperature: string;
	condition: string;
	description: string;
}

export default class WeatherCard extends React.Component<IWeatherCardProps, {}> {
	render() {
		return (
			<div className="weathercard">
				<h3 className="weathercard__title">{this.props.city}</h3>
				<p className="weathercard__description">{this.props.description}</p>
				<p className="weathercard__temperature">{this.props.temperature}</p>
				<i className="wi wi-day-lightning"></i>
				<p className="weathercard__condition">{this.props.condition}</p>
			</div>
		)
	}
}