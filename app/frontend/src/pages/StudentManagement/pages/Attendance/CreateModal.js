import { Button, InputGroup, Modal, SelectGroup } from '../../../../ui';

const CreateModal = ({ students, courses, closeModal, handleSubmit, formData, handleChange, isLoading }) => {
	return (
		<Modal closeModal={closeModal} heading={'Create Course'}>
			<form onSubmit={handleSubmit}>
				<SelectGroup
					label="Course Code"
					name="course"
					value={courses?.find((course) => course.id === formData.course)?.code}
					onChange={(_event, _name, value) => handleChange(null, 'course', courses?.find((course) => course.code === value)?.id)}
					placeholder="e.g 3"
					required
					options={courses?.map((course) => course.code)}
					shouldFilterByDefault={false}
				/>
				<InputGroup
					label="Class Number"
					name="class_number"
					type="number"
					value={formData.class_number}
					onChange={handleChange}
					placeholder="e.g 1"
					required
				/>
				<SelectGroup
					label="Students Present"
					name="students"
					variant="multiple"
					value={formData.students}
					onChange={handleChange}
					placeholder="Select present students"
					required
					options={students?.map((student) => student.matric_number)}
				/>

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
