from django.contrib import admin
from .models import Course, Student, Attendance, Assessment, Exam

# Register your models here.
admin.site.register(Course)
admin.site.register(Student)
admin.site.register(Attendance)
admin.site.register(Assessment)
admin.site.register(Exam)
