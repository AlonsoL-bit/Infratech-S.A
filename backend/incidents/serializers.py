from rest_framework import serializers
from .models import Incidente

class IncidenteSerializer(serializers.ModelSerializer):
    tiempo_resolucion = serializers.ReadOnlyField()

    class Meta:
        model = Incidente
        fields = '__all__'
