# Maison Bréelle – contenu du site (à valider)

Généré depuis `locales/fr.json` et `locales/en.json`. Pour modifier un texte, modifiez ces fichiers puis relancez `npm run contenu`.

## À faire valider en priorité

- **Faits utilisés** : la maison est tenue par **Olivier et Cindy Bréelle**, « uniquement des produits maison » (vidéo Amiens Connect, novembre 2018). Rien d'autre n'a été affirmé sur leur histoire : date de création, parcours, distinctions éventuelles sont à demander.
- **Note Google** : 4.8/5 sur 86 avis, relevée le 2026-11-05. Les thèmes des avis (qualité, prix) sont repris sans citer d'avis.
- **Les produits** ci-dessous sont une **liste indicative** de charcuterie traiteur, sauf le plateau de jambon, le plateau de rosbif et la salade de pommes de terre, visibles sur la photo de la fiche Google. À remplacer par sa vraie carte (onglet « Menu » de sa fiche Google), avec les prix.
- **Aucun prix n'est affiché** : « Prix au kilo en boutique » / « Prix en boutique » / « Prix selon la taille » tant que `data/produits.json → price` vaut null.
- **Formules traiteur** : nombre minimum de personnes et prix « à partir de » vides → étiquette « Nombre de personnes sur devis » et « Prix sur devis ». À remplir dans `data/traiteur.json`.
- **Délai de commande** : 24 h (réglage `data/site.json → order.leadHours`). Devis : alerte si l'événement est à moins de 7 jours.
- **Dates limites des fêtes** : Noël le 19 décembre, Saint-Sylvestre le 27 décembre, Pâques le 24 mars 2027. Proposées, à confirmer (`data/saisons.json`, `data/annonces.json`).
- **Livraison** : le site ne promet rien ; le devis propose « Livraison (à voir ensemble) ».
- **Plat du jour** : vide pour l'instant ; le site invite à appeler. À remplir dans `data/plat-du-jour.json` (au jour ou à la semaine).
- **Logo** : logo typographique provisoire (cochon au trait). À remplacer si l'enseigne a un vrai logo.

## Horaires (data/horaires.json)

- Lundi : 09:00 – 13:30 et 15:00 – 20:00
- Mardi : 08:00 – 13:30 et 15:00 – 20:00
- Mercredi : 08:00 – 13:30 et 15:00 – 20:00
- Jeudi : 08:00 – 13:30 et 15:00 – 20:00
- Vendredi : 08:00 – 13:30 et 15:00 – 20:00
- Samedi : 08:00 – 18:00
- Dimanche : fermé

## Produits (data/produits.json)

| Rayon | Produit (FR) | EN | Description | Prix | Disponibilité |
|---|---|---|---|---|---|
| Charcuterie maison | Pâté en croûte | Pâté en croûte | Farce maison, pâte dorée au four. | à donner | en boutique |
| Charcuterie maison | Terrine de campagne | Country terrine | La terrine de toujours, à la coupe. | à donner | en boutique |
| Charcuterie maison | Rillettes | Rillettes | Cuites longuement, effilochées à la main. | à donner | en boutique |
| Charcuterie maison | Jambon blanc | Cooked ham | Tranché devant vous, fin ou épais. | à donner | en boutique |
| Charcuterie maison | Saucisson sec | Dry sausage | À la pièce. | à donner | en boutique |
| Charcuterie maison | Boudin noir | Black pudding | À poêler, avec des pommes. | à donner | en boutique |
| Charcuterie maison | Saucisses fraîches | Fresh sausages | Pour la poêle ou le barbecue. | à donner | en boutique |
| Plats cuisinés | Hachis parmentier | Hachis parmentier | À la part, à réchauffer au four. | à donner | en boutique |
| Plats cuisinés | Choucroute garnie | Choucroute garnie | À la part. | à donner | en boutique |
| Plats cuisinés | Blanquette de veau | Veal blanquette | À la part, avec son riz. | à donner | en boutique |
| Plats cuisinés | Lasagnes | Lasagne | À la part. | à donner | en boutique |
| Salades & entrées | Salade de pommes de terre | Potato salad | Persil, échalote, vinaigrette maison. | à donner | en boutique |
| Salades & entrées | Céleri rémoulade | Celeriac rémoulade | Mayonnaise moutardée maison. | à donner | en boutique |
| Salades & entrées | Salade piémontaise | Piémontaise salad | Pommes de terre, jambon, œuf, cornichons. | à donner | en boutique |
| Salades & entrées | Carottes râpées | Grated carrots | Citron et huile d'olive. | à donner | en boutique |
| Plateaux | Plateau de jambon | Ham platter | Tranches roulées et garnies, sur lit de salade. | à donner | sur commande |
| Plateaux | Plateau de rosbif | Roast beef platter | Rosbif rosé tranché, tomates et poivrons. | à donner | sur commande |
| Plateaux | Plateau de charcuterie | Charcuterie platter | Terrines, jambon, saucisson : à partager. | à donner | sur commande |

## Formules traiteur (data/traiteur.json)

- **Buffet froid** — Plateaux de charcuterie, viandes froides tranchées, salades composées : un buffet généreux, prêt à servir. · minimum : à donner pers. · prix : à donner €/pers.
- **Cocktail** — Pièces salées et verrines à picorer debout, pour un vin d'honneur ou une inauguration. · minimum : à donner pers. · prix : à donner €/pers.
- **Repas de famille** — Entrées, plat chaud et accompagnements pour les baptêmes, communions et anniversaires à la maison. · minimum : à donner pers. · prix : à donner €/pers.
- **Entreprise** — Plateaux-repas, buffets de réunion et pots de départ, préparés pour l'heure qui vous convient. · minimum : à donner pers. · prix : à donner €/pers.

## Fêtes (data/saisons.json)

- Noël : visible du 2026-11-01 au 2026-12-24, commandes jusqu'au 2026-12-19
- Saint-Sylvestre : visible du 2026-11-01 au 2026-12-31, commandes jusqu'au 2026-12-27
- Pâques : visible du 2027-02-01 au 2027-03-28, commandes jusqu'au 2027-03-24
- Noël : visible du 2027-11-01 au 2027-12-24, commandes jusqu'au 2027-12-19
- Saint-Sylvestre : visible du 2027-11-01 au 2027-12-31, commandes jusqu'au 2027-12-27

## Tous les textes


### meta

| Clé | Français | English |
|---|---|---|
| title | Charcuterie traiteur à Amiens Henriville \| Maison Bréelle | Charcuterie & caterer in Amiens Henriville \| Maison Bréelle |
| description | Maison Bréelle, charcuterie traiteur rue Gaulthier de Rumilly à Amiens (Henriville) : charcuterie maison, plats cuisinés, salades, plateaux et buffets. Commande à retirer et devis traiteur. | Maison Bréelle, a charcuterie and caterer on rue Gaulthier de Rumilly in Amiens (Henriville): homemade charcuterie, ready meals, salads, platters and buffets. Click & collect and catering quotes. |
| ogAlt | Maison Bréelle, charcuterie traiteur à Amiens : plateaux de jambon et de rosbif | Maison Bréelle, charcuterie and caterer in Amiens: ham and roast beef platters |
| legalTitle | Mentions légales \| Maison Bréelle | Legal notice \| Maison Bréelle |
| cateringTitle | Traiteur à Amiens : buffets et plateaux \| Maison Bréelle | Caterer in Amiens: buffets and platters \| Maison Bréelle |
| cateringDescription | Buffets froids, cocktails, repas de famille et plateaux pour les entreprises, préparés à la charcuterie Maison Bréelle à Amiens Henriville. Demandez votre devis traiteur. | Cold buffets, cocktail receptions, family meals and office platters, made at the Maison Bréelle charcuterie in Amiens Henriville. Ask for your catering quote. |

### intro

| Clé | Français | English |
|---|---|---|
| skip | Passer | Skip |

### nav

| Clé | Français | English |
|---|---|---|
| skip | Aller au contenu | Skip to content |
| home | Maison Bréelle, accueil | Maison Bréelle, home |
| menu | Menu | Menu |
| close | Fermer le menu | Close menu |
| lang | Langue | Language |
| call | Appeler | Call |
| boutique | La boutique | The shop |
| traiteur | Le traiteur | Catering |
| dish | Plat du jour | Dish of the day |
| fetes | Fêtes | Holidays |
| infos | Infos | Visit |
| orderCta | Commander | Order |
| quoteCta | Devis traiteur | Catering quote |

### announce

| Clé | Français | English |
|---|---|---|
| close | Fermer le bandeau | Close the banner |

### hero

| Clé | Français | English |
|---|---|---|
| eyebrow | Charcuterie · Traiteur · Henriville, Amiens | Charcuterie · Caterer · Henriville, Amiens |
| title | Le goût du fait maison, au coin de la rue | Homemade flavour, just around the corner |
| sub | Pâtés, jambons, plats cuisinés et plateaux préparés sur place par Olivier et Cindy Bréelle. Commandez la veille, on vous le prépare pour l'heure qui vous arrange. | Pâtés, hams, ready meals and platters made on site by Olivier and Cindy Bréelle. Order the day before and we will have it ready at the time that suits you. |
| ctaOrder | Commander à retirer | Order for pick-up |
| ctaQuote | Demander un devis | Ask for a quote |
| rating | {value}/5 sur Google | {value}/5 on Google |
| ratingCount | {count} avis | {count} reviews |
| ratingNote | Note Google relevée le {date} | Google rating checked on {date} |

### tiles

| Clé | Français | English |
|---|---|---|
| title | Nos rayons | Our counters |
| items.charcuterie | Charcuterie maison | Homemade charcuterie |
| items.plats | Plats cuisinés | Ready meals |
| items.salades | Salades & entrées | Salads & starters |
| items.plateaux | Plateaux & buffets | Platters & buffets |
| items.fetes | Les fêtes | Holidays |

### services

| Clé | Français | English |
|---|---|---|
| title | Nos services | Our services |
| items.pickup.title | Commande à retirer | Click & collect |
| items.pickup.text | 24 h à l'avance, prête à l'heure choisie. | 24 hours ahead, ready at the time you choose. |
| items.catering.title | Traiteur événements | Event catering |
| items.catering.text | Buffets, cocktails, repas de famille, entreprises. | Buffets, receptions, family meals, businesses. |
| items.dish.title | Plat du jour | Dish of the day |
| items.dish.text | Un plat maison chaque midi, à emporter. | A homemade dish every lunchtime, to take away. |
| items.phone.title | 03 22 45 11 18 | +33 3 22 45 11 18 |
| items.phone.text | Une question, une commande : appelez-nous. | A question or an order: give us a call. |

### categories

| Clé | Français | English |
|---|---|---|
| charcuterie | Charcuterie maison | Homemade charcuterie |
| plats | Plats cuisinés | Ready meals |
| salades | Salades & entrées | Salads & starters |
| plateaux | Plateaux | Platters |

### shop

| Clé | Français | English |
|---|---|---|
| eyebrow | La boutique | The shop |
| title | Tout est fait ici, derrière le comptoir | Everything is made here, behind the counter |
| lead | Une charcuterie de quartier, comme on les aime : les terrines du moment, le jambon tranché à la demande, les plats qui mijotent et les salades du jour. | A neighbourhood charcuterie the way we like them: seasonal terrines, ham sliced to order, slow-cooked dishes and the salads of the day. |
| all | Tout | All |
| filter | Filtrer par rayon | Filter by counter |
| shop | En boutique | In store |
| order | Sur commande | To order |
| priceKg | Prix au kilo en boutique | Price per kilo in store |
| pricePiece | Prix en boutique | Price in store |
| priceOrder | Prix selon la taille | Price depends on size |
| from | À partir de | From |
| perKg | le kg | per kg |
| perPiece | la pièce | each |
| add | Ajouter | Add |
| addLabel | Ajouter {name} à ma commande | Add {name} to my order |
| checked | Sélection indicative au {date}. La vitrine change avec les saisons : demandez-nous ce qui vous ferait plaisir. | Indicative selection as of {date}. The counter changes with the seasons: just ask us for what you fancy. |

### dish

| Clé | Français | English |
|---|---|---|
| eyebrow | Chaque midi | Every lunchtime |
| title | Le plat du jour | Dish of the day |
| today | Aujourd'hui, {day} | Today, {day} |
| price | {price} la part | {price} per portion |
| none | Le plat du jour change chaque matin | The dish of the day changes every morning |
| noneText | Il est affiché en vitrine dès l'ouverture. Pour le connaître ou mettre une part de côté, un simple appel suffit. | It goes up in the window as soon as we open. To find out what it is or to put a portion aside, just give us a call. |
| order | Réserver une part | Reserve a portion |
| call | Demander le plat du jour | Ask for today's dish |
| closedDay | La boutique est fermée aujourd'hui. Le plat du jour revient à la réouverture. | The shop is closed today. The dish of the day returns when we reopen. |

### catering

| Clé | Français | English |
|---|---|---|
| eyebrow | Le traiteur | Catering |
| title | Pour vos événements, petits et grands | For your events, large and small |
| lead | Un anniversaire, une communion, un pot de départ ou un repas d'équipe : dites-nous la date, le nombre d'invités et votre budget, nous vous proposons une formule sur mesure. | A birthday, a first communion, a leaving do or a team lunch: tell us the date, the number of guests and your budget, and we will suggest a menu made to measure. |
| minGuests | Dès {n} personnes | From {n} guests |
| onQuote | Nombre de personnes sur devis | Number of guests on request |
| from | À partir de {price} par personne | From {price} per guest |
| priceQuote | Prix sur devis | Price on request |
| cta | Demander un devis | Ask for a quote |
| ctaLabel | Demander un devis : {name} | Ask for a quote: {name} |
| more | Découvrir le traiteur | Discover our catering |
| items.buffet.name | Buffet froid | Cold buffet |
| items.buffet.text | Plateaux de charcuterie, viandes froides tranchées, salades composées : un buffet généreux, prêt à servir. | Charcuterie platters, sliced cold meats and mixed salads: a generous buffet, ready to serve. |
| items.cocktail.name | Cocktail | Cocktail reception |
| items.cocktail.text | Pièces salées et verrines à picorer debout, pour un vin d'honneur ou une inauguration. | Savoury bites and verrines to enjoy standing up, for a reception or an opening. |
| items.famille.name | Repas de famille | Family meal |
| items.famille.text | Entrées, plat chaud et accompagnements pour les baptêmes, communions et anniversaires à la maison. | Starters, a hot main course and sides for christenings, communions and birthdays at home. |
| items.entreprise.name | Entreprise | Business |
| items.entreprise.text | Plateaux-repas, buffets de réunion et pots de départ, préparés pour l'heure qui vous convient. | Meal trays, meeting buffets and leaving dos, ready at the time that suits you. |

### seasons

| Clé | Français | English |
|---|---|---|
| eyebrow | Les fêtes | Holidays |
| title | Les fêtes se préparent à l'avance | Holidays are prepared in advance |
| lead | Pour les grandes tablées, les commandes se font quelques jours avant. Passez-les en ligne ou en boutique, nous vous confirmons tout par téléphone. | For big tables, orders are placed a few days ahead. Order online or in store and we will confirm everything by phone. |
| deadline | Commandes jusqu'au {date} | Orders until {date} |
| past | Commandes closes, demandez en boutique | Orders closed, ask in store |
| next | Prochainement | Coming up |
| order | Commander pour {name} | Order for {name} |
| items.noel.title | Noël | Christmas |
| items.noel.text | Pâté en croûte, terrines de fête, plateaux et plats chauds à réchauffer pour le réveillon et le déjeuner du 25. | Pâté en croûte, festive terrines, platters and hot dishes to reheat for Christmas Eve and Christmas lunch. |
| items.nouvelAn.title | Saint-Sylvestre | New Year's Eve |
| items.nouvelAn.text | Buffets et plateaux pour recevoir sans passer la soirée en cuisine. | Buffets and platters, so you can host without spending the evening in the kitchen. |
| items.paques.title | Pâques | Easter |
| items.paques.text | Le repas du dimanche de Pâques, de l'entrée au plat, à retirer la veille. | Easter Sunday lunch, from starter to main course, to collect the day before. |

### house

| Clé | Français | English |
|---|---|---|
| eyebrow | La maison | The house |
| title | Olivier et Cindy Bréelle, charcutiers traiteurs à Henriville | Olivier and Cindy Bréelle, charcutiers and caterers in Henriville |
| p1 | Au 11 rue Gaulthier de Rumilly, la Maison Bréelle fait vivre une charcuterie de quartier comme il en reste peu : ici, tout ce qui passe en vitrine est préparé dans le laboratoire de la boutique. | At 11 rue Gaulthier de Rumilly, Maison Bréelle keeps alive the kind of neighbourhood charcuterie that has become rare: everything in the window is prepared in the shop's own kitchen. |
| p2 | Les clients du quartier viennent pour le jambon tranché à la demande, les terrines et les plats du jour. Ils reviennent pour la qualité et pour des prix qui restent raisonnables. | Locals come for ham sliced to order, terrines and the dish of the day. They come back for the quality and for prices that stay reasonable. |
| p3 | Leur histoire en détail arrive bientôt sur cette page. | Their full story is coming to this page soon. |
| facts.home.title | Fait maison | Homemade |
| facts.home.text | Charcuterie, plats et salades préparés sur place. | Charcuterie, dishes and salads made on site. |
| facts.district.title | Henriville | Henriville |
| facts.district.text | Une boutique de quartier, à deux pas du centre d'Amiens. | A neighbourhood shop, a short walk from central Amiens. |
| facts.rating.title | {value}/5 | {value}/5 |
| facts.rating.text | Sur {count} avis Google : la qualité et les prix reviennent souvent. | From {count} Google reviews: quality and prices come up again and again. |

### status

| Clé | Français | English |
|---|---|---|
| open | Ouvert maintenant | Open now |
| closed | Fermé | Closed |
| until | jusqu'à {time} | until {time} |
| opens | ouvre {day} à {time} | opens {day} at {time} |
| today | aujourd'hui | today |
| tomorrow | demain | tomorrow |

### infos

| Clé | Français | English |
|---|---|---|
| eyebrow | Infos pratiques | Visit us |
| title | Venir à la boutique | Coming to the shop |
| address | Adresse | Address |
| directions | Itinéraire | Directions |
| phone | Téléphone | Phone |
| email | E-mail | Email |
| access | Accès | Getting here |
| accessText | Quartier Henriville, au sud du centre-ville. Stationnement dans la rue et les rues voisines. | Henriville district, south of the city centre. Street parking on this and nearby streets. |
| hours | Horaires | Opening hours |
| lunch | En semaine, la boutique ferme de 13 h 30 à 15 h. | On weekdays, the shop closes from 1.30 to 3 pm. |
| days.0 | Lundi | Monday |
| days.1 | Mardi | Tuesday |
| days.2 | Mercredi | Wednesday |
| days.3 | Jeudi | Thursday |
| days.4 | Vendredi | Friday |
| days.5 | Samedi | Saturday |
| days.6 | Dimanche | Sunday |
| closed | Fermé | Closed |
| mapTitle | Plan d'accès à la Maison Bréelle, 11 rue Gaulthier de Rumilly à Amiens | Map to Maison Bréelle, 11 rue Gaulthier de Rumilly, Amiens |

### faq

| Clé | Français | English |
|---|---|---|
| eyebrow | Questions fréquentes | FAQ |
| title | Bon à savoir | Good to know |
| items.0.q | Combien de temps à l'avance faut-il commander ? | How far ahead should I order? |
| items.0.a | Pour une commande à retirer, 24 heures suffisent : choisissez le jour et l'heure dans le formulaire. Pour un buffet ou un repas de groupe, comptez au moins une semaine, davantage pendant les fêtes. | For click & collect, 24 hours is enough: choose the day and time in the form. For a buffet or a group meal, allow at least a week, more during the holidays. |
| items.1.q | Comment connaître les allergènes ? | How can I find out about allergens? |
| items.1.a | Tous nos produits sont faits sur place : nous connaissons chaque recette. Demandez-nous au comptoir ou par téléphone, nous vous indiquons les allergènes présents (gluten, lait, œuf, moutarde, céleri…). | Everything is made on site, so we know every recipe. Ask us at the counter or by phone and we will tell you which allergens are present (gluten, milk, egg, mustard, celery…). |
| items.2.q | Comment conserver la charcuterie et les plats ? | How should I store charcuterie and ready meals? |
| items.2.a | Au réfrigérateur, entre 0 et 4 °C. La charcuterie tranchée et les salades se dégustent dans les deux à trois jours ; les plats cuisinés se réchauffent au four ou au micro-ondes. Au moindre doute, demandez-nous au comptoir. | In the fridge, between 0 and 4 °C. Sliced charcuterie and salads are best eaten within two to three days; ready meals reheat in the oven or microwave. If in doubt, ask us at the counter. |
| items.3.q | Comment se passe le paiement ? | How do I pay? |
| items.3.a | Vous réglez en boutique, au moment du retrait. Il n'y a aucun paiement en ligne. Pour les buffets et les grosses commandes, un acompte peut vous être demandé. | You pay in store when you collect. There is no online payment. For buffets and large orders, a deposit may be requested. |
| items.4.q | Livrez-vous ? | Do you deliver? |
| items.4.a | Les commandes se retirent en boutique. Pour les prestations traiteur, parlez-nous de votre lieu dans la demande de devis : nous vous dirons ce qui est possible. | Orders are collected from the shop. For catering, tell us about your venue in the quote request and we will let you know what is possible. |
| items.5.q | Puis-je modifier ou annuler ma commande ? | Can I change or cancel my order? |
| items.5.a | Oui, appelez-nous au 03 22 45 11 18 le plus tôt possible, au plus tard la veille du retrait. | Yes, call us on +33 3 22 45 11 18 as early as possible, at the latest the day before collection. |

### order

| Clé | Français | English |
|---|---|---|
| eyebrow | Commande à retirer | Click & collect |
| title | Commandez, nous préparons | You order, we prepare |
| lead | Choisissez vos produits, le jour et l'heure de retrait. Nous vous confirmons la commande par téléphone ou par e-mail. Vous réglez en boutique. | Choose your products and a collection day and time. We confirm the order by phone or email. You pay in store. |
| callInstead | Vous préférez commander de vive voix ? | Would you rather order by phone? |
| productsTitle | Vos produits | Your products |
| product | Produit | Product |
| quantity | Quantité | Quantity |
| unit | Unité | Unit |
| units.kg | kg | kg |
| units.piece | pièce | piece |
| units.pieces | pièces | pieces |
| cut | Tranchage | Slicing |
| cuts.asIs | Tel quel | As is |
| cuts.thin | En tranches fines | Thinly sliced |
| cuts.thick | En tranches épaisses | Thickly sliced |
| cuts.other | Autre (préciser) | Other (please specify) |
| detail | Précision | Details |
| detailPh | Ex. 8 tranches, pour 6 personnes… | E.g. 8 slices, for 6 people… |
| other | Autre produit | Other product |
| otherPh | Ce que vous souhaitez | What you would like |
| dishOption | Plat du jour (à la part) | Dish of the day (per portion) |
| addLine | Ajouter un produit | Add a product |
| removeLine | Retirer ce produit | Remove this product |
| pickupTitle | Retrait en boutique | Collection in store |
| pickupLead | Au plus tôt {hours} h après votre commande, pendant les heures d'ouverture. | At the earliest {hours} hours after ordering, during opening hours. |
| date | Jour | Day |
| time | Heure | Time |
| timePh | Choisir l'heure | Choose a time |
| required | obligatoire | required |
| contactTitle | Vos coordonnées | Your details |
| name | Nom | Name |
| phone | Téléphone | Phone |
| email | E-mail (facultatif) | Email (optional) |
| emailHint | Pour recevoir le récapitulatif de votre commande. | To receive a summary of your order. |
| message | Message (facultatif) | Message (optional) |
| messagePh | Une allergie, une demande particulière… | An allergy, a special request… |
| submit | Envoyer ma commande | Send my order |
| sending | Envoi… | Sending… |
| payNote | Paiement en boutique au retrait. Aucun paiement en ligne. | Payment in store on collection. No online payment. |
| whatsapp | Envoyer aussi sur WhatsApp | Also send on WhatsApp |
| errors.lines | Vérifiez les quantités, et précisez le produit si vous avez choisi « Autre ». | Check the quantities, and describe the product if you chose “Other”. |
| errors.date | Choisissez un jour de retrait. | Choose a collection day. |
| errors.time | Choisissez une heure de retrait. | Choose a collection time. |
| errors.name | Indiquez votre nom. | Please enter your name. |
| errors.phone | Indiquez un numéro de téléphone valide. | Please enter a valid phone number. |
| errors.email | Cette adresse e-mail ne semble pas valide. | This email address does not look valid. |
| errors.send | La commande n'a pas pu partir. Réessayez, ou appelez-nous directement. | Your order could not be sent. Please try again, or call us directly. |
| done.title | Merci, votre commande est envoyée | Thank you, your order has been sent |
| done.text | Nous la préparons et vous rappelons si une précision est nécessaire. | We are preparing it and will call you if we need any details. |
| done.pendingTitle | Commande notée, merci d'appeler pour la confirmer | Order noted: please call to confirm it |
| done.pendingText | Votre demande est bien prise en compte sur ce site, mais pour être sûr qu'elle soit prête, appelez-nous en indiquant votre nom. | Your request has been recorded on this site, but to make sure it is ready, please call us and give your name. |
| done.mail | Un récapitulatif a été envoyé à {email}. | A summary has been sent to {email}. |
| done.again | Passer une autre commande | Place another order |
| mail.subject | Commande à retirer | Click & collect order |
| mail.title | Nouvelle commande à retirer | New click & collect order |
| mail.lines | Produits | Products |
| mail.pickup | Retrait | Collection |
| mail.name | Nom | Name |
| mail.phone | Téléphone | Phone |
| mail.email | E-mail | Email |
| mail.message | Message | Message |
| mail.lang | Langue du client | Customer language |
| mail.confirmSubject | Votre commande à la Maison Bréelle | Your order at Maison Bréelle |
| mail.confirmIntro | Bonjour {name},  Merci pour votre commande. En voici le récapitulatif : | Hello {name},  Thank you for your order. Here is a summary: |
| mail.confirmOutro | Le paiement se fait en boutique au retrait. Pour toute modification, appelez-nous au 03 22 45 11 18.  À bientôt, Olivier et Cindy Bréelle | Payment is made in store on collection. To change anything, call us on +33 3 22 45 11 18.  See you soon, Olivier and Cindy Bréelle |

### quote

| Clé | Français | English |
|---|---|---|
| eyebrow | Devis traiteur | Catering quote |
| title | Parlez-nous de votre événement | Tell us about your event |
| lead | Quelques informations suffisent. Nous revenons vers vous avec une proposition et un prix, sans engagement. | A few details are enough. We will come back to you with a proposal and a price, with no obligation. |
| eventTitle | Votre événement | Your event |
| event | Type d'événement | Type of event |
| events.buffet | Buffet | Buffet |
| events.cocktail | Cocktail | Cocktail reception |
| events.famille | Repas de famille | Family meal |
| events.entreprise | Entreprise | Business |
| events.other | Autre | Other |
| date | Date | Date |
| guests | Nombre de personnes | Number of guests |
| formula | Formule souhaitée | Preferred option |
| unsure | Je ne sais pas encore | Not sure yet |
| budget | Budget par personne | Budget per guest |
| budgets.lt15 | Moins de 15 € | Under €15 |
| budgets.15to25 | 15 à 25 € | €15 to €25 |
| budgets.25to40 | 25 à 40 € | €25 to €40 |
| budgets.gt40 | Plus de 40 € | Over €40 |
| budgets.unsure | À définir ensemble | To be discussed |
| mode | Retrait ou livraison | Collection or delivery |
| modes.pickup | Retrait en boutique | Collection in store |
| modes.delivery | Livraison (à voir ensemble) | Delivery (to be discussed) |
| address | Lieu de l'événement | Event venue |
| addressPh | Adresse ou commune | Address or town |
| contactTitle | Vos coordonnées | Your details |
| name | Nom | Name |
| phone | Téléphone | Phone |
| email | E-mail | Email |
| message | Message (facultatif) | Message (optional) |
| messagePh | Vos envies, un régime particulier, l'heure de service… | Your wishes, a special diet, serving time… |
| submit | Envoyer ma demande de devis | Send my quote request |
| sending | Envoi… | Sending… |
| note | Devis gratuit et sans engagement. Nous vous répondons par téléphone ou par e-mail. | Free quote, no obligation. We will reply by phone or email. |
| errors.event | Choisissez le type d'événement. | Choose the type of event. |
| errors.date | Indiquez la date de l'événement. | Enter the date of the event. |
| errors.guests | Indiquez le nombre de personnes. | Enter the number of guests. |
| errors.name | Indiquez votre nom. | Please enter your name. |
| errors.phone | Indiquez un numéro de téléphone valide. | Please enter a valid phone number. |
| errors.email | Indiquez une adresse e-mail valide pour recevoir le devis. | Please enter a valid email address to receive the quote. |
| errors.send | La demande n'a pas pu partir. Réessayez, ou appelez-nous directement. | Your request could not be sent. Please try again, or call us directly. |
| soon | Moins de {days} jours avant l'événement : appelez-nous pour vérifier que c'est possible. | Less than {days} days before the event: please call us to check it is possible. |
| done.title | Merci, votre demande est envoyée | Thank you, your request has been sent |
| done.text | Nous étudions votre demande et revenons vers vous avec une proposition. | We are looking at your request and will come back to you with a proposal. |
| done.pendingTitle | Demande notée, merci d'appeler pour la confirmer | Request noted: please call to confirm it |
| done.pendingText | Votre demande est bien enregistrée sur ce site. Pour être sûr qu'elle nous parvienne, appelez-nous en indiquant votre nom. | Your request has been recorded on this site. To make sure it reaches us, please call and give your name. |
| done.mail | Une copie a été envoyée à {email}. | A copy has been sent to {email}. |
| done.again | Faire une autre demande | Make another request |
| mail.subject | Demande de devis traiteur | Catering quote request |
| mail.title | Nouvelle demande de devis traiteur | New catering quote request |
| mail.lang | Langue du client | Customer language |
| mail.confirmSubject | Votre demande de devis à la Maison Bréelle | Your quote request at Maison Bréelle |
| mail.confirmIntro | Bonjour {name},  Merci pour votre demande. Nous l'avons bien reçue : | Hello {name},  Thank you for your request. We have received it: |
| mail.confirmOutro | Nous revenons vers vous rapidement avec une proposition. Pour toute question : 03 22 45 11 18.  À bientôt, Olivier et Cindy Bréelle | We will come back to you shortly with a proposal. Any questions: +33 3 22 45 11 18.  See you soon, Olivier and Cindy Bréelle |

### cateringPage

| Clé | Français | English |
|---|---|---|
| eyebrow | Traiteur à Amiens | Caterer in Amiens |
| title | Traiteur à Amiens : buffets et plateaux | Caterer in Amiens: buffets and platters |
| lead | Depuis leur charcuterie d'Henriville, Olivier et Cindy Bréelle préparent les buffets, cocktails et repas de famille des Amiénois. Le même fait maison qu'en boutique, à l'échelle de votre événement. | From their charcuterie in Henriville, Olivier and Cindy Bréelle cater buffets, receptions and family meals across Amiens. The same homemade food as in the shop, scaled to your event. |
| formulasTitle | Nos formules | Our options |
| howTitle | Comment ça se passe | How it works |
| steps.0.t | Votre demande | Your request |
| steps.0.x | Date, nombre d'invités, budget : remplissez le formulaire ou appelez-nous. | Date, number of guests, budget: fill in the form or give us a call. |
| steps.1.t | Notre proposition | Our proposal |
| steps.1.x | Nous vous envoyons un menu et un prix. On ajuste ensemble si besoin. | We send you a menu and a price, and adjust it with you if needed. |
| steps.2.t | Le jour J | On the day |
| steps.2.x | Vous retirez tout en boutique, prêt à servir, à l'heure convenue. | You collect everything from the shop, ready to serve, at the agreed time. |
| faqTitle | Questions sur le traiteur | Catering questions |
| faq.0.q | Combien de temps avant l'événement faut-il réserver ? | How long before the event should I book? |
| faq.0.a | Idéalement deux à trois semaines, au moins une semaine. Pendant les fêtes de fin d'année, réservez le plus tôt possible. | Ideally two to three weeks, at least one week. Around Christmas and New Year, book as early as you can. |
| faq.1.q | Pouvez-vous adapter le menu (sans porc, végétarien, allergies) ? | Can you adapt the menu (no pork, vegetarian, allergies)? |
| faq.1.a | Dites-le dans votre demande : nous adaptons la proposition autant que possible et vous indiquons les allergènes de chaque préparation. | Mention it in your request: we adapt the proposal as far as possible and tell you the allergens in each dish. |
| faq.2.q | La vaisselle est-elle fournie ? | Do you provide tableware? |
| faq.2.a | Les plateaux sont présentés prêts à servir. Pour le reste (assiettes, nappes, service), précisez vos besoins dans la demande. | Platters come ready to serve. For anything else (plates, tablecloths, service), tell us what you need in your request. |
| faq.3.q | Faut-il verser un acompte ? | Is a deposit required? |
| faq.3.a | Pour les prestations importantes, un acompte peut être demandé à la confirmation. Le solde se règle en boutique. | For larger events, a deposit may be requested on confirmation. The balance is paid in store. |
| back | Retour à la boutique | Back to the shop |

### footer

| Clé | Français | English |
|---|---|---|
| tagline | Charcuterie traiteur de quartier à Henriville, Amiens. Tout est fait maison. | Neighbourhood charcuterie and caterer in Henriville, Amiens. Everything is homemade. |
| rights | Maison Bréelle – Charcuterie Traiteur | Maison Bréelle – Charcuterie Traiteur |
| legal | Mentions légales | Legal notice |
| catering | Traiteur à Amiens | Caterer in Amiens |

### pages

| Clé | Français | English |
|---|---|---|
| legal.title | Mentions légales | Legal notice |
| legal.pending | à compléter | to be completed |
| legal.editor | Éditeur du site | Publisher |
| legal.editorText | Maison Bréelle – Charcuterie Traiteur, 11 rue Gaulthier de Rumilly, 80000 Amiens. Téléphone : 03 22 45 11 18. | Maison Bréelle – Charcuterie Traiteur, 11 rue Gaulthier de Rumilly, 80000 Amiens, France. Phone: +33 3 22 45 11 18. |
| legal.company | Raison sociale | Company name |
| legal.siret | SIRET | SIRET |
| legal.host | Hébergeur | Hosting |
| legal.data | Données personnelles | Personal data |
| legal.dataText | Les informations saisies dans les formulaires de commande et de devis servent uniquement à traiter votre demande. Elles sont transmises par e-mail à la boutique et ne sont ni conservées sur le site, ni cédées à des tiers. Vous pouvez demander leur suppression en appelant la boutique. | Information entered in the order and quote forms is used only to handle your request. It is emailed to the shop and is neither stored on the site nor passed on to third parties. You can ask for it to be deleted by calling the shop. |
| legal.cookies | Cookies | Cookies |
| legal.cookiesText | Le site n'utilise ni cookie publicitaire ni outil de mesure d'audience. Seul votre choix de langue est mémorisé. La carte d'accès est fournie par Google Maps. | This site uses no advertising cookies and no audience measurement. Only your language choice is remembered. The access map is provided by Google Maps. |
| legal.photos | Photographies | Photographs |
| legal.photosText | Photographies : Maison Bréelle. Toute reproduction est interdite sans autorisation. | Photographs: Maison Bréelle. Reproduction is forbidden without permission. |

### alt

| Clé | Français | English |
|---|---|---|
| hero/plateaux-charcuterie | Deux plateaux préparés par la Maison Bréelle : jambon blanc roulé et rosbif tranché, garnis de poivrons, olives et salade | Two platters prepared by Maison Bréelle: rolled cooked ham and sliced roast beef, garnished with peppers, olives and lettuce |
| traiteur/plateau-jambon | Plateau de jambon blanc tranché, garni de poivrons, d'olives noires et de salade frisée | Platter of sliced cooked ham garnished with peppers, black olives and curly lettuce |
| traiteur/plateau-rosbif | Plateau de rosbif rosé tranché avec tomates, poivrons et olives | Platter of pink sliced roast beef with tomatoes, peppers and olives |
| plats/salade-pommes-de-terre | Salade de pommes de terre au persil, servie dans un plat blanc | Potato salad with parsley, served in a white dish |
