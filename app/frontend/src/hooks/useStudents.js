import { useMutation, useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { Appurls } from '../constants';

export const useGetStudents = () => {
	const axios = useAxios();

	return useQuery({ queryFn: () => axios.get(Appurls.student.get_all).then((response) => response.data), queryKey: ['students'] });
};

export const useCreateStudent = () => {
	const axios = useAxios();

	return useMutation({ mutationFn: (data) => axios.post(Appurls.student.create, data) });
};

export const useUpdateStudent = () => {
	const axios = useAxios();

	return useMutation({ mutationFn: ({ id, data }) => axios.patch(Appurls.student.update(id), data) });
};

export const useDeleteStudent = () => {
	const axios = useAxios();

	return useMutation({ mutationFn: (id) => axios.delete(Appurls.student.delete(id)) });
};
