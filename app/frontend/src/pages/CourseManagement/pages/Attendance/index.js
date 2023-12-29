import { useState } from 'react';
import { Create } from '../../../../assets/svgs';
import { PageHeader, DetailsModal } from '../../../../components';
import TableContainer from '../../../../ui/TableContainer';
import { Container } from './styles';
import { columns } from './tableColumns';
import {
	useCreateAttendance,
	useDeleteAttendance,
	useGetAttendance,
	useGetCourses,
	useGetStudents,
	useNotify,
	useUpdateAttendance,
} from '../../../../hooks';
import CreateModal from './CreateModal';
import EditModal from './EditModal';
import { handleApiError } from '../../../../utilities';

const Attendance = () => {
	const notify = useNotify();

	const [formData, setFormData] = useState({
		id: '',
		course: '',
		class_number: '',
		students: [],
	});
	const [modal, setModal] = useState({ isCreating: false, isEditing: false, isViewing: false });

	const { data: attendance, isLoading, refetch } = useGetAttendance();
	const { data: students } = useGetStudents();
	const { data: courses } = useGetCourses();
	const { mutate: createAttendance, isLoading: isCreating } = useCreateAttendance();
	const { mutate: updateAttendance, isLoading: isUpdating } = useUpdateAttendance();
	const { mutate: deleteAttendance } = useDeleteAttendance();

	const detailsData = [
		{ name: 'Course Code', value: formData.course.code },
		{ name: 'Title', value: formData.course.title },
		{ name: 'Class Number', value: formData.class_number },
		{ name: 'Attendance Rate', value: `${formData.students.length}/${students?.length || 0}` },
		{ name: 'Students Present', value: formData.students.map((student) => student.matric_number).join(', ') },
	];

	const handleChange = (event, name, value) => {
		name = event?.target?.name || name || '';
		value = event?.target?.value || value || '';

		setFormData((prev) => ({ ...prev, [name]: value }));
	};
	const handleDelete = (record) => {
		deleteAttendance(record?.id, {
			onSuccess: () => {
				refetch();
				notify({ message: 'Attendance deleted successfully!', status: 'success', toastOptions: { toastId: 'attendance_deletion_success' } });
			},
			onError: (error) =>
				notify({
					message: handleApiError(error) || 'Unable to delete attendance!',
					status: 'error',
					toastOptions: { toastId: 'attendance_deletion_failure' },
				}),
		});
	};
	const handleEdit = (record) => {
		setFormData({
			id: record.id,
			course: record.course.id,
			class_number: record.class_number,
			students: record.students.map((student) => student.matric_number),
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

	const handleAttendanceCreation = (event) => {
		event.preventDefault();

		const data = {
			course: formData.course,
			class_number: parseInt(formData.class_number),
			students: formData.students.map((matricNumber) => students?.find((student) => student.matric_number === matricNumber)?.id),
		};

		createAttendance(data, {
			onSuccess: () => {
				refetch();
				notify({ message: 'Attendance added successfully!', status: 'success', toastOptions: { toastId: 'attendance_creation_success' } });
			},
			onError: (error) =>
				notify({
					message: handleApiError(error) || 'Unable to create attendance!',
					status: 'error',
					toastOptions: { toastId: 'attendance_creation_failure' },
				}),
			onSettled: () => {
				setModal((prev) => ({ ...prev, isCreating: false }));
				resetFormData();
			},
		});
	};
	const handleAttendanceEditing = (event) => {
		event.preventDefault();

		const data = {
			course: formData.course,
			class_number: parseInt(formData.class_number),
			students: formData.students.map((matricNumber) => students?.find((student) => student.matric_number === matricNumber)?.id),
		};

		updateAttendance(
			{ id: formData.id, data },
			{
				onSuccess: () => {
					refetch();
					notify({ message: 'Attendance updated successfully!', status: 'success', toastOptions: { toastId: 'attendance_updating_success' } });
				},
				onError: (error) =>
					notify({
						message: handleApiError(error) || 'Unable to update attendance!',
						status: 'error',
						toastOptions: { toastId: 'attendance_updating_failure' },
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
			class_number: '',
			students: [],
		});

	return (
		<Container>
			<PageHeader title="Attendance Management" />

			<TableContainer
				columns={columns({
					totalStudents: students?.length || 0,
					handleDelete,
					handleEdit,
					handleView,
				})}
				title={`All Attendances: ${attendance?.length || 0}`}
				dataSource={attendance}
				options={{
					button: 'Create attendance',
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
					handleSubmit={handleAttendanceCreation}
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
					handleSubmit={handleAttendanceEditing}
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

export default Attendance;
