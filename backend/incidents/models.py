from django.db import models

class Incidente(models.Model):
    tipo = models.CharField(max_length=100)
    area = models.CharField(max_length=100)
    descripcion = models.TextField()
    estado = models.CharField(max_length=20, choices=[('Nuevo', 'Nuevo'), ('En proceso', 'En proceso'), ('Resuelto', 'Resuelto')])
    prioridad = models.CharField(max_length=10, choices=[('Alta', 'Alta'), ('Media', 'Media'), ('Baja', 'Baja')])
    responsable = models.CharField(max_length=100, blank=True, null=True)  
    fecha = models.DateTimeField()  
    fecha_resolucion = models.DateTimeField(blank=True, null=True)  

    def __str__(self):
        return f"{self.tipo} - {self.estado}"


    def __str__(self):
        return f"{self.tipo} - {self.estado}"

