from rest_framework import serializers
from .models import CustomUser, Skill
from django.contrib.auth import get_user_model


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name']

class CustomUserSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True, required=False)
    # skills = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'phone_number', 'city', 'country', 'user_role', 'skills']
        extra_kwargs = {'password': {'write_only': True, 'required': False}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = get_user_model().objects.create_user(**validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user