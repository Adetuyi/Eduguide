import { useState } from 'react';
import { Create } from '../../../../assets/svgs';
import { PageHeader, DetailsModal } from '../../../../components';
import TableContainer from '../../../../ui/TableContainer';
import { Container } from './styles';
import { columns } from './tableColumns';
import { useCreateCourse, useDeleteCourse, useGetCourses, useNotify, useUpdateCourse } from '../../../../hooks';
import CreateModal from './CreateModal';
import EditModal from './EditModal';

const CourseManagement = () => {
	const notify = useNotify();

	const [formData, setFormData] = useState({
		id: '',
		title: '',
		code: '',
		unit: '',
		status: '',
	});
	const [modal, setModal] = useState({ isCreating: false, isEditing: false, isViewing: false });

	const detailsData = [
		{ name: 'Title', value: formData.title },
		{ name: 'Code', value: formData.code },
		{ name: 'Unit', value: formData.unit },
		{ name: 'Status', value: formData.status },
	];

	const { data: courses, isLoading, refetch } = useGetCourses();
	const { mutate: createCourse, isLoading: isCreating } = useCreateCourse();
	const { mutate: updateCourse, isLoading: isUpdating } = useUpdateCourse();
	const { mutate: deleteCourse } = useDeleteCourse();

	const handleChange = (event, name, value) => {
		name = event?.target?.name || name || '';
		value = event?.target?.value || value || '';

		setFormData((prev) => ({ ...prev, [name]: value }));
	};
	const handleDelete = (record) => {
		deleteCourse(record?.id, {
			onSuccess: () => {
				refetch();
				notify({ message: 'Course deleted successfully!', status: 'success', toastOptions: { toastId: 'course_deletion_success' } });
			},
			onError: () => notify({ message: 'Unable to delete course!', status: 'error', toastOptions: { toastId: 'course_deletion_failure' } }),
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

	const handleCourseCreation = (event) => {
		event.preventDefault();

		createCourse(formData, {
			onSuccess: () => {
				refetch();
				notify({ message: 'Course added successfully!', status: 'success', toastOptions: { toastId: 'course_creation_success' } });
			},
			onError: (error) =>
				notify({
					message: error?.response?.data?.detail || 'Unable to create course!',
					status: 'error',
					toastOptions: { toastId: 'course_creation_failure' },
				}),
			onSettled: () => {
				setModal((prev) => ({ ...prev, isCreating: false }));
				resetFormData();
			},
		});
	};
	const handleCourseEditing = (event) => {
		event.preventDefault();

		const { id, ...data } = formData;

		updateCourse(
			{ id, data },
			{
				onSuccess: () => {
					refetch();
					notify({ message: 'Course updated successfully!', status: 'success', toastOptions: { toastId: 'course_updating_success' } });
				},
				onError: (error) =>
					notify({
						message: error?.response?.data?.detail || 'Unable to update course!',
						status: 'error',
						toastOptions: { toastId: 'course_updating_failure' },
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
			title: '',
			code: '',
			unit: '',
			status: '',
		});

	return (
		<Container>
			<PageHeader title="Course Management" />

			<TableContainer
				columns={columns({
					handleDelete,
					handleEdit,
					handleView,
				})}
				title={`All Courses: ${courses?.length || 0}`}
				dataSource={courses}
				options={{
					button: 'Create course',
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
					handleSubmit={handleCourseCreation}
					formData={formData}
					handleChange={handleChange}
					isLoading={isCreating}
				/>
			) : null}

			{modal.isEditing ? (
				<EditModal
					closeModal={handleEditModalClose}
					handleSubmit={handleCourseEditing}
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
		</Container>
	);
};

export default CourseManagement;
