import { useNavigate } from 'react-router-dom';
import { Approutes } from '../../constants';
import { useEffect } from 'react';
import { useAuth } from '../../hooks';
import { isLecturer } from '../../utilities';

const Dashboard = () => {
	const navigate = useNavigate();
	const { user } = useAuth();

	useEffect(() => {
		navigate(isLecturer(user) ? Approutes.dashboard.lecturer : Approutes.dashboard.student, { replace: true });
	}, [navigate, user]);
};
export default Dashboard;
