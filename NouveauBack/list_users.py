from app import create_app
from app.extensions import db
from app.models.user import User

app = create_app()

with app.app_context():
    # Récupère tous les utilisateurs
    users = User.query.all()
    for u in users:
        print(f"{u.id} – {u.username} – {u.email}")
