from django.urls import path
from . import views
from .partial_views import course, student, attendance, assessment, exam


urlpatterns = [
    # Auth start
    path('get-csrf-token/', views.getCSRFToken),
    path('login/', views.loginHandler),
    path('is-logged-in/', views.loggedInState),
    path('logout/', views.logoutHandler),
    path('change-password/', views.changePassword),
    # Auth end

    path('update-profile/', views.updateProfile),

    # Course start
    path('course-list/', course.courseList),
    path('course-create/', course.courseCreate),
    path('course-update/<str:pk>/', course.courseUpdate),
    path('course-delete/<str:pk>/', course.courseDelete),
    # Course end

    # Student start
    path('student-list/', student.studentList),
    path('student-create/', student.studentCreate),
    path('student-update/<str:pk>/', student.studentUpdate),
    path('student-delete/<str:pk>/', student.studentDelete),
    # Student end

    # Attendance start
    path('attendance-list/', attendance.attendanceList),
    path('attendance-create/', attendance.attendanceCreate),
    path('attendance-update/<str:pk>/', attendance.attendanceUpdate),
    path('attendance-delete/<str:pk>/', attendance.attendanceDelete),
    # Assessment end

    # Assessment start
    path('assessment-list/', assessment.assessmentList),
    path('assessment-create/', assessment.assessmentCreate),
    path('assessment-update/<str:pk>/', assessment.assessmentUpdate),
    path('assessment-delete/<str:pk>/', assessment.assessmentDelete),
    # Assessment end

    # Exam start
    path('exam-list/', exam.examList),
    path('exam-create/', exam.examCreate),
    path('exam-update/<str:pk>/', exam.examUpdate),
    path('exam-delete/<str:pk>/', exam.examDelete),
    # Exam end

    # Predict student performance start
    path('predict/<str:pk>/', views.predict),
    # Predict student performance end

    # Dashboard Stats start
    path('dashboard-stats/', views.getDashboardStats),
    # Dashboard Stats end
]
