import { useEffect } from 'react';
import { axios } from '../../library';
import { Appurls } from '../../constants';
import { useState } from 'react';
import { getCookie } from '../../utilities';

const CSRFToken = () => {
	const [csrftoken, setCsrftoken] = useState('');

	useEffect(() => {
		const getToken = async () => {
			await axios.get(Appurls.auth.get_csrf_token);
		};

		getToken();
		setCsrftoken(getCookie('csrftoken'));
	}, []);

	return <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />;
};
export default CSRFToken;
