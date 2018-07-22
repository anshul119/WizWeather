export const getBackgroundImage = (id: number) => {
	let background: string;
	switch(id) {
		case 5128581:
			background = require('assets/new-york.jpg');
			break;
		case 2988507:
			background = require('assets/paris.jpg');
			break;
		case 1261481:
			background = require('assets/new-delhi.jpeg');
			break;
		case 1850147:
			background = require('assets/tokyo.jpg');
			break;
		default:
			background = '';
			break;
	}
	return background;
}