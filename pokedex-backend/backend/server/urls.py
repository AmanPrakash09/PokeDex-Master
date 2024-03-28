from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('counter/', views.getCounter, name="counter"),
]
