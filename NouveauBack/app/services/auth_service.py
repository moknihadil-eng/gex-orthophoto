from flask_login         import login_user, logout_user
from flask_jwt_extended import create_access_token
from ..extensions        import db, bcrypt
from ..models.user       import User

def register_user(username: str, email: str, password: str) -> User:
    hashed = bcrypt.generate_password_hash(password).decode('utf-8')
    user   = User(username=username, email=email, password=hashed)
    db.session.add(user)
    db.session.commit()
    return user

def authenticate_user(email: str, password: str) -> dict | None:
    """
    1) Vérifie le mot de passe
    2) login_user() maintient la session Flask-Login
    3) create_access_token() génère un JWT stateless
    """
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        login_user(user)  # session Flask-Login
        token = create_access_token(identity=str(user.id))
        return {'access_token': token, 'username': user.username}
    return None

def logout_current_user():
    logout_user()  # détruit la session Flask-Login
