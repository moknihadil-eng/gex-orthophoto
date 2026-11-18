import { useState } from "react";
import axios from "axios";

const testApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
  withCredentials: true,
  validateStatus: () => true,
});

const routes = [
  ["POST", "/auth/register", "Inscription"],
  ["POST", "/auth/login", "Connexion"],
  ["GET", "/auth/user", "Profil"],
  ["GET", "/api/protected", "Accès protégé"],
  ["POST", "/auth/logout", "Déconnexion"],
];

export default function ApiTestPage() {
  const [token, setToken] = useState("");
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  async function send(event) {
    event.preventDefault();
    const path = event.nativeEvent.submitter.value;
    const [method] = routes.find((route) => route[1] === path);
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    const data = path === "/auth/register" ? fields
      : path === "/auth/login" ? { email: fields.email, password: fields.password }
      : undefined;

    setBusy(true);
    setResult(null);
    try {
      const response = await testApi.request({
        url: path,
        method,
        data,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setResult({ method, path, status: response.status, body: response.data });
      if (path === "/auth/login" && response.data?.access_token) {
        setToken(response.data.access_token);
      }
      if (path === "/auth/logout" && response.status === 200) setToken("");
    } catch (error) {
      setResult({ method, path, body: { message: error.message } });
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="w-full max-w-3xl space-y-5 px-6 py-8">
      <h1 className="text-2xl font-bold">Tester l’API Flask</h1>
      <p>Crée un compte de test, connecte-toi, puis appelle le profil et la route protégée.</p>
      <form onSubmit={send} className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["firstName", "Prénom", "text"],
            ["lastName", "Nom", "text"],
            ["email", "Adresse e-mail", "email"],
            ["password", "Mot de passe", "password"],
          ].map(([name, label, type]) => (
            <label key={name} className="grid gap-1">
              {label}
              <input name={name} type={type} className="rounded border border-gray-400 p-2" />
            </label>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {routes.map(([, path, label]) => (
            <button key={path} value={path} disabled={busy} type="submit" formNoValidate
              className="rounded bg-gray-900 px-3 py-2 text-white disabled:opacity-50">
              {label}
            </button>
          ))}
        </div>
      </form>
      <div aria-live="polite">
        {busy && <p>Requête en cours…</p>}
        {result && (
          <>
            <h2 className="font-semibold">
              {result.method} {result.path} · {result.status ? `HTTP ${result.status}` : "Erreur réseau"}
            </h2>
            <pre className="mt-2 overflow-auto rounded bg-gray-100 p-4">{JSON.stringify(result.body, null, 2)}</pre>
          </>
        )}
      </div>
    </section>
  );
}
