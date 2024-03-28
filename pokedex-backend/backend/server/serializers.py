from rest_framework.serializers import ModelSerializer
from .models import Counter

class CounterSerializer(ModelSerializer):
    class Meta:
        model = Counter
        fields = '__all__'