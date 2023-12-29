import { Space } from 'antd';
import { Tag } from '../ui';
import { Delete, Edit, EyeOpen } from '../assets/svgs';

export const studentTableColumns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		fixed: true,
		// render: (text) => <a>{text}</a>,
	},
	{
		title: 'Matriculation number',
		dataIndex: 'matric_no',
		key: 'matric_no',
	},
	{
		title: 'Date Joined',
		dataIndex: 'date_joined',
		key: 'date',
	},
	{
		title: 'Price',
		key: 'price',
		dataIndex: 'price',
	},
	{
		title: 'Plan',
		key: 'plan',
		dataIndex: 'plan',
		render: (tag) => {
			let color;
			if (tag === 'Full') {
				color = '#161331';
			} else {
				color = '#B44A23';
			}
			return (
				<Tag color={color} key={tag}>
					<div className="tag">{tag}</div>
				</Tag>
			);
		},
	},
];

export const examcolumns = ({ handleView, handleDelete, handleEdit }) => [
	{
		title: 'Course Code',
		dataIndex: 'code',
		key: 'code',
		render: (record) => record.code,
		fixed: true,
	},
	{
		title: 'Matric Number',
		key: 'Matric_number',
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

export const attendancecolumns = ({ totalStudents, handleDelete, handleEdit, handleView }) => [
	{
		title: 'Course Code',
		dataIndex: 'code',
		key: 'code',
		render: (record) => record.code,
		fixed: true,
	},
	{
		title: 'Title',
		dataIndex: 'code',
		key: 'title',
		render: (record) => record.title,
	},
	{
		title: 'Class Number',
		dataIndex: 'class_number',
		key: 'class_number',
	},
	{
		title: 'Total Student Present',
		key: 'present',
		dataIndex: 'students',
		render: (students) => `${students.length}/${totalStudents}`,
	},
	{
		title: 'Students',
		key: 'students',
		dataIndex: 'students',
		render: (students) => students.map((student) => student.matric_number).join(', '),
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
export const assessmentcolumns = ({ handleView, handleDelete, handleEdit }) => [
	{
		title: 'Course Code',
		dataIndex: 'code',
		key: 'code',
		render: (record) => record.code,
		fixed: true,
	},
	{
		title: 'Matric Number',
		key: 'Matric_number',
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
