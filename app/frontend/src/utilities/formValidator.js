import { errorModes } from '../constants';

export const isEmail = (email) => {
	return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		email
	);
};

export const isUrl = (url) => {
	return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
		url
	);
};
export const isRoute = (url) => url.startsWith('/');

export const emailValidator = (input, mode) => {
	const { type, value, required, dataset } = input;
	const errorDom = '';
	let validated = true;

	if (required && errorDom) {
		if (value) {
			validated = true;
		} else {
			errorDom.innerHTML = `This field is required`;
		}
	}
	if (type === 'email' && errorDom) {
		if (isEmail(value)) {
			validated = true;
		} else {
			validated = false;
		}
	}

	if (validated) {
		if (mode === errorModes.warn) {
			errorDom.innerHTML = dataset.successmsg;
		} else {
			errorDom.innerHTML = '';
		}
	} else {
		if (mode === errorModes.warn) {
			errorDom.innerHTML = dataset.warnmsg;
		} else if (mode === errorModes.error) {
			errorDom.innerHTML = dataset.errormsg || 'Invalid Email Address';
		} else {
			errorDom.innerHTML = '';
		}
	}
};

const formValidator = (inputs) => {
	let validated = true;
	Array.from(inputs).map((input) => {
		const { type, value, required } = input;
		const inputId = input.getAttribute('data-errorid');
		const errorDom = inputId ? document.getElementById(inputId) : null;
		const isPassword = input.getAttribute('data-type');

		const name = input.getAttribute('data-label') ? input.getAttribute('data-label') : input.name;
		if (required && !isPassword && errorDom) {
			if (value) {
				errorDom.innerHTML = '';
			} else {
				validated = false;
				errorDom.innerHTML = `${name} cannot be blank`;
			}
		}

		if (type === 'email' && errorDom) {
			if (isEmail(value)) {
				errorDom.innerHTML = '';
			} else {
				validated = false;
				errorDom.innerHTML = 'Invalid Email Address';
			}
		}

		if (required && type === 'url' && errorDom) {
			if (isUrl(value) || isRoute(value)) {
				errorDom.innerHTML = '';
			} else {
				validated = false;
				errorDom.innerHTML = 'Invalid Url';
			}
		}

		// if (type === 'file') {
		//   if (!value && required) {
		//     errorDom.innerHTML = ''
		//   } else {
		//     validated = false
		//     errorDom.innerHTML = `${name} are required`
		//   }
		// }

		if ((type === 'password' || isPassword) && errorDom) {
			if (value) {
				if (value.length < 5) {
					validated = false;
					errorDom.innerHTML = `Your password must be greater than 5 characters`;
				} else {
					errorDom.innerHTML = '';
				}
			} else {
				validated = false;
				errorDom.innerHTML = `Password cannot be blank`;
			}
		}

		return input;
	});
	return validated;
};

export default formValidator;
