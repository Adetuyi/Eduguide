import { useMutation, useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { Appurls } from '../constants';

export const useGetAssessment = () => {
	const axios = useAxios();

	return useQuery({ queryFn: () => axios.get(Appurls.assessment.get_all).then((response) => response.data), queryKey: ['assessment'] });
};

export const useCreateAssessment = () => {
	const axios = useAxios();

	return useMutation({ mutationFn: (data) => axios.post(Appurls.assessment.create, data) });
};

export const useUpdateAssessment = () => {
	const axios = useAxios();

	return useMutation({ mutationFn: ({ id, data }) => axios.patch(Appurls.assessment.update(id), data) });
};

export const useDeleteAssessment = () => {
	const axios = useAxios();

	return useMutation({ mutationFn: (id) => axios.delete(Appurls.assessment.delete(id)) });
};
