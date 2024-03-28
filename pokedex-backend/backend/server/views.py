from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Counter
from .serializers import CounterSerializer

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