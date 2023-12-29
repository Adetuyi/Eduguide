const genericMessage = 'Something went wrong while trying to connect with the server';

const handleApiError = (error) => {
	if (process.env.NODE_ENV !== 'production') {
		console.warn('Error handler:', error);
	}

	if (!error?.response) {
		const { data } = error.response || {};
		if (!data) return genericMessage;
		return (data?.error && data?.error[0]?.message) || data?.message || genericMessage;
	}
	const { response } = error || {};
	const { data } = response || {};

	switch (response?.status) {
		case 400:
			const keys = Object.keys(data);
			const firstItem = data[keys[0]];

			if (typeof firstItem === 'string') return firstItem;
			if (Array.isArray(firstItem)) {
				return firstItem[0];
			}

			const detailKeys = Object.keys(data?.detail || {});

			if (typeof data?.detail === 'string') return data?.detail;
			if (detailKeys.length) {
				const firstDetail = data?.detail[detailKeys[0]];

				if (typeof firstDetail === 'string') return firstDetail;
				if (Array.isArray(firstDetail)) return firstItem[0];
			}

			const dataErrors = Object.keys(data?.errors || {});

			if (typeof data?.errors === 'string') return data?.errors;
			if (dataErrors.length > 0) {
				const firstError = data?.errors[dataErrors[0]];

				if (typeof firstError === 'string') return firstError;
				if (Array.isArray(firstError)) return firstItem[0];
			}

			const dataErrorsKey = Object.keys(data?.errors?.error || {});

			if (typeof data?.errors?.error === 'string') return data?.errors?.error;
			if (dataErrorsKey.length > 0) {
				const firstDetail = data?.errors?.error[dataErrorsKey[0]];

				if (typeof firstDetail === 'string') return firstDetail;
				if (Array.isArray(firstDetail)) return firstItem[0];
			}

			return data?.detail || data?.error?.[0]?.message || data?.message || genericMessage;
		case 401:
			return data?.detail || data?.error?.[0]?.message || data?.message || data?.data || 'You are not authorized to perform this action';
		case 404:
			return data?.detail || data?.error?.[0]?.message || data?.message || 'The resource you are trying to load cannot be found';
		case 409:
			return data?.detail || data?.error?.[0]?.message || data?.message || 'A duplicate already exists';
		case 500:
			return genericMessage;
		case 504:
			return 'Gateway server Timeout';
		default:
			return data?.detail || data?.error?.[0]?.message || data?.message || genericMessage;
	}
};
export default handleApiError;
