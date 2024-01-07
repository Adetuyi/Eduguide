from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
# from rest_framework_simplejwt.authentication import
from .serializers import UserSerializer, LoginSerializer, ChangePasswordSerializer, UpdateProfileSerializer, StudentSerializer
from .models import Attendance, Student, Assessment, Course, Exam
from .helpers import is_lecturer, is_student
import joblib
import os


@ensure_csrf_cookie
@api_view(['GET'])
def getCSRFToken(request):
    permission_classes = [AllowAny]

    return Response({"details": "CSRF Cookie set"}, status=status.HTTP_200_OK)


@api_view(['POST'])
def loginHandler(request):
    serializer = LoginSerializer(data=request.data)

    if (serializer.is_valid()):
        username = serializer.data.get('username')
        password = serializer.data.get('password')

        try:
            user = User.objects.get(username=username)
            userSerializer = UserSerializer(user, many=False)
        except:
            return Response({'details': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        responseData = {
            "id": userSerializer.data.get("id"),
            "username": userSerializer.data.get("username"),
            "first_name": userSerializer.data.get("first_name"),
            "last_name": userSerializer.data.get("last_name"),
            "email": userSerializer.data.get("email"),
            "roles": list(user.groups.values_list('name', flat=True))
        }

        if request.user.is_authenticated:
            return Response(responseData, status=status.HTTP_200_OK)
        else:
            authUser = authenticate(
                request, username=username, password=password)

            if authUser is not None:
                login(request, authUser)

                return Response(responseData, status=status.HTTP_200_OK)
            else:
                return Response({'details': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logoutHandler(request):
    logout(request)

    return Response({'detail': 'Logout successful'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def loggedInState(request):
    return Response({'status': request.user.is_authenticated}, status=status.HTTP_200_OK)


@api_view(['POST'])
def changePassword(request):
    serializer = ChangePasswordSerializer(data=request.data)

    if (serializer.is_valid()):
        username = serializer.data.get('username')
        password = serializer.data.get('password')
        user = User.objects.get(username=username)
        user.set_password(password)
        user.save()

        authUser = authenticate(
            request, username=serializer.data.get('username'), password=serializer.data.get('password'))

        if authUser is not None:
            login(request, authUser)

            return Response({"details": "Password changed successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({'details': 'Something went wrong'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def updateProfile(request):
    serializer = UpdateProfileSerializer(data=request.data)

    if (serializer.is_valid()):
        username = serializer.data.get('username')
        first_name = serializer.data.get('first_name')
        last_name = serializer.data.get('last_name')
        email = serializer.data.get('email')

        user = User.objects.get(username=username)
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.save()

        serializer = UserSerializer(user, many=False)

        responseData = {
            "id": serializer.data.get("id"),
            "username": username,
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "roles": list(user.groups.values_list('name', flat=True))
        }

        return Response(responseData, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def predict(request, pk):
    # Get the absolute path of the current script
    script_dir = os.path.dirname(__file__)
    model_path = os.path.join(script_dir, 'model/prediction-model.joblib')

    # Load the model using the absolute file path
    model = joblib.load(model_path)
    student = Student.objects.get(pk=pk)

    median_assessment_score = 11

    # Retrieve all attendance records for the student
    all_attendance = Attendance.objects.all()
    student_attendance = Attendance.objects.filter(students=student)

    if (all_attendance.count() == 0 or student_attendance.count() == 0):
        attendance_rate = 0
    else:
        attendance_rate = student_attendance.count() / all_attendance.count() * 100

    # Retrieve all assessment records for the student
    student_assessments = Assessment.objects.filter(student=student)

    assessment_score = 0
    average_assessment_score = 0

    for assessment in student_assessments:
        assessment_score = assessment_score + assessment.score

    # Predict
    if (assessment_score == 0):
        prediction = model.predict(
            [[attendance_rate, median_assessment_score]])
    else:
        average_assessment_score = assessment_score / student_assessments.count()
        prediction = model.predict(
            [[attendance_rate, average_assessment_score]])

    responseData = {'attendance_rate': attendance_rate,
                    'average_assessment_score': average_assessment_score,
                    'predicted_exam_score': prediction[0]
                    }

    return Response(responseData, status=status.HTTP_200_OK)


@api_view(['GET'])
def getDashboardStats(request):
    # Get all courses, attendance and students
    all_courses = Course.objects.all()
    all_attendance = Attendance.objects.all()
    all_students = Student.objects.all()

    classes_held = {}
    course_attendance_rate = {}

    # Map through each course and extract total classes held and attendance rate per course
    for course in all_courses:
        total_student_in_attendance = 0
        all_attendance_for_course = Attendance.objects.filter(course=course)
        classes_held[course.code] = all_attendance_for_course.count()

        for attendance in all_attendance_for_course:
            if (attendance.students.count() != 0):
                total_student_in_attendance = total_student_in_attendance + \
                    attendance.students.count()

        if (all_attendance_for_course.count() == 0):
            course_attendance_rate[course.code] = 0
        else:
            course_attendance_rate[course.code] = total_student_in_attendance / \
                all_attendance_for_course.count()

    # Get students by gender
    total_male = Student.objects.filter(gender='Male')
    total_female = Student.objects.filter(gender='Female')

    # Get last 5 recent student
    recent_student_serializer = StudentSerializer(
        all_students.order_by('-id')[:5], many=True)

    attendance_group = {
        'Q1': [],
        'Q2': [],
        'Q3': [],
        'Q4': []
    }

    # Group students into quartiles by attendance rate
    for student in all_students:
        all_attendance_for_student = Attendance.objects.filter(
            students=student)

        if (all_attendance.count() != 0):
            student_attendance_rate = round(
                all_attendance_for_student.count() / all_attendance.count() * 100)
        else:
            student_attendance_rate = 0

        if (0 <= student_attendance_rate <= 25):
            attendance_group['Q1'].append(student.matric_number)
        elif (26 <= student_attendance_rate <= 50):
            attendance_group['Q2'].append(student.matric_number)
        elif (50 <= student_attendance_rate <= 75):
            attendance_group['Q3'].append(student.matric_number)
        elif (75 <= student_attendance_rate <= 100):
            attendance_group['Q4'].append(student.matric_number)

    assessment_group = {
        'Q1': [],
        'Q2': [],
        'Q3': [],
        'Q4': []
    }

    # Group students into quartiles by assessment scores
    for student in all_students:
        total_assessment_score = 0
        all_assessment_for_student = Assessment.objects.filter(
            student=student)

        for assessment in all_assessment_for_student:
            total_assessment_score = total_assessment_score + assessment.score

        if (all_assessment_for_student.count() == 0):
            student_assessment_rate = 0
        else:
            student_assessment_rate = total_assessment_score / \
                all_assessment_for_student.count() / 30 * 100

        if (0 <= student_assessment_rate <= 25):
            assessment_group['Q1'].append(student.matric_number)
        elif (26 <= student_assessment_rate <= 50):
            assessment_group['Q2'].append(student.matric_number)
        elif (50 <= student_assessment_rate <= 75):
            assessment_group['Q3'].append(student.matric_number)
        elif (75 <= student_assessment_rate <= 100):
            assessment_group['Q4'].append(student.matric_number)

    exam_group = {
        'Q1': [],
        'Q2': [],
        'Q3': [],
        'Q4': []
    }

    # Group students into quartiles by assessment scores
    for student in all_students:
        total_exam_score = 0
        all_exams_for_student = Exam.objects.filter(
            student=student)

        for exam in all_exams_for_student:
            total_exam_score = total_exam_score + exam.score

        if (all_exams_for_student.count() == 0):
            student_exam_rate = 0
        else:
            student_exam_rate = total_exam_score / \
                all_exams_for_student.count() / 70 * 100

        if (0 <= student_exam_rate <= 25):
            exam_group['Q1'].append(student.matric_number)
        elif (26 <= student_exam_rate <= 50):
            exam_group['Q2'].append(student.matric_number)
        elif (50 <= student_exam_rate <= 75):
            exam_group['Q3'].append(student.matric_number)
        elif (75 <= student_exam_rate <= 100):
            exam_group['Q4'].append(student.matric_number)

    responseData = {
        'total_classes_held': all_attendance.count(),
        'classes_held': classes_held,
        'student_attendance_rate': course_attendance_rate,
        'total_students': all_students.count(),
        'recent_students': recent_student_serializer.data,
        'total_male': total_male.count(),
        'total_female': total_female.count(),
        'attendance_group': attendance_group,
        'assessment_group': assessment_group,
        'exam_group': exam_group,
        'total_courses': all_courses.count()
    }

    return Response(responseData, status=status.HTTP_200_OK)
#


#

# @api_view(['GET'])
# def studentList(request):
#     # tasks = Student.objects.order_by('-id').all()
#     # tasks = Task.objects.order_by('-id')[:5] # when we want 5 only
#     # serializer = TaskSerializer(tasks, many=True)

#     responseDict = [{
#         'test': ''
#     }]

#     return Response(responseDict)


@api_view(['GET'])
def createUser(request):
    user = User.objects.create_user(
        "john", "lennon@thebeatles.com", "johnpassword")
    user.first_name = "firstname"
    user.last_name = "lastname"
    user.is_staff = False
    user.groups.set(["STUDENT"])
    user.groups.set(["LECTURER"])
    user.save()
