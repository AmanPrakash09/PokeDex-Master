from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Counter
from .serializers import CounterSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Create your views here.

@api_view(['GET', 'PUT', 'POST', 'DELETE'])
def getRoutes(request):
    
    routes = [
        {
            'Endpoint': '/counter/',
            'method': 'GET',
            'body': None,
            'description': 'returns the counter'
        },
        {
            'Endpoint': '/counter/<str:pk>/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'updates the counter'
        },
        {
            'Endpoint': '/token/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'returns the token'
        },
        {
            'Endpoint': '/token/refresh/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'refreshes the token'
        },
    ]
    
    return Response(routes)

@api_view(['GET'])
def getCounter(request):
    
    count = Counter.objects.all()
    serializer = CounterSerializer(count, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def updateCounter(request, pk):
    
    data = request.data
    count = Counter.objects.get(id=pk)
    serializer = CounterSerializer(instance=count, data=data)
    
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def register(request):
    try:
        username = request.data['username']
        email = request.data['email']
        password = request.data['password']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        
        if User.objects.filter(username=username).exists():
            return Response({'error': "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return Response({'error': "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username, email, password)
        user.first_name = first_name
        user.last_name = last_name
        user.save()

        return Response({'success': "User created successfully"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)