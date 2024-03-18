from django.shortcuts import render
from rest_framework import generics
from .models import CustomUser, Skill
from .serializers import CustomUserSerializer, SkillSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status


# @csrf_exempt
# @permission_classes([AllowAny])
class CustomUserListCreate(generics.ListCreateAPIView):
    print("CustomUserListCreate")
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]

class CustomUserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

class SkillListCreate(generics.ListCreateAPIView):

    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            errors = serializer.errors
            return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_skill(request):
    if request.method == 'POST':
        serializer = SkillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            errors = serializer.errors
            print(errors)
            return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

class SkillDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

@api_view(['POST'])
@csrf_exempt
@permission_classes([AllowAny])
def register_user(request):
    if request.method == 'POST':
        print(request.data)
        serializer = CustomUserSerializer(data=request.data)
        
        if serializer.is_valid():
            print(serializer.validated_data)
            user = serializer.save()
            return Response(serializer.data, status=201)
        else:
            # Добавляем детальную информацию об ошибках валидации
            errors = serializer.errors
            print(errors)
            return Response(errors, status=400)

