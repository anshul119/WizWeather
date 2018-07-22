import React from 'react';
import 'styles/header.scss';

const logo = require('assets/logo.png');

export default class Header extends React.Component<{}, {}> {
	render() {
		return (
			<header className="header">
				<img className="header__logo" src={logo} />
			</header>
		)
	}
}