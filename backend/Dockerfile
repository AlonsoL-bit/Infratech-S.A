# Dockerfile backend
FROM python:3.11-slim

# Evitar archivos pyc y forzar logs en consola
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Instala dependencias básicas necesarias
RUN apt-get update && apt-get install -y build-essential libpq-dev && rm -rf /var/lib/apt/lists/*

# Setea directorio de trabajo
WORKDIR /app

# Copia requirements y lo instala
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copia el resto del código
COPY . .

# Expone el puerto que usará gunicorn
EXPOSE 8000

# Comando para levantar Django con Gunicorn
CMD ["gunicorn", "infratech_backend.wsgi:application", "--bind", "0.0.0.0:8000"]

