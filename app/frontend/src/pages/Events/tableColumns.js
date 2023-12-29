import { Space } from 'antd';
import { Delete, Edit } from '../../assets/svgs';
import { Tag } from '../../ui';

export const columns = ({ handleDeleteEventClick, handleEditEventClick }) => [
	{
		title: 'Event',
		dataIndex: 'event',
		key: 'event',
		fixed: true,
	},
	{
		title: 'Mode',
		dataIndex: 'mode',
		key: 'mode',
	},
	{
		title: 'Price',
		dataIndex: 'price',
		key: 'price',
	},
	{
		title: 'Start Date',
		dataIndex: 'start',
		key: 'start',
	},
	{
		title: 'Deadline',
		dataIndex: 'end',
		key: 'end',
	},
	{
		title: 'Count/Slots',
		dataIndex: 'count',
		key: 'count',
	},
	{
		title: 'Status',
		key: 'status',
		dataIndex: 'status',
		render: (tag) => {
			let color;
			if (tag === 'Published') {
				color = '#10B981';
			} else {
				color = '#64748B';
			}
			return (
				<Tag color={color} key={tag}>
					<div className="tag">{tag}</div>
				</Tag>
			);
		},
	},
	{
		title: 'Action',
		key: 'action',
		render: (record) => (
			<Space size="middle">
				<span style={{ cursor: 'pointer' }}>
					<Edit onClick={() => handleEditEventClick(record)} />
				</span>
				<span style={{ cursor: 'pointer' }}>
					<Delete onClick={() => handleDeleteEventClick(record)} />
				</span>
			</Space>
		),
	},
];
