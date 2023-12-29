import { Space } from 'antd';
import { Delete, Edit, EyeOpen, Predict } from '../../assets/svgs';
import { getDateTime } from '../../utilities';

export const columns = ({ handleDelete, handleEdit, handleView, handlePredict }) => [
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
	{
		title: 'Action',
		key: 'action',
		render: (record) => (
			<Space size="middle">
				<span style={{ cursor: 'pointer' }}>
					<EyeOpen title="Open Record" style={{ width: '16px', height: 'auto' }} onClick={() => handleView(record)} />
				</span>
				<span style={{ cursor: 'pointer' }}>
					<Edit title="Edit Record" onClick={() => handleEdit(record)} />
				</span>
				<span style={{ cursor: 'pointer' }}>
					<Delete title="Delete Record" onClick={() => handleDelete(record)} />
				</span>
				<span style={{ cursor: 'pointer' }}>
					<Predict title="Predict Performance" onClick={() => handlePredict(record)} />
				</span>
			</Space>
		),
	},
];
