
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Course
from ..serializers import CourseSerializer

# Course operations API start


@api_view(['GET'])
def courseList(request):
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def courseCreate(request):
    serializer = CourseSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response(serializer.data)
    else:
        return Response({"detail": "A course with that code already exists"},
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
def courseUpdate(request, pk):
    course = Course.objects.get(id=pk)
    serializer = CourseSerializer(instance=course, data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response(serializer.data)


@api_view(['DELETE'])
def courseDelete(request, pk):
    course = Course.objects.get(id=pk)
    course.delete()

    return Response({"detail": "Item deleted successfully!"})
# Course operations API end
