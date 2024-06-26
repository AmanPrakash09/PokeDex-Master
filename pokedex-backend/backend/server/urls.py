from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('counter/', views.getCounter, name="counter"),
    path('counter/<str:pk>/update/', views.updateCounter, name="update-counter"),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.register, name="register"),
    path('user-info/', views.user_info, name='user_info'),
    path('delete-account/', views.delete_account, name='delete_account'),
    path('update-account/', views.update_account, name='update_account'),
    path('query/', views.query, name='query'),
]
