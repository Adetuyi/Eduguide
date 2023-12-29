import { useMutation, useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { Appurls } from '../constants';

export const useGetCourses = () => {
	const axios = useAxios();

	return useQuery({ queryFn: () => axios.get(Appurls.course.get_all).then((response) => response.data), queryKey: ['courses'] });
};

export const useCreateCourse = () => {
	const axios = useAxios();

	return useMutation({ mutationFn: (data) => axios.post(Appurls.course.create, data) });
};

export const useUpdateCourse = () => {
	const axios = useAxios();

	return useMutation({ mutationFn: ({ id, data }) => axios.patch(Appurls.course.update(id), data) });
};

export const useDeleteCourse = () => {
	const axios = useAxios();

	return useMutation({ mutationFn: (id) => axios.delete(Appurls.course.delete(id)) });
};
