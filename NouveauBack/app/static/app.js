// Envoie un POST JSON et affiche la réponse
async function postJSON(url, data, outputEl) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    outputEl.textContent = JSON.stringify(json, null, 2);
  } catch (err) {
    outputEl.textContent = "Erreur : " + err;
  }
}

// Installation des handlers une fois le DOM chargé
window.addEventListener("DOMContentLoaded", () => {
  const registerResult = document.getElementById("registerResult");
  const loginResult = document.getElementById("loginResult");
  const logoutResult = document.getElementById("logoutResult");

  // 1) Inscription manuelle au clic
  document.getElementById("registerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    postJSON(
      "/auth/register",
      {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      },
      registerResult
    );
  });

  // 2) Connexion manuelle
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    postJSON(
      "/auth/login",
      {
        email: e.target.email.value,
        password: e.target.password.value,
      },
      loginResult
    );
  });

  // 3) Déconnexion manuelle
  document.getElementById("logoutBtn").addEventListener("click", () => {
    postJSON("/auth/logout", {}, logoutResult);
  });

});
