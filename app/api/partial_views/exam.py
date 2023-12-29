
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Exam
from ..serializers import ExamSerializer, ExamResponseSerializer

# Exam operations API start


@api_view(['GET'])
def examList(request):
    exams = Exam.objects.all()
    serializer = ExamResponseSerializer(exams, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def examCreate(request):
    serializer = ExamSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response(serializer.data)
    else:
        return Response({"detail": "A exam with that code already exists"},
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
def examUpdate(request, pk):
    exam = Exam.objects.get(id=pk)
    serializer = ExamSerializer(instance=exam, data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def examDelete(request, pk):
    exam = Exam.objects.get(id=pk)
    exam.delete()

    return Response({"detail": "Item deleted successfully!"})
# Exam operations API end
