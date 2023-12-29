import { useState } from 'react';
import { Create } from '../../assets/svgs';
import { PageHeader } from '../../components';
import { Button, InputGroup, Modal } from '../../ui';
import TableContainer from '../../ui/TableContainer';
import { Container } from './styles';
import { columns } from './tableColumns';

const Events = () => {
	const [createModal, setCreateModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [editingEvent, setEditingEvent] = useState(null);
	const [data, setData] = useState([
		{
			key: '1',
			event: 'Product design',
			mode: 'Physical',
			price: '₦ 240,000',
			start: 'Sept 11, 2022',
			end: 'Sept 11, 2022',
			count: '23/56',
			status: 'Published',
			action: '',
		},
		{
			key: '2',
			event: 'Product management',
			mode: 'Virtual',
			price: '₦ 240,000',
			start: 'Sept 11, 2022',
			end: 'Sept 11, 2022',
			count: '23/56',
			status: 'Unpublished',
			action: '',
		},
		{
			key: '3',
			event: 'Software development',
			mode: 'Physical',
			price: '₦ 240,000',
			start: 'Sept 11, 2022',
			end: 'Sept 11, 2022',
			count: '23/56',
			status: 'Published',
			action: '',
		},
		{
			key: '4',
			event: 'Product management',
			mode: 'Physical',
			price: '₦ 240,000',
			start: 'Sept 11, 2022',
			end: 'Sept 11, 2022',
			count: '23/56',
			status: 'Published',
			action: '',
		},
		{
			key: '5',
			event: 'salesforce',
			mode: 'Physical',
			price: '₦ 240,000',
			start: 'Sept 11, 2022',
			end: 'Sept 11, 2022',
			count: '23/56',
			status: 'Unpublished',
			action: '',
		},
		{
			key: '6',
			event: 'Web design',
			mode: 'Virtual',
			price: '₦ 240,000',
			start: 'Sept 11, 2022',
			end: 'Sept 11, 2022',
			count: '23/56',
			status: 'Published',
			action: '',
		},
		{
			key: '7',
			event: 'Product design',
			mode: 'Virtual',
			price: '₦ 240,000',
			start: 'Sept 11, 2022',
			end: 'Sept 11, 2022',
			count: '23/56',
			status: 'Unpublished',
			action: '',
		},
		{
			key: '8',
			event: 'Product design',
			mode: 'Virtual',
			price: '₦ 240,000',
			start: 'Sept 11, 2022',
			end: 'Sept 11, 2022',
			count: '23/56',
			status: 'Published',
			action: '',
		},
		{
			key: '9',
			event: 'DevOps',
			mode: 'Virtual',
			price: '₦ 240,000',
			start: 'Sept 11, 2022',
			end: 'Sept 11, 2022',
			count: '23/56',
			status: 'Published',
			action: '',
		},
		{
			key: '10',
			event: 'QA',
			mode: 'Virtual',
			price: '₦ 240,000',
			start: 'Sept 11, 2022',
			end: 'Sept 11, 2022',
			count: '23/56',
			status: 'Unpublished',
			action: '',
		},
		{
			key: '11',
			event: 'Salesforce',
			mode: 'Virtual',
			price: '₦ 240,000',
			start: 'Sept 11, 2022',
			end: 'Sept 11, 2022',
			count: '23/56',
			status: 'Published',
			action: '',
		},
		{
			key: '12',
			event: 'Cloud',
			mode: 'Virtual',
			price: '₦ 240,000',
			start: 'Sept 11, 2022',
			end: 'Sept 11, 2022',
			count: '23/56',
			status: 'Published',
			action: '',
		},
	]);
	const [addEvent, setAddEvent] = useState({
		key: '',
		event: '',
		mode: '',
		price: '',
		start: '',
		end: '',
		count: '',
		status: '',
	});

	const handleAddEventChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setAddEvent((prev) => ({ ...prev, [name]: value }));
	};

	const handleEditEventChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setEditingEvent((prev) => ({ ...prev, [name]: value }));
	};

	const closeCreateModal = () => {
		setCreateModal(!createModal);
	};
	const closeEditModal = () => {
		setEditModal(!editModal);
	};

	const formOptions = {
		placeholder: 'Search events',
		button: 'Create event',
		filter: {
			placeholder: 'All Status',
			filterBy: [
				{ key: 'all', option: 'All status' },
				{ key: 'published', option: 'Published only' },
				{ key: 'unpublished', option: 'Unpublished only' },
			],
		},
	};

	const handleEditSave = (eventStatus, e) => {
		e.preventDefault();

		const requiredFields = document.querySelectorAll('.required');
		let formValid = true;

		requiredFields.forEach((field) => {
			if (field.value === '') {
				formValid = false;
			}
		});

		if (formValid) {
			setData((prev) => {
				return prev.map((item) => {
					if (item.key === editingEvent.key) {
						return {
							...editingEvent,
							status: eventStatus,
							price: editingEvent?.price?.includes('₦', ',') ? editingEvent.price : '₦ ' + editingEvent.price,
						};
					} else {
						return item;
					}
				});
			});
			setEditModal(false);
		}
	};

	const handleSave = (eventStatus, e) => {
		e.preventDefault();

		const requiredFields = document.querySelectorAll('.required');
		let formValid = true;

		requiredFields.forEach((field) => {
			if (field.value === '') {
				formValid = false;
			}
		});

		if (formValid) {
			setData((prev) => {
				const randomNum = parseInt(Math.random() * 100);

				const updatedEvent = {
					...addEvent,
				};
				updatedEvent.key = randomNum;
				updatedEvent.status = eventStatus;
				updatedEvent.price = '₦ ' + updatedEvent.price;
				return [updatedEvent, ...prev];
			});
			setCreateModal(false);
		}
	};

	const handleEditEventClick = (record) => {
		setEditModal(!editModal);
		setEditingEvent(record);
	};

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(selectedRowKeys);
			console.log(selectedRows);
		},
	};

	const modeOptions = (
		<>
			<option value="">Select mode</option>
			<option value="Virtual">Virtual</option>
			<option value="Physical"> Physical</option>
		</>
	);

	return (
		<Container>
			{createModal ? (
				<Modal closeModal={closeCreateModal} heading={'Create Event'}>
					<form>
						<InputGroup
							name="event"
							label="Event name"
							value={addEvent.event}
							onChange={handleAddEventChange}
							placeholder="Placeholder"
							className="required"
							required
						/>

						<div className="input--con">
							<InputGroup
								type="date"
								label="Start date"
								name="start"
								value={addEvent.start}
								onChange={handleAddEventChange}
								className="required"
								required
							/>
							<InputGroup
								type="date"
								label="End date"
								name="end"
								value={addEvent.end}
								onChange={handleAddEventChange}
								className="required"
								required
							/>
						</div>

						<div className="input--con">
							<InputGroup
								type="date"
								label="Deadline"
								name="end"
								value={addEvent.end}
								onChange={handleAddEventChange}
								className="required"
								required
							/>

							<InputGroup
								label="Total slots"
								placeholder="1234"
								name="count"
								value={addEvent.count}
								onChange={handleAddEventChange}
								className="required"
								required
							/>
						</div>

						<div className="input--con">
							<InputGroup
								type="select"
								placeholder=""
								label="Mode"
								name="mode"
								value={addEvent.mode}
								onChange={handleAddEventChange}
								optionLists={modeOptions}
								className="required"
								required
							/>

							<InputGroup
								type="price"
								label="Price"
								value={addEvent.price}
								onChange={handleAddEventChange}
								name="price"
								placeholder="000 000"
								className="required"
								required
							/>
						</div>

						<InputGroup type="textarea" label="Provide more details" optional name="details" placeholder="Placeholder" />
					</form>
					<div className="button--group">
						<div>
							<Button onClick={() => setCreateModal(!createModal)} variant="text">
								Cancel
							</Button>
						</div>

						<div>
							<Button value="Unpublished" onClick={(e) => handleSave('Unpublished', e)} variant="secondary">
								Save
							</Button>
							<Button value="Published" onClick={(e) => handleSave('Published', e)}>
								Save & Publish
							</Button>
						</div>
					</div>
				</Modal>
			) : null}

			{editModal ? (
				<Modal closeModal={closeEditModal} heading={'Edit Event'} editing>
					<form>
						<InputGroup
							name="event"
							label="Event name"
							value={editingEvent?.event}
							onChange={handleEditEventChange}
							placeholder="Placeholder"
							className={'required'}
							required
						/>

						<div className="input--con">
							<InputGroup
								type="date"
								label="Start date"
								name="start"
								value={editingEvent?.start}
								onChange={handleEditEventChange}
								className={'required'}
								required
							/>
							<InputGroup
								type="date"
								label="End date"
								name="end"
								value={editingEvent?.end}
								onChange={handleEditEventChange}
								className={'required'}
								required
							/>
						</div>

						<div className="input--con">
							<InputGroup
								type="date"
								label="Deadline"
								name="end"
								value={editingEvent?.end}
								onChange={handleEditEventChange}
								className={'required'}
								required
							/>

							<InputGroup
								label="Total slots"
								placeholder="1234"
								name="count"
								value={editingEvent?.count}
								onChange={handleEditEventChange}
								className={'required'}
								required
							/>
						</div>

						<div className="input--con">
							<InputGroup
								type="select"
								placeholder=""
								label="Mode"
								name="mode"
								value={editingEvent?.mode}
								onChange={handleEditEventChange}
								optionLists={modeOptions}
								className={'required'}
								required
							/>

							<InputGroup
								type="price"
								label="Price"
								value={editingEvent?.price}
								onChange={handleEditEventChange}
								name="price"
								placeholder="000 000"
								className={'required'}
								required
							/>
						</div>

						<InputGroup type="textarea" label="Provide more details" optional name="details" placeholder="Placeholder" />
					</form>
					<div className="button--group">
						<div>
							<Button onClick={() => setEditModal(!editModal)} type="text">
								Cancel
							</Button>
						</div>
						{editingEvent?.status === 'Published' ? (
							<div>
								<Button onClick={(e) => handleEditSave('Unpublished', e)} type="error">
									Unpublish
								</Button>
								<Button onClick={(e) => handleEditSave('Published', e)}>Save Changes</Button>
							</div>
						) : (
							<div>
								<Button onClick={(e) => handleEditSave('Unpublished', e)} type="secondary">
									Save Only
								</Button>
								<Button onClick={(e) => handleEditSave('Published', e)}>Save & Publish</Button>
							</div>
						)}
					</div>
				</Modal>
			) : null}

			<PageHeader title="Events" />

			<TableContainer
				columns={columns({
					handleDeleteEventClick: (record) => {
						setData((prev) => {
							return prev.filter((row) => row.key !== record.key);
						});
					},
					handleEditEventClick: (record) => {
						handleEditEventClick(record);
					},
				})}
				title={`All Events: ${data.length}`}
				dataSource={data}
				options={formOptions}
				selection={rowSelection}
				setCreateModal={setCreateModal}
				createModal={createModal}
				onRow={(record, rowIndex) => {
					console.log(record);
					console.log(rowIndex);
				}}
			/>

			<div className="create--mobile">
				<Create onClick={() => setCreateModal(!createModal)} />
			</div>
		</Container>
	);
};

export default Events;
