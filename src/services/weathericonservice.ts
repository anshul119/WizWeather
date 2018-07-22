const weathericonsmap = require('assets/weathericonsmap.json');

export const getWeatherIcon = (weatherId: number) => {
	const prefix = 'wi wi-';
	let icon = weathericonsmap[weatherId].icon;

	// If we are not in the ranges mentioned above, add a day/night prefix.
	if (!(weatherId > 699 && weatherId < 800) && !(weatherId > 899 && weatherId < 1000)) {
		icon = 'day-' + icon;
	}

	// Finally tack on the prefix.
	icon = prefix + icon;

	return icon;
};
