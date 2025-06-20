# Task Manager – Prueba Técnica

## Cómo correr el backend

```bash
cd backend
python -m venv env
source env/Scripts/activate
pip install -r requirements.txt  # o instala Django, DRF y SimpleJWT manualmente
python manage.py migrate
python manage.py createsuperuser  # usar admin / admin123
python manage.py runserver
```

## Cómo correr el frontend

```bash
cd frontend
npm install
npm run dev
```

Abrir en navegador: [http://localhost:3000/login](http://localhost:3000/login)

## Usuario de prueba

```
Usuario: admin
Contraseña: admin123
```
