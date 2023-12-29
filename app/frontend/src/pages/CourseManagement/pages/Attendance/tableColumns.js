import { Space } from 'antd';
import { Delete, Edit, EyeOpen } from '../../../../assets/svgs';

export const columns = ({ totalStudents, handleDelete, handleEdit, handleView }) => [
	{
		title: 'Course Code',
		dataIndex: 'course',
		key: 'code',
		render: (record) => record.code,
		fixed: true,
	},
	{
		title: 'Title',
		dataIndex: 'course',
		key: 'title',
		render: (record) => record.title,
	},
	{
		title: 'Class Number',
		dataIndex: 'class_number',
		key: 'class_number',
		render: (record) => `Class ${record}`,
	},
	{
		title: 'Attendance Rate',
		key: 'present',
		dataIndex: 'students',
		render: (students) => `${students.length}/${totalStudents}`,
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
