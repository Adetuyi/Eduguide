import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import { Appurls } from '../constants';

const usePrediction = ({ id }) => {
	const axios = useAxios();

	return useQuery({ queryFn: () => axios.get(Appurls.predict(id)).then((response) => response.data), queryKey: ['predicting', id] });
};

export default usePrediction;
