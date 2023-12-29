export const Appurls = {
	dashboard: {
		get_stats: '/dashboard-stats/',
	},
	auth: {
		get_csrf_token: '/get-csrf-token/',
		login: '/login/',
		logout: '/logout/',
		is_logged_in: '/is-logged-in/',
		change_password: '/change-password/',
	},
	attendance: {
		get_all: '/attendance-list/',
		create: '/attendance-create/',
		update: (id) => `/attendance-update/${id}/`,
		delete: (id) => `/attendance-delete/${id}/`,
	},
	assessment: {
		get_all: '/assessment-list/',
		create: '/assessment-create/',
		update: (id) => `/assessment-update/${id}/`,
		delete: (id) => `/assessment-delete/${id}/`,
	},
	exam: {
		get_all: '/exam-list/',
		create: '/exam-create/',
		update: (id) => `/exam-update/${id}/`,
		delete: (id) => `/exam-delete/${id}/`,
	},
	predict: (id) => `/predict/${id}/`,
	course: {
		get_all: '/course-list/',
		create: '/course-create/',
		update: (id) => `/course-update/${id}/`,
		delete: (id) => `/course-delete/${id}/`,
	},
	student: {
		get_all: '/student-list/',
		create: '/student-create/',
		update: (id) => `/student-update/${id}/`,
		delete: (id) => `/student-delete/${id}/`,
	},
	update_profile: '/update-profile/',
};
