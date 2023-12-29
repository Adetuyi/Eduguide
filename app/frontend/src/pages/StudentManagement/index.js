import { useState } from 'react';
import { Create } from '../../assets/svgs';
import { DetailsModal, PageHeader, PredictionModal } from '../../components';
import TableContainer from '../../ui/TableContainer';
import { Container } from './styles';
import { columns } from './tableColumns';
import { useCreateStudent, useDeleteStudent, useGetStudents, useNotify, useUpdateStudent } from '../../hooks';
import CreateModal from './CreateModal';
import EditModal from './EditModal';
import { getDateTime, handleApiError } from '../../utilities';

const StudentManagement = () => {
	const notify = useNotify();

	const [formData, setFormData] = useState({
		id: '',
		first_name: '',
		last_name: '',
		date_of_birth: '',
		matric_number: '',
		gender: '',
	});
	const [modal, setModal] = useState({ isCreating: false, isEditing: false, isViewing: false, isPredicting: false });

	const detailsData = [
		{ name: 'First Name', value: formData.first_name },
		{ name: 'Last Name', value: formData.last_name },
		{ name: 'Gender', value: formData.gender },
		{ name: 'Date Of Birth', value: getDateTime(formData.date_of_birth, 'mm dd yyyy') },
		{ name: 'Matric Number', value: formData.matric_number },
	];

	const { data: students, isLoading, refetch } = useGetStudents();
	const { mutate: createStudent, isLoading: isCreating } = useCreateStudent();
	const { mutate: updateStudent, isLoading: isUpdating } = useUpdateStudent();
	const { mutate: deleteStudent } = useDeleteStudent();

	const handleChange = (event, name, value) => {
		name = event?.target?.name || name || '';
		value = event?.target?.value || value || '';

		setFormData((prev) => ({ ...prev, [name]: value }));
	};
	const handleDelete = (record) => {
		deleteStudent(record?.id, {
			onSuccess: () => {
				refetch();
				notify({ message: 'Student deleted successfully!', status: 'success', toastOptions: { toastId: 'student_deletion_success' } });
			},
			onError: (error) =>
				notify({
					message: handleApiError(error) || 'Unable to delete student!',
					status: 'error',
					toastOptions: { toastId: 'student_deletion_failure' },
				}),
		});
	};
	const handleEdit = (record) => {
		setFormData(record);
		setModal((prev) => ({ ...prev, isEditing: true }));
	};
	const handleView = (record) => {
		setFormData(record);
		setModal((prev) => ({ ...prev, isViewing: true }));
	};
	const handlePredict = (record) => {
		setFormData(record);
		setModal((prev) => ({ ...prev, isPredicting: true }));
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
	const handlePredictionModalClose = () => {
		setModal((prev) => ({ ...prev, isPredicting: false }));
		resetFormData();
	};

	const handleStudentCreation = (event) => {
		event.preventDefault();

		createStudent(formData, {
			onSuccess: () => {
				refetch();
				setModal((prev) => ({ ...prev, isCreating: false }));
				notify({ message: 'Student added successfully!', status: 'success', toastOptions: { toastId: 'student_creation_success' } });
			},
			onError: (error) =>
				notify({
					message: handleApiError(error) || 'Unable to create student!',
					status: 'error',
					toastOptions: { toastId: 'student_creation_failure' },
				}),
			onSettled: () => resetFormData(),
		});
	};
	const handleStudentEditing = (event) => {
		event.preventDefault();

		const { id, ...data } = formData;

		updateStudent(
			{ id, data },
			{
				onSuccess: () => {
					refetch();
					setModal((prev) => ({ ...prev, isEditing: false }));
					notify({ message: 'Student updated successfully!', status: 'success', toastOptions: { toastId: 'student_updating_success' } });
				},
				onError: (error) =>
					notify({
						message: handleApiError(error) || 'Unable to update student!',
						status: 'error',
						toastOptions: { toastId: 'student_updating_failure' },
					}),
				onSettled: () => resetFormData(),
			}
		);
	};
	const resetFormData = () =>
		setFormData({
			id: '',
			first_name: '',
			last_name: '',
			date_of_birth: '',
			matric_number: '',
			gender: '',
		});

	return (
		<Container>
			<PageHeader title="Student Management" />

			<TableContainer
				columns={columns({
					handleView,
					handleDelete,
					handleEdit,
					handlePredict,
				})}
				title={`All Students: ${students?.length || 0}`}
				dataSource={students}
				options={{
					button: 'Create student',
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
					handleSubmit={handleStudentCreation}
					formData={formData}
					handleChange={handleChange}
					isLoading={isCreating}
				/>
			) : null}

			{modal.isEditing ? (
				<EditModal
					closeModal={handleEditModalClose}
					handleSubmit={handleStudentEditing}
					formData={formData}
					handleChange={handleChange}
					isLoading={isUpdating}
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

			{modal.isPredicting ? <PredictionModal student={formData} closeModal={handlePredictionModalClose} /> : null}
		</Container>
	);
};

export default StudentManagement;
