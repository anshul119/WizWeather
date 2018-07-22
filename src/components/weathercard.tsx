import React from 'react';
import { getWeatherIcon } from 'services/weathericonservice';
import 'styles/weathercard.scss';

interface IWeatherCardProps {
	city: string;
	weatherId: number;
	background: string;
	id: number;
	temperature: number;
	condition: string;
	description: string;
	onClick: (id: number) => void;
}

export default class WeatherCard extends React.Component<IWeatherCardProps, {}> {
	render() {
		return (
			<div
				onClick={this.props.onClick.bind(null, this.props.id)}
				className="weathercard"
				style={this.props.background ? { backgroundImage: `url(${this.props.background})` } : { background: '#000' }}
			>
				<div className="weathercard__content">
					<div className="weathercard__top">
						<h3 className="weathercard__title">{this.props.city}</h3>
						<p className="weathercard__description">{this.props.description}</p>
					</div>
					<div className="weathercard__bottom">
						<div className="weathercard__glimpse">
							<i className={`weathercard__icon wi ${getWeatherIcon(this.props.weatherId)}`} />
							<p className="weathercard__condition">{this.props.condition}</p>
						</div>
						<p className="weathercard__temperature">
							{this.props.temperature} <span className="weathercard__unitsign">&#8451;</span>
						</p>
					</div>
				</div>
			</div>
		);
	}
}
