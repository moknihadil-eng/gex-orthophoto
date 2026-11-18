from flask          import Flask, render_template
from flask_cors     import CORS
from flask_jwt_extended import JWTManager
from .extensions    import db, bcrypt, login_manager
from .controllers.auth_controller import auth_bp
from .controllers.protected      import protected_bp
from .models.user import User

def create_app(config_overrides=None):
    app = Flask(__name__, static_folder='static', template_folder='templates')
    app.config.from_object('config.Config')
    if config_overrides is not None:
        app.config.update(config_overrides)

    if not app.config['SECRET_KEY'] or not app.config['SQLALCHEMY_DATABASE_URI']:
        raise RuntimeError("Configurez SECRET_KEY et DATABASE_URI avant de démarrer Flask.")

    # Extensions
    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)      # Flask-Login
    JWTManager(app)                  # JWT-Extended

    CORS(app,
         resources={r"/auth/*": {"origins": app.config['FRONTEND_ORIGIN']},
                    r"/api/*":  {"origins": app.config['FRONTEND_ORIGIN']}},
         supports_credentials=True)

    with app.app_context():
        db.create_all()

    app.register_blueprint(auth_bp,      url_prefix='/auth')
    app.register_blueprint(protected_bp, url_prefix='/api')

    @app.route('/')
    def index():
        return render_template('index.html')

    return app


@login_manager.user_loader
def load_user(user_id):
    return db.session.get(User, int(user_id))


@login_manager.unauthorized_handler
def unauthorized():
    return {"message": "Connexion requise."}, 401
