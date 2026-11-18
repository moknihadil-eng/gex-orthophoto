import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section className="w-full max-w-lg px-6 py-16 text-center">
      <h1 className="text-3xl font-bold text-gray-900">Bienvenue sur Gex-Orthophoto</h1>
      <p className="mt-3 text-gray-600">Connectez-vous pour accéder à votre espace.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link to="/signin" className="rounded bg-red-700 px-5 py-2 font-semibold text-white hover:bg-red-800">
          Se connecter
        </Link>
        <Link to="/signup" className="rounded border border-gray-400 px-5 py-2 font-semibold text-gray-900 hover:bg-gray-100">
          Créer un compte
        </Link>
      </div>
    </section>
  );
};

export default HomePage;
