import { useState } from 'react';
import { Button, InputGroup } from '../../ui';
import { Container } from './styles';

const ResetPassword = () => {
	const [formData, setFormData] = useState({ email: '' });

	const handleChange = (event, name, value) => {
		name = event.target.name || name || '';
		value = event.target.value || value || '';

		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<Container>
			<div>
				<h1>Welcome back!</h1>
			</div>
			<div>
				<form onSubmit={(event) => event.preventDefault()}>
					<h2>Reset Password</h2>
					<p>Please enter your details to reset password.</p>

					<div>
						<InputGroup
							label="Email address"
							name="email"
							type="email"
							onChange={handleChange}
							placeholder="@gmail.com"
							required
							value={formData.email}
						/>
						<Button>Reset Password</Button>
					</div>
				</form>
			</div>
		</Container>
	);
};
export default ResetPassword;
