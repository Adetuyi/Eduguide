import { useMutation, useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { Appurls } from '../constants';

export const useGetAttendance = () => {
	const axios = useAxios();

	return useQuery({ queryFn: () => axios.get(Appurls.attendance.get_all).then((response) => response.data), queryKey: ['attendance'] });
};

export const useCreateAttendance = () => {
	const axios = useAxios();

	return useMutation({ mutationFn: (data) => axios.post(Appurls.attendance.create, data) });
};

export const useUpdateAttendance = () => {
	const axios = useAxios();

	return useMutation({ mutationFn: ({ id, data }) => axios.patch(Appurls.attendance.update(id), data) });
};

export const useDeleteAttendance = () => {
	const axios = useAxios();

	return useMutation({ mutationFn: (id) => axios.delete(Appurls.attendance.delete(id)) });
};
