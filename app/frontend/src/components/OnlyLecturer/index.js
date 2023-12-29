import { Outlet } from 'react-router-dom';
import { PageNotFound } from '../../pages';

const OnlyLecturer = () => {
	return JSON.parse(localStorage.getItem('user'))?.roles?.includes('LECTURER') ? <Outlet /> : <PageNotFound />;
};
export default OnlyLecturer;
