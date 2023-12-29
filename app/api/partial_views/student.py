from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Student
from ..serializers import StudentSerializer

# Student operations API start


@api_view(['GET'])
def studentList(request):
    students = Student.objects.all()
    serializer = StudentSerializer(students, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def studentCreate(request):
    serializer = StudentSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response({"detail": "A student with that matric number already exists"},
                        status=status.HTTP_400_BAD_REQUEST)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
def studentUpdate(request, pk):
    student = Student.objects.get(id=pk)
    serializer = StudentSerializer(instance=student, data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response(serializer.data)
    else:
        return Response({"detail": "A student with that matric number already exists"},
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def studentDelete(request, pk):
    student = Student.objects.get(id=pk)
    student.delete()

    return Response({"detail": "Item deleted successfully!"})
# student operations API end
