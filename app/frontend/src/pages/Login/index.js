import { useState } from 'react';
import { Button, InputGroup } from '../../ui';
import { Container } from './styles';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Approutes, Appurls } from '../../constants';
import { CSRFToken, RequireNoAuth } from '../../components';
import { useAuth, useAxios, useNotify } from '../../hooks';
import { useMutation } from '@tanstack/react-query';

const Login = () => {
	const axios = useAxios();
	const { setUser } = useAuth();
	const [searchParams] = useSearchParams();
	const [formData, setFormData] = useState({ username: '', password: '' });

	const notify = useNotify();
	const navigate = useNavigate();

	const { mutate: login, isPending } = useMutation({ mutationFn: (data) => axios.post(Appurls.auth.login, data) });

	const handleChange = (event, name, value) => {
		name = event.target.name || name || '';
		value = event.target.value || value || '';

		setFormData((prev) => ({ ...prev, [name]: value }));
	};
	const handleSubmit = (event) => {
		event.preventDefault();

		login(formData, {
			onSuccess: (data) => {
				setUser(data.data);
				localStorage.setItem('user', JSON.stringify(data.data));
				navigate(searchParams.get('next') || Approutes.home);
			},
			onError: (error) => {
				notify({
					message: error?.response?.data?.details || 'Something went wrong while trying to sign you in',
					status: 'error',
					toastOptions: { toastId: 'login_error' },
				});
			},
		});
	};

	return (
		<RequireNoAuth>
			<Container>
				<div>
					<h1>Welcome back!</h1>
				</div>
				<div>
					<form onSubmit={handleSubmit}>
						<CSRFToken />
						<h2>Log in</h2>
						<p>Welcome back! Please enter your details.</p>

						<div>
							<InputGroup
								label="Username / Matric number"
								name="username"
								onChange={handleChange}
								placeholder="username / 20*******0"
								required
								value={formData.username}
							/>
							<InputGroup
								label="Password"
								name="password"
								type="password"
								onChange={handleChange}
								placeholder=". . . . . . . ."
								required
								value={formData.password}
							/>
							<Link to={Approutes.reset_password}>Reset Password</Link>
							<Button loading={isPending}>Sign in</Button>
						</div>
					</form>
				</div>
			</Container>
		</RequireNoAuth>
	);
};
export default Login;
