# config.py
import os, datetime
from dotenv import load_dotenv
from sqlalchemy.engine import make_url

load_dotenv()


def database_url():
    uri = os.getenv("DATABASE_URI") or os.getenv("SQLALCHEMY_DATABASE_URI")
    if not uri:
        return None
    url = make_url(uri)
    if url.drivername in {"postgres", "postgresql"}:
        return url.set(drivername="postgresql+psycopg2")
    return url


class Config:
    SECRET_KEY                     = os.getenv("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI        = database_url()
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    FRONTEND_ORIGIN                = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")

    # ← On ne lit QUE l’en-tête Authorization
    JWT_SECRET_KEY           = SECRET_KEY
    JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(hours=1)
    JWT_TOKEN_LOCATION       = ["headers"]
