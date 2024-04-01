from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
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