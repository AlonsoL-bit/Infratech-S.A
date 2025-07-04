from rest_framework import viewsets
from .models import Incidente
from .serializers import IncidenteSerializer

class IncidenteViewSet(viewsets.ModelViewSet):
    queryset = Incidente.objects.order_by('fecha')
    serializer_class = IncidenteSerializer



