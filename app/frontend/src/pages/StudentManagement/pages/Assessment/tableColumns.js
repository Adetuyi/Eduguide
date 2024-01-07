import { Space } from 'antd';
import { Delete, Edit, EyeOpen } from '../../../../assets/svgs';

export const columns = ({ handleView, handleDelete, handleEdit }) => [
	{
		title: 'Course Code',
		dataIndex: 'course',
		key: 'course',
		render: (course) => course.code,
		fixed: true,
	},
	{
		title: 'Matric Number',
		key: 'matric_number',
		dataIndex: 'student',
		render: (student) => student.matric_number,
	},
	{
		title: 'First Name',
		key: 'first_name',
		dataIndex: 'student',
		render: (student) => student.first_name,
	},
	{
		title: 'Score',
		key: 'score',
		dataIndex: 'score',
	},
	{
		title: 'Action',
		key: 'action',
		render: (record) => (
			<Space size="middle">
				<span style={{ cursor: 'pointer' }}>
					<EyeOpen style={{ width: '16px', height: 'auto' }} onClick={() => handleView(record)} />
				</span>
				<span style={{ cursor: 'pointer' }}>
					<Edit onClick={() => handleEdit(record)} />
				</span>
				<span style={{ cursor: 'pointer' }}>
					<Delete onClick={() => handleDelete(record)} />
				</span>
			</Space>
		),
	},
];
