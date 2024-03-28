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
        }
    ]
    
    return Response(routes)

@api_view(['GET'])
def getCounter(request):
    
    count = Counter.objects.all()
    serializer = CounterSerializer(count, many=True)
    return Response(serializer.data)