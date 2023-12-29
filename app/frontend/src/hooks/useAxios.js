import { useEffect } from 'react';
import { API_BASE_URL, axios } from '../library';
import { default as axiosDefault } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Approutes, Appurls } from '../constants';
import { getCookie } from '../utilities';

const useAxios = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	useEffect(() => {
		const requestInterceptor = axios.interceptors.request.use(
			async (response) => {
				await axiosDefault.get(API_BASE_URL + Appurls.auth.get_csrf_token);

				const csrftoken = getCookie('csrftoken');

				if (csrftoken) {
					response.headers['X-CSRFToken'] = csrftoken;
				}

				return response;
			},
			(error) => error
		);

		const responseInterceptor = axios.interceptors.response.use(
			(response) => {
				return response;
			},
			(error) => {
				// let prevRequest = error?.config;

				if (error?.response?.status === 401) {
					navigate(`${Approutes.auth.login}?next=${pathname}`, {
						replace: true,
					});
				}
				// else if (error?.response?.status === 403 && !prevRequest.hasSent) {
				// 	prevRequest.hasSent = true;

				// 	await axios.get(Appurls.auth.get_csrf_token);

				// 	const csrftoken = getCookie('csrftoken');

				// 	if (csrftoken) {
				// 		prevRequest = {
				// 			...prevRequest,
				// 			headers: {
				// 				...prevRequest.headers,
				// 				'X-CSRFToken': csrftoken,
				// 			},
				// 		};
				// 	}

				// 	return axios(prevRequest);
				// }

				return Promise.reject(error);
			}
		);

		return () => {
			axios.interceptors.response.eject(responseInterceptor);
			axios.interceptors.request.eject(requestInterceptor);
		};
	}, [navigate, pathname]);

	return axios;
};

export default useAxios;
