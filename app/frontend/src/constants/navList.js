import { Approutes } from './routes';
import { Dashboard, DashboardActive, Setting, SettingActive, Students, Events, EventsActive } from '../assets/svgs';

export const navList = [
	{
		name: 'Dashboard',
		link: Approutes.dashboard.index,
		isEnd: false,
		svg: {
			default: <Dashboard />,
			active: <DashboardActive />,
		},
	},
	{
		name: 'Courses',
		link: Approutes.course.overview,
		svg: {
			default: <Events />,
			active: <EventsActive />,
		},
	},
	{
		name: 'Student Management',
		svg: {
			default: <Students />,
		},
		menu: [
			{ name: 'Overview', link: Approutes.student.overview },
			{
				name: 'Attendance',
				link: Approutes.student.attendance,
			},
			{
				name: 'Assessments',
				link: Approutes.student.assessment,
			},
			{
				name: 'Exams',
				link: Approutes.student.exam,
			},
		],
	},
	// {
	// 	name: 'Trainers',
	// 	svg: {
	// 		default: <Trainers />,
	// 	},
	// 	menu: [
	// 		{ name: 'Instructor', link: Approutes.student.initial },
	// 		{ name: 'Mentor', link: Approutes.student.initial },
	// 	],
	// },
	{
		name: 'Settings',
		link: Approutes.settings.initial,
		svg: {
			default: <Setting />,
			active: <SettingActive />,
		},
	},
];
