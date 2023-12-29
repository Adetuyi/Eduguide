import { useState } from 'react';
import { CaretDownFill, Logout, Menu } from '../../assets/svgs';
import { MobileNav } from '../../layout';
import { Header, MobileHeader } from './styles';
import { Icon } from '../../assets/images';
import { Link } from 'react-router-dom';
import { Approutes } from '../../constants';
import { useAuth } from '../../hooks';
import { isLecturer } from '../../utilities';

const PageHeader = ({ title, children }) => {
	const [nav, setNav] = useState(false);
	const { user } = useAuth();

	return (
		<Header>
			<MobileNav setNav={setNav} nav={nav} />
			<MobileHeader>
				<div>
					<div className="icon-con">
						<img src={Icon} alt="" />
						Eduguide
					</div>
					{children}
				</div>
				<Menu onClick={() => setNav(!nav)} />
			</MobileHeader>

			{title && <h3>{title}</h3>}
			<div className="welcome">{children}</div>

			<div className="profile">
				<div className="dropdown--con" tabIndex={0}>
					<div className="initials">
						{user?.first_name?.[0]}
						{user?.last_name?.[0]}
					</div>

					<div>
						<div className="name">
							{user?.first_name} {user?.last_name}
						</div>
						<div className="role">{isLecturer(user) ? 'Lecturer' : 'Student'}</div>
					</div>
					<CaretDownFill />

					<div className="dropdown">
						<Link to={Approutes.auth.logout}>
							<Logout /> Logout
						</Link>
					</div>
				</div>
			</div>
		</Header>
	);
};

export default PageHeader;
