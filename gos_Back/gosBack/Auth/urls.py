from django.urls import path
from .views import CustomUserListCreate, CustomUserDetail, SkillListCreate, SkillDetail, create_skill, register_user
from rest_framework import generics
from .models import CustomUser, Skill
from .serializers import CustomUserSerializer

urlpatterns = [
    path('users/', CustomUserListCreate.as_view(), name='user-list'),
    # path('users/', generics.ListCreateAPIView.as_view(queryset=CustomUser.objects.all(), serializer_class=CustomUserSerializer), name='user-list'),
    path('users/<int:pk>/', CustomUserDetail.as_view(), name='user-detail'),
    path('skills/', SkillListCreate.as_view(), name='skill-list'),
    path('skills/<int:pk>/', SkillDetail.as_view(), name='skill-detail'),
    path('register/', register_user, name='register'),
    path('skills/create/', create_skill, name='skill-create'),
]
