import { RequireAuth } from '../../components';
import Navbar from '../Navbar';
import { Container } from './styles';
import { Outlet } from 'react-router-dom';

const ApplyLayout = () => {
	return (
		<RequireAuth>
			<Container>
				<Navbar />

				<main>
					<Outlet />
				</main>
			</Container>
		</RequireAuth>
	);
};

export default ApplyLayout;
