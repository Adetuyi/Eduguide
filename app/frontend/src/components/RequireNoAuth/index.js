import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Approutes, Appurls } from '../../constants';
import { useEffect, useRef } from 'react';
import { useAxios } from '../../hooks';

const RequireNoAuth = ({ children }) => {
	const axios = useAxios();
	const location = useLocation();
	const isFirstTime = useRef(true);
	const [searchParams] = useSearchParams();

	const navigate = useNavigate();

	useEffect(() => {
		if (!isFirstTime.current) return;
		isFirstTime.current = false;

		axios.get(Appurls.auth.is_logged_in).then((data) => {
			if (data.data?.status === true) {
				navigate(searchParams.get('next') || Approutes.home, {
					replace: true,
				});
			}
		});
	}, [navigate, location, searchParams, axios]);

	return children;
};

export default RequireNoAuth;
