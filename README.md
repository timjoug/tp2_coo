# TP COO : Concepts orienté-objet
*Timothé Jouglet - AP5 2019-2020*

---

## Réponses 

Cette partie sera mise à jour au fil des commits. Un commit correspond donc à une question du sujet.    

### Question 1

Le fichier order.controller.ts contient les routes CRUD de l'API Orders
Il est donc possible d'effectuer :      
- Un get All, qui affiche l'integralité du système Redis
- Un get One, qui va afficher un "order" stocké à l'aide de son Id
- un create, qui permet d'inserer un nouvel "order" dans Redis
- un update, qui modifie un "order" à l'aide de son Id
- un delete One, qui efface un "order" à l'aide de son Id
- un delete All, qui efface toute la base

### Question 2

On crée un fichier Order.ts, contenant toutes les classes et interfaces caractérisant les objets insérés dans Redis.        
Cette partie applique le principe du I de SOLID : la Ségrégation des Interfaces (c'est à dire préferer plusieurs interfaces spécifiques pour chaque client plutôt qu'une seule interface générale)

### Question 3

L'objectif de cette question est d'appliquer la principe de responsabilité unique de l'acronyme SOLID (lettre s).   
La solution s'articule donc autour des fichiers suivants :      
- Le fichier order.service.ts encapsule la logique permettant la manipulation du contenu de la base Redis : le coeur de la requête
- Le fichier order.controller.ts contient maintenant l'appel de la requête, dans une promesse, dans le but de gérer l'etat de la requête