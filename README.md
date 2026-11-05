# Maison Bréelle – Charcuterie Traiteur (Amiens Henriville)

Site vitrine, commande à retirer et devis traiteur. Next.js 16, Tailwind 4, Framer Motion. Français par défaut (`/fr`), anglais (`/en`).

## Mettre à jour sans toucher au code

| Quoi | Fichier |
|---|---|
| Horaires, fermetures exceptionnelles | `data/horaires.json` |
| Bandeau d'infos (délais, fêtes) | `data/annonces.json` |
| Produits et prix | `data/produits.json` (+ noms dans `locales/*.json → products`) |
| Plat du jour | `data/plat-du-jour.json` |
| Formules traiteur | `data/traiteur.json` |
| Fêtes et dates limites | `data/saisons.json` |
| Téléphone, WhatsApp, e-mail, note Google, SIRET | `data/site.json` |
| Tous les textes | `locales/fr.json`, `locales/en.json` |
| Photos | `assets/<dossier>/` puis `npm run media` (voir `assets/A-PHOTOGRAPHIER.md`) |

## Commandes

```bash
npm run dev          # développement
npm run media        # prépare les photos de assets/ pour le web
npm run contenu      # régénère CONTENU.md (textes à valider)
npm run affichette   # régénère print/affichette-a5.pdf (QR code)
```

## E-mails (Resend)

Variables Vercel : `RESEND_API_KEY`, `ORDER_NOTIFY_EMAIL`, `RESEND_FROM`. Sans elles, les formulaires fonctionnent mais invitent le client à appeler pour confirmer. Voir `INFOS-A-DEMANDER.md`.
