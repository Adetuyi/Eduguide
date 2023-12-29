from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Attendance
from ..serializers import AttendanceSerializer, AttendanceResponseSerializer


@api_view(['GET'])
def attendanceList(request):
    attendance = Attendance.objects.all()
    serializer = AttendanceResponseSerializer(attendance, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def attendanceCreate(request):
    serializer = AttendanceSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # return Response({"detail": "An attendance with this class number and course code already exists"},
        # status=status.HTTP_400_BAD_REQUEST)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
def attendanceUpdate(request, pk):
    attendance = Attendance.objects.get(id=pk)
    serializer = AttendanceSerializer(instance=attendance, data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"detail": "A attendance with that matric number already exists"},
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def attendanceDelete(request, pk):
    attendance = Attendance.objects.get(id=pk)
    attendance.delete()

    return Response({"detail": "Item deleted successfully!"})
