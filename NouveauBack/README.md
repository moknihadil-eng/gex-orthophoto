# Authentification Flask et interface React

Utilisez Python 3.10 ou supérieur, Node.js 20 ou supérieur et PostgreSQL.

Dans `NouveauBack`, créez un environnement virtuel et installez les dépendances. Sous Windows, les commandes ci-dessous utilisent directement le Python de cet environnement.

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

Configurez `SECRET_KEY` avec une clé aléatoire privée et `DATABASE_URI` avec l’URL de votre base PostgreSQL, par exemple `postgresql://utilisateur:mot_de_passe@localhost:5432/orthophoto`. L’application accepte aussi la variable `SQLALCHEMY_DATABASE_URI`. Vous pouvez définir ces variables dans l’environnement ou dans un fichier local `.env`. Gardez les valeurs réelles hors de Git.

```powershell
.\.venv\Scripts\python.exe run.py
```

Dans un autre terminal, depuis `frontt`, lancez `npm ci` puis `npm start`. Ouvrez `http://localhost:3000`. L’API utilise `http://localhost:5000` par défaut. Pour changer ces adresses, définissez `REACT_APP_API_URL` côté React et `FRONTEND_ORIGIN` côté Flask.

`python -m unittest -v` depuis `NouveauBack` exécute les tests d’authentification sur une base SQLite temporaire. Depuis `frontt`, lancez `npm test -- --watchAll=false --runInBand` et `npm run build`.
