from django.db import models

# Create your models here.


class Course(models.Model):
    title = models.CharField(max_length=200)
    code = models.CharField(max_length=10, unique=True)
    unit = models.CharField(max_length=10)
    status = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.code


class Student(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    date_of_birth = models.DateField(null=True)
    matric_number = models.CharField(max_length=11, unique=True)
    gender = models.CharField(max_length=11, default='Male')
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.matric_number


class Attendance(models.Model):
    class_number = models.IntegerField()
    course = models.ForeignKey(Course, null=True, on_delete=models.CASCADE)
    students = models.ManyToManyField(Student)
    created_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['class_number', 'course']

    def __str__(self):
        return str(self.course) + ' - Class' + str(self.class_number)


class Assessment(models.Model):
    course = models.ForeignKey(Course, null=True, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, null=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=True)
    score = models.IntegerField(default=0)

    class Meta:
        unique_together = ['student', 'course']

    def __str__(self):
        return str(self.course) + ' - ' + str(self.student)


class Exam(models.Model):
    course = models.ForeignKey(Course, null=True, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, null=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=True)
    score = models.IntegerField(default=0)

    class Meta:
        unique_together = ['student', 'course']

    def __str__(self):
        return str(self.course) + ' - ' + str(self.student)
