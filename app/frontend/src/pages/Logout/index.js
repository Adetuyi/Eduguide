import { useNavigate } from 'react-router-dom';
import { Loader } from '../../ui';
import { Container } from './styles';
import { useAxios, useNotify } from '../../hooks';
import { Approutes, Appurls } from '../../constants';
import { useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { CSRFToken } from '../../components';

const Logout = () => {
	const axios = useAxios();
	const isFirstTime = useRef(true);

	const notify = useNotify();
	const navigate = useNavigate();

	const { mutate: logout } = useMutation({ mutationFn: () => axios.post(Appurls.auth.logout) });

	useEffect(() => {
		if (!isFirstTime.current) return;
		isFirstTime.current = false;

		logout(
			{},
			{
				onSuccess: () => {
					localStorage.clear();
					notify({
						message: 'You have been logged out',
						status: 'success',
						toastOptions: { toastId: 'logout_success' },
					});
					navigate(Approutes.auth.login);
				},
				onError: () => {
					notify({
						message: 'Something went wrong while trying to log you out',
						status: 'error',
						toastOptions: { toastId: 'logout_error' },
					});
					navigate(-1);
				},
			}
		);
	}, [logout, navigate, notify]);

	return (
		<Container>
			<CSRFToken />
			<Loader />
		</Container>
	);
};
export default Logout;
