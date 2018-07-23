enum conditions {
	RAIN = 'rain',
	CLEAR = 'clear',
	CLOUDS = 'clouds',
	MIST = 'mist'
}

export const getBackgroundColor = (condition: string) => {
	switch(condition.toLowerCase()) {
		case conditions.RAIN:
			return '#3498db';
		case conditions.CLEAR:
			return '#f1c40f';
		case conditions.CLOUDS:
			return '#34495e';
		case conditions.MIST:
			return '#7f8c8d';
		default:
			return '#1abc9c';
	}
}