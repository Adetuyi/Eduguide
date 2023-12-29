import { useLocation, useNavigate } from 'react-router-dom';
import { Approutes, Appurls } from '../../constants';
import { useEffect, useRef } from 'react';
import { useAxios } from '../../hooks';

const RequireAuth = ({ children }) => {
	const axios = useAxios();
	const location = useLocation();
	const isFirstTime = useRef(true);

	const navigate = useNavigate();

	useEffect(() => {
		if (!isFirstTime.current) return;
		isFirstTime.current = false;

		axios.get(Appurls.auth.is_logged_in).then((data) => {
			if (data.data?.status === false) {
				navigate(`${Approutes.auth.login}?next=${location.pathname}`, {
					replace: true,
				});
			}
		});
	}, [navigate, location, axios]);

	return children;
};

export default RequireAuth;
