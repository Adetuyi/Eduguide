import { PageHeader } from '../../../components';
import { getDateTime } from '../../../utilities';
import { Container, FlexBox } from './styles';
import { Boy, Classroom, Money } from '../../../assets/images';
import { Pallet, PalletList, ProgressBar, TableContainer, CustomPieChart, BarChart } from '../../../ui';
import { Approutes } from '../../../constants';
import { useAuth, useGetDashboardStats } from '../../../hooks';
import { columns } from './tableColumns';
import { useState } from 'react';

const LecturerDashboard = () => {
	const { user } = useAuth();
	const [barData, setBarData] = useState('Attendance');

	const { data: dashboardStats, isLoading } = useGetDashboardStats();

	const groupedStudents =
		barData === 'Attendance'
			? dashboardStats?.attendance_group
			: barData === 'Assessment'
			? dashboardStats?.assessment_group
			: barData === 'Exam'
			? dashboardStats?.exam_group
			: {
					Q1: [],
					Q2: [],
					Q3: [],
					Q4: [],
			  };

	const palletItems = [
		{ title: 'Total students onboard ', body: dashboardStats?.total_students || 0, color: 'primary800', image: Boy },
		{ title: 'Total classes held', body: dashboardStats?.total_classes_held || 0, color: 'primary700', image: Classroom },
		{ title: 'Total courses offered', body: dashboardStats?.total_courses || 0, color: 'secondary500', image: Money },
	];

	return (
		<Container>
			<PageHeader>
				<div className="page--header">
					<h4>Welcome back, {user?.first_name} 🌞</h4>
					<p>
						This is your stats today - <span>{getDateTime(new Date(), 'mm dd yyyy')}</span>
					</p>
				</div>
			</PageHeader>

			<PalletList>
				{palletItems.map(({ title, body, color, image }) => (
					<Pallet key={title} title={title} body={body} color={color} image={image} />
				))}
			</PalletList>

			<section className="statistics--con" style={{ marginBottom: '2rem' }}>
				<header className="statistics--header">
					<div>
						<h6>Group Students By:</h6>
						<div className="category">
							<span onClick={() => setBarData('Attendance')} className={barData === 'Attendance' ? 'active' : ''}>
								Attendance
							</span>
							<span onClick={() => setBarData('Assessment')} className={barData === 'Assessment' ? 'active' : ''}>
								Assessment
							</span>
							<span onClick={() => setBarData('Exam')} className={barData === 'Exam' ? 'active' : ''}>
								Exam
							</span>
						</div>
					</div>
				</header>

				<div>
					<BarChart
						title="Statistical Group"
						subTitle={`${barData} Rate`}
						barData={[
							{
								name: 'Total Students',
								data: [
									{
										x: '0 - 25%',
										y: groupedStudents?.Q1.length,
									},
									{
										x: '26% - 50%',
										y: groupedStudents?.Q2.length,
									},
									{
										x: '51% - 75%',
										y: groupedStudents?.Q3.length,
									},
									{
										x: '76% - 100%',
										y: groupedStudents?.Q4.length,
									},
								],
							},
						]}
					/>
				</div>
				<ul className="grouped-students-label">
					<li>
						<span>Lower Quartile (0 - 25%):</span>
						<p>{groupedStudents?.Q1.length ? groupedStudents?.Q1?.join(', ') : 'N/A'}</p>
					</li>
					<li>
						<span>Second Quartile (26% - 50%):</span>
						<p>{groupedStudents?.Q2.length ? groupedStudents?.Q2?.join(', ') : 'N/A'}</p>
					</li>
					<li>
						<span>Third Quartile (51% - 75%):</span>
						<p>{groupedStudents?.Q3.length ? groupedStudents?.Q3?.join(', ') : 'N/A'}</p>
					</li>
					<li>
						<span>Higher Quartile (76% - 100%):</span>
						<p>{groupedStudents?.Q4.length ? groupedStudents?.Q4?.join(', ') : 'N/A'}</p>
					</li>
				</ul>
			</section>

			<FlexBox>
				<section className="statistics--con">
					<header className="statistics--header">
						<div>
							<h6>Classess Held</h6>
						</div>
					</header>

					<div>
						<BarChart
							title={'Total Classes Held Per Course'}
							barData={[
								{
									name: 'Classes Held',
									data: isLoading
										? [{ x: 'Loading...', y: 0 }]
										: Object.keys(dashboardStats?.classes_held).map((key) => ({ x: key, y: dashboardStats?.classes_held[key] })),
								},
							]}
						/>
					</div>
				</section>

				<section className="student--con">
					<header>
						<h6>Gender Distribution</h6>
					</header>
					<div>
						<CustomPieChart
							data={[
								{ label: 'Male', value: dashboardStats?.total_male },
								{ label: 'Female', value: dashboardStats?.total_female },
							]}
						/>
					</div>
				</section>
			</FlexBox>

			<FlexBox>
				<section className="table--con">
					<TableContainer
						columns={columns}
						options={{ disableSearching: true, all_link: Approutes.student.overview }}
						title="Most Recent Students"
						dataSource={dashboardStats?.recent_students}
						isLoading={isLoading}
					/>
				</section>

				<section className="slots--con">
					<header>
						<h6>Average Attendance Rate</h6>
					</header>
					<div className="slots--items--con">
						{Object.keys(dashboardStats?.student_attendance_rate || {}).map((key) => (
							<div key={key} className="slots--item">
								<p>{key}</p>
								<div className="fraction">
									<div>
										<ProgressBar
											title={`${dashboardStats?.student_attendance_rate[key]} / ${dashboardStats?.total_students}`}
											fraction={dashboardStats?.student_attendance_rate[key] / dashboardStats?.total_students}
										/>
									</div>
									<p>
										{dashboardStats?.student_attendance_rate[key]} / {dashboardStats?.total_students}
									</p>
								</div>
							</div>
						))}
					</div>
				</section>
			</FlexBox>
		</Container>
	);
};
export default LecturerDashboard;
