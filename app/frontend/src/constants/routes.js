export const Approutes = {
	auth: {
		login: '/login',
		logout: '/logout',
		reset_password: '/reset-password',
	},
	course: { overview: '/course/overview', attendance: '/course/attendance', assessment: '/course/assessment', exam: '/course/exam' },
	dashboard: {
		index: '/dashboard',
		lecturer: '/dashboard/lecturer',
		student: '/dashboard/student',
	},
	events: '/events',
	settings: { initial: '/settings', profile: '/settings/profile', department: '/settings/department', users: '/settings/users' },
	student: {
		initial: '/student',
		overview: '/student/overview',
	},
	home: '/',
	playground: '/playground',
};
