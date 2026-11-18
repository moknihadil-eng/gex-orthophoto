import unittest

from app import create_app
from app.extensions import db
from app.models.user import User


class AuthenticationTest(unittest.TestCase):
    def setUp(self):
        self.app = create_app({
            "TESTING": True,
            "SECRET_KEY": "test-session-key" * 3,
            "JWT_SECRET_KEY": "test-jwt-key" * 3,
            "SQLALCHEMY_DATABASE_URI": "sqlite://",
        })
        self.client = self.app.test_client()
        self.account = {
            "firstName": "Jean",
            "lastName": "Dupont",
            "email": "jean@example.org",
            "password": "test-password",
        }

    def test_registration_validation_and_duplicate(self):
        self.assertEqual(self.client.post("/auth/register", json=[]).status_code, 400)
        too_long = {**self.account, "password": "\u00e9" * 37}
        self.assertEqual(self.client.post("/auth/register", json=too_long).status_code, 400)
        self.assertEqual(self.client.post("/auth/register", json=self.account).status_code, 201)
        self.assertEqual(self.client.post("/auth/register", json=self.account).status_code, 409)

    def test_login_protected_route_and_logout(self):
        user = self.client.post("/auth/register", json=self.account).get_json()
        invalid = {**self.account, "password": "invalid"}
        self.assertEqual(self.client.post("/auth/login", json=invalid).status_code, 401)
        self.assertEqual(self.client.get("/auth/user").status_code, 401)
        self.assertEqual(self.client.get("/api/protected").status_code, 401)

        login = self.client.post("/auth/login", json=self.account)
        self.assertEqual(login.status_code, 200)
        headers = {"Authorization": f"Bearer {login.get_json()['access_token']}"}
        profile = self.client.get("/auth/user", headers=headers)
        self.assertEqual(profile.status_code, 200)
        self.assertEqual(profile.get_json()["id"], user["id"])
        self.assertEqual(self.client.get("/api/protected", headers=headers).status_code, 200)

        other_client = self.app.test_client()
        other_account = {**self.account, "lastName": "Martin", "email": "other@example.org"}
        self.assertEqual(other_client.post("/auth/register", json=other_account).status_code, 201)
        self.assertEqual(other_client.post("/auth/login", json=other_account).status_code, 200)
        self.assertEqual(other_client.get("/api/protected", headers=headers).status_code, 401)

        self.assertEqual(self.client.post("/auth/logout").status_code, 200)
        self.assertEqual(self.client.get("/api/protected", headers=headers).status_code, 401)
        with self.app.app_context():
            db.session.delete(db.session.get(User, user["id"]))
            db.session.commit()
        self.assertEqual(self.client.get("/auth/user", headers=headers).status_code, 401)
