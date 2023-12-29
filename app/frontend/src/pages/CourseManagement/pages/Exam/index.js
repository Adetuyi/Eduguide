import { useState } from 'react';
import { Create } from '../../../../assets/svgs';
import { PageHeader, DetailsModal } from '../../../../components';
import TableContainer from '../../../../ui/TableContainer';
import { Container } from './styles';
import { columns } from './tableColumns';
import { useCreateExam, useDeleteExam, useGetExam, useGetCourses, useGetStudents, useNotify, useUpdateExam } from '../../../../hooks';
import CreateModal from './CreateModal';
import EditModal from './EditModal';
import { handleApiError } from '../../../../utilities';

const Exam = () => {
	const notify = useNotify();

	const [formData, setFormData] = useState({
		id: '',
		course: '',
		score: '',
		student: '',
	});
	const [modal, setModal] = useState({ isCreating: false, isEditing: false, isViewing: false });

	const { data: exams, isLoading, refetch } = useGetExam();
	const { data: students } = useGetStudents();
	const { data: courses } = useGetCourses();
	const { mutate: createExam, isLoading: isCreating } = useCreateExam();
	const { mutate: updateExam, isLoading: isUpdating } = useUpdateExam();
	const { mutate: deleteExam } = useDeleteExam();

	const detailsData = [
		{ name: 'Course Code', value: formData.course.code },
		{ name: 'Title', value: formData.course.title },
		{ name: 'Matric Number', value: formData.student.matric_number },
		{ name: 'First Name', value: formData.student.first_name },
		{ name: 'Score', value: formData.score },
	];

	const handleChange = (event, name, value) => {
		name = event?.target?.name || name || '';
		value = event?.target?.value || value || '';

		setFormData((prev) => ({ ...prev, [name]: value }));
	};
	const handleDelete = (record) => {
		deleteExam(record?.id, {
			onSuccess: () => {
				refetch();
				notify({ message: 'Exam deleted successfully!', status: 'success', toastOptions: { toastId: 'exam_deletion_success' } });
			},
			onError: (error) =>
				notify({
					message: handleApiError(error) || 'Unable to delete exam!',
					status: 'error',
					toastOptions: { toastId: 'exam_deletion_failure' },
				}),
		});
	};
	const handleEdit = (record) => {
		setFormData({
			id: record.id,
			course: record.course.id,
			score: record.score,
			student: record.student.matric_number,
		});
		setModal((prev) => ({ ...prev, isEditing: true }));
	};
	const handleView = (record) => {
		setFormData(record);
		setModal((prev) => ({ ...prev, isViewing: true }));
	};

	const handleCreateModalClose = () => {
		setModal((prev) => ({ ...prev, isCreating: false }));
		resetFormData();
	};
	const handleEditModalClose = () => {
		setModal((prev) => ({ ...prev, isEditing: false }));
		resetFormData();
	};
	const handleDetailsModalClose = () => {
		setModal((prev) => ({ ...prev, isViewing: false }));
		resetFormData();
	};

	const handleExamCreation = (event) => {
		event.preventDefault();

		const data = {
			course: formData.course,
			score: parseInt(formData.score),
			student: students?.find((student) => student.matric_number === formData.student)?.id,
		};

		createExam(data, {
			onSuccess: () => {
				refetch();
				notify({ message: 'Exam added successfully!', status: 'success', toastOptions: { toastId: 'exam_creation_success' } });
			},
			onError: (error) =>
				notify({
					message: handleApiError(error) || 'Unable to create exam!',
					status: 'error',
					toastOptions: { toastId: 'exam_creation_failure' },
				}),
			onSettled: () => {
				setModal((prev) => ({ ...prev, isCreating: false }));
				resetFormData();
			},
		});
	};
	const handleExamEditing = (event) => {
		event.preventDefault();

		const data = {
			course: formData.course,
			score: parseInt(formData.score),
			student: students?.find((student) => student.matric_number === formData.student)?.id,
		};

		updateExam(
			{ id: formData.id, data },
			{
				onSuccess: () => {
					refetch();
					notify({ message: 'Exam updated successfully!', status: 'success', toastOptions: { toastId: 'exam_updating_success' } });
				},
				onError: (error) =>
					notify({
						message: handleApiError(error) || 'Unable to update exam!',
						status: 'error',
						toastOptions: { toastId: 'exam_updating_failure' },
					}),
				onSettled: () => {
					setModal((prev) => ({ ...prev, isEditing: false }));
					resetFormData();
				},
			}
		);
	};
	const resetFormData = () =>
		setFormData({
			id: '',
			course: '',
			score: '',
			student: '',
		});

	return (
		<Container>
			<PageHeader title="Exam Management" />

			<TableContainer
				columns={columns({
					totalStudents: students?.length || 0,
					handleDelete,
					handleEdit,
					handleView,
				})}
				title={`All Exams: ${exams?.length || 0}`}
				dataSource={exams}
				options={{
					button: 'Create exam',
					handleButtonClick: () => setModal((prev) => ({ ...prev, isCreating: true })),
				}}
				isLoading={isLoading}
			/>

			<div className="create--mobile">
				<Create onClick={() => setModal((prev) => ({ ...prev, isCreating: true }))} />
			</div>

			{modal.isCreating ? (
				<CreateModal
					closeModal={handleCreateModalClose}
					handleSubmit={handleExamCreation}
					formData={formData}
					handleChange={handleChange}
					isLoading={isCreating}
					students={students}
					courses={courses}
				/>
			) : null}

			{modal.isEditing ? (
				<EditModal
					closeModal={handleEditModalClose}
					handleSubmit={handleExamEditing}
					formData={formData}
					handleChange={handleChange}
					isLoading={isUpdating}
					students={students}
					courses={courses}
				/>
			) : null}
			{modal.isViewing ? (
				<DetailsModal
					record={formData}
					data={detailsData}
					closeModal={handleDetailsModalClose}
					handleEdit={(record) => {
						handleDetailsModalClose();
						handleEdit(record);
					}}
					handleDelete={(record) => {
						handleDetailsModalClose();
						handleDelete(record);
					}}
				/>
			) : null}
		</Container>
	);
};

export default Exam;
