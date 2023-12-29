import { Button, InputGroup, Modal, SelectGroup } from '../../ui';

const EditModal = ({ closeModal, handleSubmit, formData, handleChange, isLoading }) => {
	return (
		<Modal closeModal={closeModal} heading={'Edit Student'}>
			<form onSubmit={handleSubmit}>
				<InputGroup name="first_name" label="First Name" value={formData.first_name} onChange={handleChange} placeholder="e.g John" required />

				<InputGroup label="Last Name" name="last_name" placeholder="e.g Doe" value={formData.last_name} onChange={handleChange} required />

				<InputGroup
					type="number"
					label="Matric Number"
					name="matric_number"
					value={formData.matric_number}
					onChange={handleChange}
					placeholder="e.g 190591000"
					required
				/>

				<div className="input--con">
					<InputGroup
						type="date"
						label="Date of Birth"
						name="date_of_birth"
						value={formData.date_of_birth}
						onChange={handleChange}
						placeholder="e.g 1/1/2023"
						required
					/>

					<SelectGroup
						label="Gender"
						name="gender"
						value={formData.gender}
						onChange={handleChange}
						placeholder="Select Gender"
						required
						options={['Male', 'Female']}
						shouldFilterByDefault={false}
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
export default EditModal;
