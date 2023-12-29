import { Space } from 'antd';
import { Delete, Edit, EyeOpen } from '../../../../assets/svgs';

export const columns = ({ handleDelete, handleEdit, handleView }) => [
	{
		title: 'Code',
		dataIndex: 'code',
		key: 'mode',
		fixed: true,
	},
	{
		title: 'Title',
		dataIndex: 'title',
		key: 'event',
	},
	{
		title: 'Unit',
		dataIndex: 'unit',
		key: 'price',
	},
	{
		title: 'Status',
		key: 'status',
		dataIndex: 'status',
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
