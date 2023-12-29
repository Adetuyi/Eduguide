import { useEffect } from 'react';
import { axios } from '../library';
import { Appurls } from '../constants';

const useGetCsrfToken = () => {
	useEffect(() => {
		axios.get(Appurls.auth.get_csrf_token);
	});
	return <div>useGetCsrfToken</div>;
};
export default useGetCsrfToken;
