// src/services/api.js
import axios from "axios";

// 1) Créez l’instance Axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// 2) Injectez le token existant au démarrage
const token = localStorage.getItem("access_token");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

function clearAccessToken() {
  localStorage.removeItem("access_token");
  delete api.defaults.headers.common["Authorization"];
}

// 4) Fonctions exposées

/** Inscription */
export const register = (data) =>
  api.post("/auth/register", data).then((res) => res.data);

/** Connexion */
export const login = async (data) => {
  const { access_token, username } = await api
    .post("/auth/login", data)
    .then((res) => res.data);

  localStorage.setItem("access_token", access_token);
  api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  return username;
};

/** Déconnexion */
export const logout = async () => {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } finally {
    clearAccessToken();
  }
};

/** Récupérer l’utilisateur courant */
export const getCurrentUser = async ({ signal } = {}) => {
  const token = localStorage.getItem("access_token");
  if (!token) return null;
  try {
    const response = await api.get("/auth/user", { signal });
    return response.data;
  } catch (error) {
    if ([401, 422].includes(error.response?.status) &&
        token === localStorage.getItem("access_token")) {
      clearAccessToken();
    }
    throw error;
  }
};

/** Mot de passe oublié */
export const forgotPassword = (email) =>
  api.post("/auth/forgot_password", { email }).then((res) => res.data);

/** Réinitialiser le mot de passe */
export const resetPassword = (data, token) =>
  api
    .put("/auth/resetPassword", data, { params: { token } })
    .then((res) => res.data);

/** Confirmation d’email */
export const confirmEmail = (token) =>
  api.get("/auth/confirm", { params: { token } }).then((res) => res.data);

/** Renvoyer l’email de confirmation */
export const resendConfirmationEmail = (email) =>
  api.post("/auth/resendEmail", { email }).then((res) => res.data);

// 5) Export par défaut de l’instance Axios
export default api;
