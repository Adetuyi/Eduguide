const getPreviousSearchParams = (searchParams) => {
	if (!searchParams) return {};

	const previousParams = {};

	for (let entry of searchParams.entries()) {
		previousParams[entry[0]] = entry[1];
	}

	return previousParams;
};

export default getPreviousSearchParams;
