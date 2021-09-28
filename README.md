<![endif]-->

**

## ProjetN°5: # Construisez un site e-commerce

## Orinoco

Orinoco, est une entreprise de commerce en ligne.
Elle se démarque par sa création d'applications thématiques ne vendant qu’un seul groupe de produits.

Dans ce projet, on nous propose trois choix de thème:
● ours en peluche faits à la main ; 
● caméras vintage ; 
● meubles en chêne.


## Plan de test:

Un plan de test devra être réalisé couvrant au minimum 80 % de la base de code pour le front-end.

## Conditions préalables:

Vous aurez besoin d'avoir Node et npm installés localement sur votre machine.
###  Installation
Clonez ce dépôt. À partir du dossier du projet, exécutez npm install. Vous pouvez ensuite exécuter le serveur avec le serveur de nœud. Le serveur doit s'exécuter sur localhost avec le port par défaut 3000. Si le serveur s'exécute sur un autre port pour une raison quelconque, cela est imprimé sur la console lorsque le serveur démarre, par ex. Écoute sur le port 3001.

## Architecture générale:

L’application web sera composée de quatre pages : 

● une page d'accueil, montrant tous les articles disponibles à la vente ; 
● une page “produit”, qui affiche de manière dynamique l'élément sélectionné par l'utilisateur et lui permet de personnaliser le produit et de l'ajouter à son panier ; 
● une page “panier” contenant un résumé des produits dans le panier, le prix total et un formulaire permettant de passer une commande. Les données du formulaire doivent être correctes et bien formatées avant d'être renvoyées au back-end.
● une page de confirmation de commande, remerciant l'utilisateur pour sa commande, et indiquant le prix total et l'identifiant de commande envoyé par le serveur.

## Informations complémentaires:

- Pour le MVP, la personnalisation du produit ne sera pas fonctionnelle : la page contenant un seul article aura un menu déroulant permettant à l'utilisateur de choisir une option de personnalisation, mais celle-ci ne sera ni envoyée au serveur ni reflétée dans la réponse du serveur. 

- Le code source devra être indenté et utiliser des commentaires. Il devra également utiliser des fonctions globales. Concernant l’API, des promesses devront être utilisées pour éviter les rappels.

- Les inputs des utilisateurs doivent être validés avant l’envoi à l’API.



