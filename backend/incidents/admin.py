from django.contrib import admin
from .models import Incidente

@admin.register(Incidente)
class IncidenteAdmin(admin.ModelAdmin):
    list_display = ('tipo', 'area', 'estado', 'prioridad', 'responsable', 'fecha', 'fecha_resolucion')
    list_filter = ('estado', 'prioridad', 'tipo', 'responsable')
    search_fields = ('tipo', 'descripcion', 'responsable')
    queryset = Incidente.objects.order_by('fecha')



