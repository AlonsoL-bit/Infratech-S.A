from django.db import models

class Incidente(models.Model):
    ESTADOS = [
        ('Nuevo', 'Nuevo'),
        ('En proceso', 'En proceso'),
        ('Resuelto', 'Resuelto'),
    ]

    PRIORIDADES = [
        ('Alta', 'Alta'),
        ('Media', 'Media'),
        ('Baja', 'Baja'),
    ]

    tipo = models.CharField(max_length=100)
    area = models.CharField(max_length=100)
    descripcion = models.TextField()
    estado = models.CharField(max_length=20, choices=ESTADOS, default='Nuevo')
    prioridad = models.CharField(max_length=20, choices=PRIORIDADES, default='Media')
    fecha = models.DateTimeField()
    responsable = models.CharField(max_length=100)
    fechaResolucion = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.tipo} - {self.estado}"
