from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # first_name = models.CharField(max_length=100)
    # last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null = True, verbose_name='Phone Number')
    city = models.CharField(max_length=100, blank=True, null = True)
    country = models.CharField(max_length=100, blank=True, null = True)
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('consultant', 'Consultant'),
    )
    user_role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    skills = models.ManyToManyField('Skill', blank=True)

    def __str__(self):
        return self.username

class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
