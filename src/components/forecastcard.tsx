import React from 'react';
import { getWeatherIcon } from 'services/weathericonservice';
import { getBackgroundColor } from 'services/backgroundcolorservice';
import 'styles/forecastcard.scss';

interface IForecastCardProps {
	time: string;
	weatherId: number;
	temperature: number;
	condition: string;
}

export default class ForecastCard extends React.Component<IForecastCardProps, {}> {
	render() {
		return (
			<div className="forecastcard" >
				<div className="forecastcard__top">
					<p className="forecastcard__condition">{this.props.condition}</p>
					<p className="forecastcard__time">{this.props.time}</p>
				</div>
				<div className="forecastcard__bottom">
					<i
						className={`forecastcard__icon wi ${getWeatherIcon(this.props.weatherId)}`}
						style={{ color: getBackgroundColor(this.props.condition) }}
					/>
					<p className="forecast__temperature">
						{this.props.temperature} <span className="forecastcard__unitsign">&#8451;</span>
					</p>
				</div>
			</div>
		);
	}
}
