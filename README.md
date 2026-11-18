# Gex-Orthophoto

Application web full-stack développée avec React et Flask pour gérer l’authentification et l’accès à un espace utilisateur.

## Fonctionnalités

- Inscription, connexion, consultation du profil et déconnexion.
- Cinq routes REST pour l’inscription, la connexion, le profil, l’accès protégé et la déconnexion.
- Console locale de test de l’API, accessible à l’adresse `/test-api` en mode développement.

## Démarrage et tests

Le [guide de démarrage](NouveauBack/README.md) explique comment configurer la base de données, démarrer les serveurs et lancer les tests.

- Tests d’authentification côté Flask avec une base SQLite en mémoire.
- Tests de contrôle d’accès côté React.

Le traitement des orthophotos reste à implémenter.
