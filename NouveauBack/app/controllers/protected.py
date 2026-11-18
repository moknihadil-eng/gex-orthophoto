from flask        import Blueprint, jsonify
from flask_login  import login_required, current_user
from flask_jwt_extended import jwt_required, get_jwt_identity

protected_bp = Blueprint('protected', __name__)

@protected_bp.route('/protected', methods=['GET'])
@login_required    # accessible si session Flask-Login valide
@jwt_required()    # **et** si JWT valide dans le header
def protected():
    # vous pouvez choisir l’un ou l’autre pour identifier l’utilisateur :
    # via session : 
    #    user = current_user
    # via JWT   :
    user_id = get_jwt_identity()
    if user_id != current_user.get_id():
        return jsonify({"message": "Session does not match token"}), 401
    # user_id doit être le même que current_user.id
    return jsonify({"msg": f"Hello, {current_user.username} (JWT sub={user_id})!"}), 200
