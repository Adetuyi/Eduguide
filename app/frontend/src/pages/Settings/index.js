import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components';
import { Approutes } from '../../constants';
import { Container } from './styles';
import { useEffect } from 'react';

const Settings = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	useEffect(() => {
		if (pathname === Approutes.settings.initial) navigate(Approutes.settings.profile, { replace: true });
	}, [navigate, pathname]);

	return (
		<Container>
			<PageHeader title={'Settings'} />

			<div className="settings">
				<ul className="navigation">
					<NavLink to={Approutes.settings.profile}>
						<li>Profile</li>
					</NavLink>
					<NavLink to={Approutes.settings.department}>
						<li>Departments</li>
					</NavLink>
					<NavLink to={Approutes.settings.users}>
						<li>Users</li>
					</NavLink>
				</ul>

				<Outlet />
			</div>
		</Container>
	);
};

export default Settings;
