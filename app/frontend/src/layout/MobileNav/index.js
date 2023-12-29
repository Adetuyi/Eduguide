import { Link, NavLink, useLocation } from 'react-router-dom';
import { Container } from './styles';
import { Approutes, navList } from '../../constants';
import { CaretDown, Logout } from '../../assets/svgs';
import { useEffect, useRef } from 'react';
import { Logo } from '../../assets/images';

const MobileNav = ({ setNav, nav }) => {
	const { pathname } = useLocation();

	const navRef = useRef();

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (navRef.current && !navRef.current.contains(e.target)) {
				setNav(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [setNav]);
	return (
		<Container>
			<div className={nav ? 'show' : 'close'}>
				<aside ref={navRef}>
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

						<div className="profile">
							<div className="dropdown--con" tabIndex={0}>
								<div className="initials">ft</div>

								<div>
									<div className="name">Frontend Team</div>
									<div className="role">Admin</div>
								</div>
								{/* <CaretDownFill /> */}

								{/* <ul className="dropdown">
									<li>
										<Events /> Sign out
									</li>
								</ul> */}
							</div>
						</div>
					</nav>
				</aside>
			</div>
		</Container>
	);
};

export default MobileNav;
