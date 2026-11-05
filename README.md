# Check Sécurité Rayon — application installable (PWA)

Coquille légère hébergée sur GitHub Pages : elle ouvre l'application Apps Script en plein écran
et permet de l'installer comme une icône sur le téléphone.

## Mise en ligne
1. Dans le dépôt GitHub, déposez tous les fichiers de ce dossier (racine du dépôt) : index.html, config.js, manifest.webmanifest, sw.js, dossier icons/.
2. Ouvrez config.js et collez l'adresse /exec de l'application (Déployer > Gérer les déploiements).
3. Settings > Pages > Source : « Deploy from a branch », branche main, dossier / (root).
4. Adresse obtenue : https://<compte>.github.io/<dépôt>/ — à ouvrir sur le téléphone, puis « Ajouter à l'écran d'accueil » (iPhone : Safari > Partager).

## Côté Apps Script
- doGet doit autoriser l'affichage dans un cadre : .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL) (déjà fait dans Code.gs).
- Après toute modification du code : Déployer > Gérer les déploiements > nouvelle version (l'adresse /exec ne change pas).
- Accès du déploiement : « Tout le monde » (ou « Tout le monde avec un compte Google »). Avec « Dans le domaine », la connexion Google ne peut pas s'afficher dans un cadre : utiliser alors le lien « Ouvrir directement ».

## Mise à jour de la coquille
Changer VERSION dans sw.js (v1 -> v2) après avoir modifié index.html, config.js ou les icônes.
