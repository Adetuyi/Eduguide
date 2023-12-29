import { useMutation, useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { Appurls } from '../constants';

export const useGetExam = () => {
	const axios = useAxios();

	return useQuery({ queryFn: () => axios.get(Appurls.exam.get_all).then((response) => response.data), queryKey: ['exam'] });
};

export const useCreateExam = () => {
	const axios = useAxios();

	return useMutation({ mutationFn: (data) => axios.post(Appurls.exam.create, data) });
};

export const useUpdateExam = () => {
	const axios = useAxios();

	return useMutation({ mutationFn: ({ id, data }) => axios.patch(Appurls.exam.update(id), data) });
};

export const useDeleteExam = () => {
	const axios = useAxios();

	return useMutation({ mutationFn: (id) => axios.delete(Appurls.exam.delete(id)) });
};
