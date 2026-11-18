from flask       import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.exc import IntegrityError
from ..extensions import db
from ..services.auth_service import register_user, authenticate_user, logout_current_user
from ..models.user           import User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"message": "Un objet JSON est requis."}), 400
    username = data.get('username')
    if username is None:
        names = (data.get('firstName', ''), data.get('lastName', ''))
        username = ' '.join(name.strip() for name in names if isinstance(name, str))
    email = data.get('email')
    password = data.get('password')
    if not isinstance(username, str) or not 1 <= len(username.strip()) <= 150:
        return jsonify({"message": "Nom invalide."}), 400
    if not isinstance(email, str) or not 1 <= len(email.strip()) <= 150 or '@' not in email:
        return jsonify({"message": "Adresse email invalide."}), 400
    try:
        password_bytes = password.encode('utf-8') if isinstance(password, str) else b''
    except UnicodeEncodeError:
        password_bytes = b''
    if not 1 <= len(password_bytes) <= 72:
        return jsonify({"message": "Le mot de passe doit contenir entre 1 et 72 octets UTF-8."}), 400

    try:
        user = register_user(username.strip(), email.strip(), password)
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "Ce nom ou cette adresse email est déjà utilisé."}), 409

    return jsonify({"id": user.id, "username": user.username}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"message": "Un objet JSON est requis."}), 400
    email  = data.get('email')
    passwd = data.get('password')
    if not isinstance(email, str) or not email.strip() or not isinstance(passwd, str) or not passwd:
        return jsonify({"message":"Email and password required"}), 400

    try:
        result = authenticate_user(email.strip(), passwd)
    except ValueError:
        result = None
    if not result:
        return jsonify({"message":"Invalid credentials"}), 401

    # → renvoie à la fois la session cookie et le JWT × Header
    return jsonify(result), 200

@auth_bp.route('/user', methods=['GET'])
@jwt_required()  # vérifie le JWT dans Authorization: Bearer <token>
def get_current_user():
    # vous pouvez toujours utiliser current_user (Flask-Login) ou get_jwt_identity()
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))
    if user is None:
        return jsonify({"message": "Compte introuvable."}), 401
    return jsonify({
        "id":       user.id,
        "username": user.username,
        "email":    user.email
    }), 200

@auth_bp.route('/logout', methods=['POST'])
def logout():
    logout_current_user()  # supprime la session côté serveur
    return jsonify({"message":"Logged out"}), 200
