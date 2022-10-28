# Version 2

En plus des fonctionnalités de la version 1, nous avons implémenté les fonctionnalités suivantes :

- Annuler
- Rétablir
- Enregistrer une série d'actions

## Annuler

Les commandes de copie, de collage et de coupage sont annulables.

Ces commandes vont hériter d'une classe qui permet de différencier les actions que l'on peut annuler de celles que l'on
ne peut pas.

À l'exécution, elles seront ajoutées à un historique d'actions et l'état du document sera sauvegardé.
Lors de l'utilisation de la commande CTRL+Z ou le bouton dans le ruban, l'action précédente est annulée et l'état du
document lors de l'exécution de cette action est restauré.

Cette action annulée sera stockée dans un autre historique d'actions.

## Rétablir

Lors de l'utilisation du bouton dans le ruban, l'action précédemment annulée est rétablie. Pour ce faire, elle est
simplement exécutée à nouveau.

## Enregistrer une série d'actions

Lors de l'utilisation du bouton dans le ruban, l'utilisateur va pouvoir commencer un enregistrement d'une série
d'actions.
Les actions annulables seront enregistrées dans une liste.

Pour stopper l'enregistrement, l'utilisateur va devoir utiliser le bouton dans le ruban.

Lors de l'utilisation du bouton dans le ruban, l'utilisateur va pouvoir rejouer la série d'actions enregistrée, et cela,
autant de fois qu'il le souhaite. Jusqu'à vouloir enregistrer un nouvel enregistrement, ce qui va écraser l'ancien.
