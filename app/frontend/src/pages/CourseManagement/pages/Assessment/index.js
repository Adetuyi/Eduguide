import { useState } from 'react';
import { Create } from '../../../../assets/svgs';
import { PageHeader, DetailsModal } from '../../../../components';
import TableContainer from '../../../../ui/TableContainer';
import { Container } from './styles';
import { columns } from './tableColumns';
import {
	useCreateAssessment,
	useDeleteAssessment,
	useGetAssessment,
	useGetCourses,
	useGetStudents,
	useNotify,
	useUpdateAssessment,
} from '../../../../hooks';
import CreateModal from './CreateModal';
import EditModal from './EditModal';
import { handleApiError } from '../../../../utilities';

const Assessment = () => {
	const notify = useNotify();

	const [formData, setFormData] = useState({
		id: '',
		course: '',
		score: '',
		student: '',
	});
	const [modal, setModal] = useState({ isCreating: false, isEditing: false, isViewing: false });

	const { data: assessment, isLoading, refetch } = useGetAssessment();
	const { data: students } = useGetStudents();
	const { data: courses } = useGetCourses();
	const { mutate: createAssessment, isLoading: isCreating } = useCreateAssessment();
	const { mutate: updateAssessment, isLoading: isUpdating } = useUpdateAssessment();
	const { mutate: deleteAssessment } = useDeleteAssessment();

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
		deleteAssessment(record?.id, {
			onSuccess: () => {
				refetch();
				notify({ message: 'Assessment deleted successfully!', status: 'success', toastOptions: { toastId: 'assessment_deletion_success' } });
			},
			onError: (error) =>
				notify({
					message: handleApiError(error) || 'Unable to delete assessment!',
					status: 'error',
					toastOptions: { toastId: 'assessment_deletion_failure' },
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

	const handleAssessmentCreation = (event) => {
		event.preventDefault();

		const data = {
			course: formData.course,
			score: parseInt(formData.score),
			student: students?.find((student) => student.matric_number === formData.student)?.id,
		};

		createAssessment(data, {
			onSuccess: () => {
				refetch();
				notify({ message: 'Assessment added successfully!', status: 'success', toastOptions: { toastId: 'assessment_creation_success' } });
			},
			onError: (error) =>
				notify({
					message: handleApiError(error) || 'Unable to create assessment!',
					status: 'error',
					toastOptions: { toastId: 'assessment_creation_failure' },
				}),
			onSettled: () => {
				setModal((prev) => ({ ...prev, isCreating: false }));
				resetFormData();
			},
		});
	};
	const handleAssessmentEditing = (event) => {
		event.preventDefault();

		const data = {
			course: formData.course,
			score: parseInt(formData.score),
			student: students?.find((student) => student.matric_number === formData.student)?.id,
		};

		updateAssessment(
			{ id: formData.id, data },
			{
				onSuccess: () => {
					refetch();
					notify({ message: 'Assessment updated successfully!', status: 'success', toastOptions: { toastId: 'assessment_updating_success' } });
				},
				onError: (error) =>
					notify({
						message: handleApiError(error) || 'Unable to update assessment!',
						status: 'error',
						toastOptions: { toastId: 'assessment_updating_failure' },
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
			<PageHeader title="Assessment Management" />

			<TableContainer
				columns={columns({
					totalStudents: students?.length || 0,
					handleDelete,
					handleEdit,
					handleView,
				})}
				title={`All Assessments: ${assessment?.length || 0}`}
				dataSource={assessment}
				options={{
					button: 'Create assessment',
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
					handleSubmit={handleAssessmentCreation}
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
					handleSubmit={handleAssessmentEditing}
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

export default Assessment;
