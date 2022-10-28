# Version 1

Dans cette version, nous avons implémenté les fonctionnalités suivantes :

- Copie de texte
- Collage de texte
- Couper du texte
- Manipulation de la sélection

## Copie

Nous utilisons un presse-papier global à l'application.
Lors de l'utilisation de la commande CTRL+C ou le bouton dans le ruban, le texte sélectionné est enregistré dans cette
variable.

## Collage

Lors de l'utilisation de la commande CTRL+V ou le bouton dans le ruban, le texte contenu dans la variable est collé à la
position du curseur.
Celui-ci est déplacé à la fin du texte collé.

## Couper

Lors de l'utilisation de la commande CTRL+X ou le bouton dans le ruban, le texte sélectionné est enregistré dans la
variable et supprimé du document.

## Manipulation de la sélection

La sélection est modifiable uniquement avec les commandes du ruban.
Il est néanmoins possible de la commencer en utilisant la souris.
