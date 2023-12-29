import { Link, NavLink, useLocation } from 'react-router-dom';
import { Aside } from './styles';
import { Approutes, navList } from '../../constants';
import { CaretDown, Logout } from '../../assets/svgs';
import { Logo } from '../../assets/images';

const Navbar = () => {
	const { pathname } = useLocation();

	return (
		<Aside>
			<div className="logo">
				<img src={Logo} alt="" />
			</div>

			<nav>
				<ul>
					{navList.map((list) =>
						list.menu ? (
							<li className={`isDrop ${pathname.startsWith(list.link) ? 'hasActiveChild' : ''}`} key={list.name}>
								<div tabIndex={0}>
									<span>{list.svg.default}</span> {list.name} <CaretDown className="caret" />
								</div>

								<ul>
									{list.menu.map((child) => (
										<NavLink key={child.name} to={child.link} end>
											<li>{child.name}</li>
										</NavLink>
									))}
								</ul>
							</li>
						) : (
							<NavLink key={list.name} to={list.link} end={list?.isEnd}>
								<li>
									<span className="active">{list.svg.active}</span> <span>{list.svg.default}</span> {list.name}
								</li>
							</NavLink>
						)
					)}
				</ul>

				<ul>
					<Link to={Approutes.auth.logout}>
						<li>
							<Logout /> Logout
						</li>
					</Link>
				</ul>
			</nav>
		</Aside>
	);
};

export default Navbar;
