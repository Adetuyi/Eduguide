import { toast } from 'react-toastify';
import { Notification } from '../ui';

const useNotify = () => {
	const notify = (args) => {
		const { message = '', status = 'info', variant = 'major', toastOptions = {} } = args;

		toast(<Notification message={message} variant={variant} status={status} />, toastOptions);
	};

	return notify;
};
/*
notify args = {
	message: type.string,
	variant: type.oneOf(['major', 'minor']),
	status: type.oneOf(['info', 'success', 'error']),
	toastOptions: type.object,
};
*/
export default useNotify;
