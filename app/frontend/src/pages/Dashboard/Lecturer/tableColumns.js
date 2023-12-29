import { getDateTime } from '../../../utilities';

export const columns = [
	{
		title: 'First Name',
		dataIndex: 'first_name',
		key: 'first_name',
		fixed: true,
	},
	{
		title: 'Last Name',
		dataIndex: 'last_name',
		key: 'last_name',
	},
	{
		title: 'Matric Number',
		dataIndex: 'matric_number',
		key: 'matric_number',
	},
	{
		title: 'Gender',
		dataIndex: 'gender',
		key: 'gender',
	},
	{
		title: 'Date of Birth',
		dataIndex: 'date_of_birth',
		key: 'date_of_birth',
		render: (record) => getDateTime(record, 'mm dd yyyy'),
	},
];
