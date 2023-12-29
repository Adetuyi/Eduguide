import { useRef, useState } from 'react';
import { Button, InputGroup } from '../../../ui';
import { Container } from './styles';
import { useMutation } from '@tanstack/react-query';
import { useAuth, useAxios, useNotify } from '../../../hooks';
import { Appurls } from '../../../constants';

const Profile = () => {
	const axios = useAxios();
	const notify = useNotify();
	const errorRef = useRef();
	const { user } = useAuth();
	const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', password: '', confirm_password: '' });

	const { mutate: changePassword, isPending: isChangingPassword } = useMutation({
		mutationFn: (data) => axios.post(Appurls.auth.change_password, data),
	});

	const handleChange = (event, name, value) => {
		name = event.target.name || name || '';
		value = event.target.value || value || '';

		setFormData((prev) => ({ ...prev, [name]: value }));
	};
	const handleChangePassword = (event) => {
		event.preventDefault();

		if (formData.password !== formData.confirm_password) {
			errorRef.current.textContent = 'Passwords do not match';

			return;
		}

		changePassword(
			{ username: user?.username, password: formData.password },
			{
				onSuccess: (data) => {
					setFormData((prev) => ({ ...prev, password: '', confirm_password: '' }));
					notify({ message: 'Your password has been changed successfully', status: 'success', toastOptions: { toastId: 'password_success' } });
				},
				onError: (error) => {
					console.log(error);
					notify({
						message: error?.response?.data?.details || 'Something went wrong while trying to sign you in',
						status: 'error',
						toastOptions: { toastId: 'password_error' },
					});
				},
			}
		);
	};

	return (
		<Container>
			<div>
				<h3>My Profile</h3>
				<p>You can edit your name, email and change your password.</p>
			</div>

			<div className="profile-details">
				<div>
					<h4>Account info</h4>
					<form>
						<InputGroup label="First Name" placeholder="Jane" name="first_name" value={formData.first_name} onChange={handleChange} required />
						<InputGroup label="Last Name" placeholder="Doe" name="last_name" value={formData.last_name} onChange={handleChange} required />
						<InputGroup label="Email" placeholder="Doe" name="email" value={formData.email} onChange={handleChange} required />

						<Button>Update Account Info</Button>
					</form>
				</div>

				<div>
					<h4>Password</h4>
					<form onSubmit={handleChangePassword}>
						<InputGroup
							type="password"
							label="New Password"
							name="password"
							value={formData.password}
							placeholder="Enter your new password"
							onChange={(event) => {
								errorRef.current.textContent = '';
								handleChange(event);
							}}
							required
						/>
						<InputGroup
							type="password"
							label="Confirm New Password"
							name="confirm_password"
							value={formData.confirm_password}
							placeholder="Enter your new password again"
							onChange={(event) => {
								errorRef.current.textContent = '';
								handleChange(event);
							}}
							required
						/>
						<p className="error-message" ref={errorRef}></p>

						<Button loading={isChangingPassword}>Update Password</Button>
					</form>
				</div>
			</div>
		</Container>
	);
};

export default Profile;
