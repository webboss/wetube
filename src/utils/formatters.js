const formatToTens = number => {
	if (number < 10) {
		return `0${number}`
	} else {
		return number
	}
}

const convertToMinuteSeconds = duration => {
	const ONE_MINUTE = 60 // seconds
	const minutes = Math.round(duration / ONE_MINUTE)
	const minutesInSeconds = ONE_MINUTE * minutes

	let remainingSeconds
	if (minutes) {
		remainingSeconds = Math.round(duration % minutesInSeconds)
	} else {
		remainingSeconds = Math.round(duration)
	}

	return `${formatToTens(minutes)}:${formatToTens(remainingSeconds)}`
}

export { convertToMinuteSeconds }
