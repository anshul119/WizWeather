import React from 'react';
import Header from 'components/header';
import WeatherSelector from 'containers/weatherselector';
import 'styles/global.scss';

export default class App extends React.Component<{}, {}> {
	render() {
		return (
			<div>
				<Header />
				<WeatherSelector />
			</div>
		);
	}
}
