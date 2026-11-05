# Maison Bréelle – infos à demander

À voir avec Olivier et Cindy Bréelle. Chaque réponse se règle dans un fichier, sans toucher au code.

| # | À demander | Où le mettre |
|---|---|---|
| 1 | **Leur histoire** : depuis quand ils sont là, d'où ils viennent, leur formation, une anecdote, des distinctions (la vidéo Amiens Connect de 2018 parle d'un savoir-faire reconnu au niveau national : lequel ?) | `locales/fr.json` et `en.json` → `house` |
| 2 | **Produits phares et prix** : leur vraie carte (l'onglet « Menu » de la fiche Google), prix au kilo ou à la pièce, ce qui est en boutique ou sur commande | `data/produits.json` + `locales/*.json → products` |
| 3 | **Formules traiteur** : buffet froid, cocktail, repas de famille, entreprise : contenu, nombre minimum de personnes, prix « à partir de » par personne | `data/traiteur.json` + `locales/*.json → catering.items` |
| 4 | **Délai de commande** : 24 h suffisent-ils ? Heure limite ? Délai pour un buffet ? | `data/site.json → order.leadHours` et `quote.minDays`, FAQ |
| 5 | **Plat du jour** : est-il fixe par jour de la semaine ? Prix de la part ? Qui le met à jour ? | `data/plat-du-jour.json` |
| 6 | **Dates limites des fêtes** : Noël (proposé : 19 décembre), Saint-Sylvestre (27 décembre), Pâques (24 mars 2027) ; ce qu'ils proposent pour chaque fête | `data/saisons.json`, `data/annonces.json` |
| 7 | **Un portable pour WhatsApp** (le 03 22 45 11 18 est un fixe) | `data/site.json → whatsapp` (format 336XXXXXXXX) |
| 8 | **L'e-mail** de la boutique, pour recevoir les commandes et les devis | Vercel : `ORDER_NOTIFY_EMAIL` (+ `RESEND_API_KEY`, `RESEND_FROM`) ; `data/site.json → email` pour l'afficher |
| 9 | **Des photos** : vitrine, produits, plats, façade, équipe (liste dans `assets/A-PHOTOGRAPHIER.md`) ; et l'accord pour utiliser la photo des plateaux de la fiche Google | `assets/<dossier>/` puis `npm run media` |
| 10 | **Le logo** : en ont-ils un (enseigne, étiquettes, sacs) ? Couleurs de l'enseigne ? | `components/Logo.tsx`, `app/icon.svg`, couleurs dans `app/globals.css` |
| 11 | **SIRET** et raison sociale, nom du responsable de la publication | `data/site.json → legal` |
| 12 | **Livraison** pour le traiteur : oui / non, dans quel secteur ? | FAQ + `locales/*.json → quote.modes` |
| 13 | **Paiement** : moyens acceptés (CB, espèces, chèques, tickets restaurant) ; acompte pour les buffets ? | FAQ (`faq.items`, `cateringPage.faq`) |
| 14 | **Allergènes / sans porc / végétarien** : ce qu'ils peuvent adapter | FAQ traiteur |

## Pour activer l'envoi des e-mails (Resend)

1. Créer un compte Resend, vérifier un domaine (ou utiliser l'adresse du compte pour tester).
2. Dans Vercel → projet `maison-breelle` → Settings → Environment Variables :
   - `RESEND_API_KEY` = la clé Resend
   - `ORDER_NOTIFY_EMAIL` = l'e-mail de la boutique
   - `RESEND_FROM` = `Maison Bréelle <commandes@domaine-verifie.fr>`
3. Redéployer. Tant que ce n'est pas fait, le client voit « Commande notée, merci d'appeler pour la confirmer » : rien n'est perdu de son côté, mais la boutique ne reçoit rien.
