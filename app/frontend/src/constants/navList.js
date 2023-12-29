import { Approutes } from './routes';
import { Dashboard, DashboardActive, Setting, SettingActive, Students, Trainers, Events } from '../assets/svgs';

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
		name: 'Course Management',
		svg: {
			default: <Events />,
		},
		menu: [
			{
				name: 'Overview',
				link: Approutes.course.overview,
			},
			{
				name: 'Attendance',
				link: Approutes.course.attendance,
			},
			{
				name: 'Assessments',
				link: Approutes.course.assessment,
			},
			{
				name: 'Exams',
				link: Approutes.course.exam,
			},
		],
	},
	// {
	// 	name: 'Events',
	// 	link: Approutes.events,
	// 	svg: {
	// 		default: <Events />,
	// 		active: <EventsActive />,
	// 	},
	// },
	{
		name: 'Students',
		svg: {
			default: <Students />,
		},
		menu: [{ name: 'Overview', link: Approutes.student.overview }],
	},
	{
		name: 'Trainers',
		svg: {
			default: <Trainers />,
		},
		menu: [
			{ name: 'Instructor', link: Approutes.student.initial },
			{ name: 'Mentor', link: Approutes.student.initial },
		],
	},
	{
		name: 'Settings',
		link: Approutes.settings.initial,
		svg: {
			default: <Setting />,
			active: <SettingActive />,
		},
	},
];
