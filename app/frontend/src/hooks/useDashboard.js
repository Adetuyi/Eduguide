import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { Appurls } from '../constants';

const useGetDashboardStats = () => {
	const axios = useAxios();

	return useQuery({
		queryFn: () => axios.get(Appurls.dashboard.get_stats).then((response) => response.data),
		queryKey: ['dashboard-stats'],
	});
};

export default useGetDashboardStats;
