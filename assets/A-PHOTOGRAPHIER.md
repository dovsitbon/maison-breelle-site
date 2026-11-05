# Photos à prendre sur place

Déposez chaque photo dans le bon dossier **avec le nom indiqué** (jpg, png, webp ou heic), puis lancez :

```bash
npm run media
```

Le site remplace tout seul l'emplacement vide par la photo. Une photo ajoutée avec un nom non listé est préparée aussi : il suffit ensuite de mettre sa clé (`dossier/nom`) dans `data/*.json`.

Conseils : lumière du jour, pas de flash, cadrage horizontal sauf indication, produits sur le comptoir ou sur une planche, pas de reflets de vitrine.

## Déjà en place

Une seule photo réelle, venue de la fiche Google (`assets/raw/maison-breelle_maps_01.jpg`), recadrée en trois. **Elle a peut-être été publiée par un client** (table d'anniversaire) : à remplacer par vos propres photos dès que possible, ou à faire valider par la boutique.

| Clé | Utilisée pour |
|---|---|
| `hero/plateaux-charcuterie` | Hero de l'accueil, image de partage |
| `traiteur/plateau-jambon` | Carte « Plateau de jambon », carte « Buffet froid » |
| `traiteur/plateau-rosbif` | Carte « Plateau de rosbif », tuile « Plateaux », carte « Repas de famille » |
| `plats/salade-pommes-de-terre` | Carte « Salade de pommes de terre », tuile « Salades » |

## À photographier

| Dossier / nom | Sujet | Où elle apparaît |
|---|---|---|
| `hero/` (remplacer `plateaux-charcuterie.jpg`) | La vitrine pleine, ou un beau plateau, horizontal | Hero |
| `facade/facade.jpg` | La façade et l'enseigne, vertical | Bloc « La maison » |
| `boutique/equipe.jpg` | Olivier et Cindy derrière le comptoir | Bloc « La maison » (si pas de façade) |
| `boutique/vitrine-charcuterie.jpg` | La vitrine de charcuterie, vertical | Tuile « Charcuterie maison » |
| `boutique/pate-en-croute.jpg` | Pâté en croûte tranché | Carte produit |
| `boutique/terrine-campagne.jpg` | Terrine | Carte produit |
| `boutique/rillettes.jpg` | Rillettes | Carte produit |
| `boutique/jambon-blanc.jpg` | Jambon à la trancheuse | Carte produit |
| `boutique/saucisson-sec.jpg` | Saucissons | Carte produit |
| `boutique/boudin-noir.jpg` | Boudin | Carte produit |
| `boutique/saucisses.jpg` | Saucisses fraîches | Carte produit |
| `plats/plats-cuisines.jpg` | Les plats du jour en barquette ou en plat, vertical | Tuile « Plats cuisinés » |
| `plats/plat-du-jour.jpg` | Une assiette du plat du jour | Bloc « Plat du jour » |
| `plats/hachis-parmentier.jpg`, `choucroute.jpg`, `blanquette.jpg`, `lasagnes.jpg` | Plats | Cartes produits |
| `plats/salades.jpg` | Le rayon salades, vertical | Tuile « Salades & entrées » |
| `plats/celeri-remoulade.jpg`, `piemontaise.jpg`, `carottes-rapees.jpg` | Salades | Cartes produits |
| `traiteur/plateaux.jpg` | Plusieurs plateaux, vertical | Tuile « Plateaux & buffets » |
| `traiteur/plateau-charcuterie.jpg` | Plateau de charcuterie | Carte produit |
| `traiteur/buffet-froid.jpg`, `cocktail.jpg`, `repas-famille.jpg`, `entreprise.jpg` | Une prestation de chaque type | Cartes traiteur |
| `traiteur/fetes.jpg` | Une table ou un produit de fête, vertical | Tuile « Les fêtes » |
| `traiteur/noel.jpg`, `nouvel-an.jpg`, `paques.jpg` | Produits de chaque fête | Section « Les fêtes » |
