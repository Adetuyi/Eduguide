import { Button, InputGroup, Modal, SelectGroup } from '../../../../ui';

const CreateModal = ({ closeModal, handleSubmit, formData, handleChange, isLoading }) => {
	return (
		<Modal closeModal={closeModal} heading={'Create Course'}>
			<form onSubmit={handleSubmit}>
				<InputGroup
					name="title"
					label="Course Title"
					value={formData.title}
					onChange={handleChange}
					placeholder="e.g Intro to Programming Language"
					required
				/>

				<InputGroup label="Course Code" name="code" placeholder="e.g CSC 400" value={formData.code} onChange={handleChange} required />

				<div className="input--con">
					<SelectGroup
						label="Unit"
						name="unit"
						value={formData.unit}
						onChange={handleChange}
						placeholder="e.g 3"
						required
						options={['1', '2', '3', '4']}
					/>
					<SelectGroup
						label="Status"
						name="status"
						value={formData.status}
						onChange={handleChange}
						placeholder="e.g C"
						required
						options={['C', 'R', 'E']}
					/>
				</div>

				<div className="button--group">
					<Button disabled={isLoading} onClick={closeModal} type="button" variant="text">
						Cancel
					</Button>
					<Button loading={isLoading} variant="secondary">
						Save
					</Button>
				</div>
			</form>
		</Modal>
	);
};
export default CreateModal;
