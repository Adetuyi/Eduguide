import { Button, Modal } from '../../ui';

const DetailsModal = ({ closeModal, handleEdit, handleDelete, record, data }) => {
	return (
		<Modal closeModal={closeModal}>
			<div className="row--content">
				<div className="row--items">
					{data.map((item) => (
						<div key={item.name}>
							<p>{item.name}</p>
							<p>{item.value}</p>
						</div>
					))}
				</div>
				<div className="button--group">
					<div>
						<Button variant="secondary" onClick={closeModal}>
							Close
						</Button>
					</div>
					<div>
						<Button variant="subtle" onClick={() => handleDelete(record)}>
							Delete
						</Button>
						<Button onClick={() => handleEdit(record)}>Edit</Button>
					</div>
				</div>
			</div>
		</Modal>
	);
};
export default DetailsModal;
