from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Assessment
from ..serializers import AssessmentSerializer, AssessmentResponseSerializer


@api_view(['GET'])
def assessmentList(request):
    assessments = Assessment.objects.all()
    serializer = AssessmentResponseSerializer(assessments, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def assessmentCreate(request):
    serializer = AssessmentSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({"detail": "A assessment with that matric number already exists"},
                        status=status.HTTP_400_BAD_REQUEST)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
def assessmentUpdate(request, pk):
    assessment = Assessment.objects.get(id=pk)
    serializer = AssessmentSerializer(instance=assessment, data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"detail": "A assessment with that matric number already exists"},
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def assessmentDelete(request, pk):
    assessment = Assessment.objects.get(id=pk)
    assessment.delete()

    return Response({"detail": "Item deleted successfully!"})
