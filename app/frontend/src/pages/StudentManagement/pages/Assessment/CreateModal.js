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
					placeholder="e.g CSC 400"
					required
					options={courses?.map((course) => course.code)}
					shouldFilterByDefault={false}
				/>
				<SelectGroup
					label="Student"
					name="student"
					value={formData.student}
					onChange={handleChange}
					placeholder="Select student"
					required
					options={students?.map((student) => student.matric_number)}
				/>
				<InputGroup
					label="Assessment Score"
					name="score"
					type="number"
					value={formData.score}
					onChange={handleChange}
					placeholder="e.g 0 - 30"
					required
					min={0}
					max={30}
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
