// Supported formats
// mm dd yyyy - Oct 10, 2023
// dd/mm/yyyy - 10/10/2023

const getDateTime = (d, format = 'dd/mm/yyyy', isDate = true) => {
	if (isDate) {
		let formattedDate = '';
		if (format === 'mm dd yyyy') {
			let date = new Date(d).toDateString().split(' ');
			date.shift();

			for (let i = 0; i < date.length; i++) {
				i + 2 === date.length ? (formattedDate += date[i] + ', ') : (formattedDate += date[i] + ' ');
			}

			return formattedDate.trim();
		} else if (format === 'dd/mm/yyyy') {
			let date = new Date(d);
			let day = date.getDate().toString().length === 1 ? `0${date.getDate()}` : date.getDate();
			let month = (date.getMonth() + 1).toString().length === 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
			let year = date.getFullYear().toString().length === 1 ? `0${date.getFullYear()}` : date.getFullYear();

			return `${day}/${month}/${year}`;
		}
	} else {
		let period = 'AM';
		let date = new Date(d);
		let hours = date.getHours();

		if (hours === 0) {
			hours = 12;
		} else if (hours === 12) {
			period = 'PM';
		} else if (hours > 12) {
			hours %= 12;
			period = 'PM';
		}
		return `${hours}:${date.getMinutes()} ${period}`;
	}
};

export default getDateTime;
