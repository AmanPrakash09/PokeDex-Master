from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.db import connection
from django.db.utils import IntegrityError

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Counter
from .serializers import CounterSerializer
from .engine import QueryEngine
from datetime import date

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
def query(request):
    e = QueryEngine()
    try:
        tuples = e.execute_query(request.data)
        return Response(tuples)
    except Exception as e:
        return Response({"error": f"Invalid query: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def register(request):
    try:
        # username is actually email
        username = request.data['username']
        email = request.data['email']
        password = request.data['password']
        user_name = request.data['user_name']
        
        if User.objects.filter(username=username).exists():
            return Response({'error': "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username, email, password)
        user.first_name = user_name
        user.last_name = user_name
        user.save()

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    # ________________________________________________SQL INSERT Operation on AppUser1 and AppUser2________________________________________________
    # membership default value is 1
    membership_level = 1
    loyalty = 1

    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM AppUser1 WHERE email = %s", [email])
            if cursor.fetchone() is not None:
                return Response({'error': "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

            cursor.execute("SELECT MembershipLevel FROM AppUser2 WHERE MembershipLevel = %s", [membership_level])
            if cursor.fetchone() is None:
                cursor.execute("INSERT INTO AppUser2 (MembershipLevel, Loyalty) VALUES (%s, %s)", [membership_level, loyalty])

        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO AppUser1 (Email, Username, MembershipLevel) VALUES (%s, %s, %s)", [email, user_name, membership_level])

        return Response({'success': "User created successfully"}, status=status.HTTP_201_CREATED)
    
    except IntegrityError as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# ________________________________________________SQL Selection/Projection/Join Operation on AppUser1 and AppUser2________________________________________________
@api_view(['GET'])
def user_info(request):
    
    email = request.query_params.get('email')
    
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        with connection.cursor() as cursor:
            cursor.execute("""SELECT a1.Email, a1.Username, a2.MembershipLevel, a2.Loyalty
                              FROM AppUser1 a1
                              JOIN AppUser2 a2 ON a1.MembershipLevel = a2.MembershipLevel
                              WHERE a1.Email = %s""", [email])
            user_info = cursor.fetchone()
            if user_info:
                data = {
                    'email': user_info[0],
                    'username': user_info[1],
                    'membership_level': user_info[2],
                    'loyalty': user_info[3]
                }
                return Response(data)
            else:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_account(request):
    email = request.query_params.get('email')

    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        User = get_user_model()
        try:
            user_to_delete = User.objects.get(email=email)
            user_to_delete.delete()
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # ________________________________________________SQL DELETE Operation on AppUser1________________________________________________
        
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM AppUser1 WHERE Email = %s", [email])

        return Response({'success': 'User deleted successfully.'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_account(request):
    email = request.query_params.get('email')
    
    data = request.data

    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    membership_level = data.get('membership_level')
    if membership_level:
        try:
        # ________________________________________________SQL UPDATE Operation on AppUser1 MembershipLevel________________________________________________
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE AppUser1 
                                SET MembershipLevel = %s
                                WHERE Email = %s""", [membership_level, email])
            return Response({'success': 'Membership Level updated successfully.'}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    try:
        
        # needed to remove since when updating the username, we do not want to not be able to login since the code below will change the email
        
        # User = get_user_model()
        # try:
        #     user_to_update = User.objects.get(email=email)
        #     user_to_update.username = data.get('username', user_to_update.username)
        #     user_to_update.save()
        # except User.DoesNotExist:
        #     return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # ________________________________________________SQL UPDATE Operation on AppUser1 Username________________________________________________
        
        with connection.cursor() as cursor:
            cursor.execute("""UPDATE AppUser1 
                              SET Username = %s
                              WHERE Email = %s""", [data['username'], email])

        return Response({'success': 'Username updated successfully.'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
