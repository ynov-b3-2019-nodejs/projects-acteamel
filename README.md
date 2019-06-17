# Pollstar
## Description
Pollstar est une application web de sondages permettant aux utilisateurs de créer leurs propres sondages personnalisés en définissant une infinité de choix. Un lien de partage leur permettra de partager leur sondage afin que d'autres utilisateurs puissent voter. Les résultat de chaque sondage sont disponibles en temps réel.

Deux options s'offrent aux sondages :
- Les **choix multiples** : Les utilisateurs ont la possibilité de voter plusieurs options.
- La **vérification par IP** : Cette option permet d'éviter le spam en n'autorisant qu'un vote par adresse IP.

Un sondage est divisé en 3 parties :
- La **création du sondage** : Le créateur définit le titre de son sondage, les choix et les options. Il obtient ensuite le lien de partage.
- Les **votes** : Les utilisateurs reçevant le lien de partage peuvent voter parmis les choix proposés par le créateur.
- Les **résultats** : Après un vote, l'utilisateur est directement redirigé vers les résultats du sondage. À savoir que les résultats s'actualisent en temps réel.

## L'application web
L'application est composée d'une API permettant de traiter les données et les requêtes, et d'un site web exploitant cette API afin d'offrir une interface fonctionelle pour les utilisateurs.

Le choix d'avoir réalisé une API vient du fait de la réutilisation de celle-ci pour, par exemple, une future application mobile. Elle permet également d'être réutilisée par n'importe qui, en l'intégrant dans d'autres sites web ou applications.

## Technologies utilisées
Pour réaliser l'API, nous avont utilisé le langage TypeScript avec NodeJS. Le module Express est utilisé pour la gestion des requêtes, des réponses et des routes.

L'application web fonctionne grâce à React, une bibliothèque JavaScript Frontend.

Concernant les résultats des sondages en temps réel, les Websockets sont utilisés grâce au module socket.io (côté API) et socket.io-client (côté application web).

La base de données utilisée est MongoDB.

## Installation et utilisation
### MongoDB
Il suffit juste d'installer MongoDB Server, aucune configuration supplémentaire n'est requise, l'API s'occupera du reste.

### API et application web
L'API fonctionne avec TypeScript, il faut donc installer le transpileur.

`$ npm i -g typescript`

Ensuite, il suffit simplement de cloner le projet sur GitHub.

`$ git clone https://github.com/ynov-b3-2019-nodejs/projects-acteamel.git`

Le projet étant divisé en 2 parties, il va falloir installer les modules npm pour chacun d'eux.

`$ cd api && npm i && cd ../front && npm i`

Et enfin, il faut créer le fichier ".env" à la racine du projet, au même niveau que le fichier ".env.example", en définissant vos propres variables d'environnement (ne redéfinissez pas les variables déjà inscrites, comme les port de l'API et du WebSocket). Un exemple ci-dessous.

```
DB_HOST=localhost
DB_PORT=27017
DB_NAME=pollstar
API_PORT=80
WEBSOCKET_PORT=8000
```

À savoir que l'application web démarre sur le port 3000 par défaut. Si vous souhaitez le changer, il faut créer un fichier ".env" dans le dossier "front" avec comme variable `PORT=<Votre port>`.

## Contributeurs

Ce projet a été réalisé dans le cadre de l'apprentissage de NodeJS, nous étions un groupe composé de 3 personnes :
- [Jérémy Surieux](https://github.com/Lelberto)
- [Théo Schmidt](https://github.com/Rocknologie)
- [Camille Legey](https://github.com/Toundras)