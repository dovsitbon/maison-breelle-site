// Génère CONTENU.md : tous les textes du site en français et en anglais, les produits, les formules et les fêtes, pour validation.
//   npm run contenu
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const read = async (f) => JSON.parse(await readFile(path.join(ROOT, f), "utf8"));
const [fr, en, produits, site, saisons, traiteur, horaires] = await Promise.all(["locales/fr.json", "locales/en.json", "data/produits.json", "data/site.json", "data/saisons.json", "data/traiteur.json", "data/horaires.json"].map(read));

const get = (o, p) => p.reduce((x, k) => (x == null ? x : x[k]), o);
const cell = (s) => String(s ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
const out = [];
const p = (s = "") => out.push(s);

p("# Maison Bréelle – contenu du site (à valider)");
p();
p("Généré depuis `locales/fr.json` et `locales/en.json`. Pour modifier un texte, modifiez ces fichiers puis relancez `npm run contenu`.");
p();
p("## À faire valider en priorité");
p();
p("- **Faits utilisés** : la maison est tenue par **Olivier et Cindy Bréelle**, « uniquement des produits maison » (vidéo Amiens Connect, novembre 2018). Rien d'autre n'a été affirmé sur leur histoire : date de création, parcours, distinctions éventuelles sont à demander.");
p(`- **Note Google** : ${site.rating.value}/5 sur ${site.rating.count} avis, relevée le ${site.rating.checked}. Les thèmes des avis (qualité, prix) sont repris sans citer d'avis.`);
p("- **Les produits** ci-dessous sont une **liste indicative** de charcuterie traiteur, sauf le plateau de jambon, le plateau de rosbif et la salade de pommes de terre, visibles sur la photo de la fiche Google. À remplacer par sa vraie carte (onglet « Menu » de sa fiche Google), avec les prix.");
p("- **Aucun prix n'est affiché** : « Prix au kilo en boutique » / « Prix en boutique » / « Prix selon la taille » tant que `data/produits.json → price` vaut null.");
p("- **Formules traiteur** : nombre minimum de personnes et prix « à partir de » vides → étiquette « Nombre de personnes sur devis » et « Prix sur devis ». À remplir dans `data/traiteur.json`.");
p(`- **Délai de commande** : ${site.order.leadHours} h (réglage \`data/site.json → order.leadHours\`). Devis : alerte si l'événement est à moins de ${site.quote.minDays} jours.`);
p("- **Dates limites des fêtes** : Noël le 19 décembre, Saint-Sylvestre le 27 décembre, Pâques le 24 mars 2027. Proposées, à confirmer (`data/saisons.json`, `data/annonces.json`).");
p("- **Livraison** : le site ne promet rien ; le devis propose « Livraison (à voir ensemble) ».");
p("- **Plat du jour** : vide pour l'instant ; le site invite à appeler. À remplir dans `data/plat-du-jour.json` (au jour ou à la semaine).");
p("- **Logo** : logo typographique provisoire (cochon au trait). À remplacer si l'enseigne a un vrai logo.");
p();

p("## Horaires (data/horaires.json)");
p();
const days = fr.infos.days;
for (let i = 1; i <= 7; i++) {
  const s = horaires.week[String(i)];
  p(`- ${days[i - 1]} : ${s.length ? s.map(([a, b]) => `${a} – ${b}`).join(" et ") : "fermé"}`);
}
p();

p("## Produits (data/produits.json)");
p();
p("| Rayon | Produit (FR) | EN | Description | Prix | Disponibilité |");
p("|---|---|---|---|---|---|");
for (const c of produits.categories)
  for (const id of c.items) {
    const it = produits.items[id];
    const prix = it.price === null ? "à donner" : `${it.from ? "à partir de " : ""}${it.price.toFixed(2).replace(".", ",")} € ${it.unit === "kg" ? "le kg" : "la pièce"}`;
    p(`| ${fr.categories[c.id]} | ${cell(fr.products[id].name)} | ${cell(en.products[id].name)} | ${cell(fr.products[id].note)} | ${prix} | ${it.availability === "order" ? "sur commande" : "en boutique"} |`);
  }
p();
p("## Formules traiteur (data/traiteur.json)");
p();
for (const t of traiteur.items) p(`- **${fr.catering.items[t.id].name}** — ${fr.catering.items[t.id].text} · minimum : ${t.minGuests ?? "à donner"} pers. · prix : ${t.pricePerGuest ?? "à donner"} €/pers.`);
p();
p("## Fêtes (data/saisons.json)");
p();
for (const s of saisons.items) p(`- ${fr.seasons.items[s.id].title} : visible du ${s.show} au ${s.to}, commandes jusqu'au ${s.deadline}`);
p();

p("## Tous les textes");
p();
const walk = (o, pre = []) =>
  Object.entries(o).flatMap(([k, v]) => {
    const key = [...pre, k];
    if (typeof v === "string") return [key];
    if (Array.isArray(v)) return v.flatMap((x, i) => (typeof x === "string" ? [[...key, i]] : walk(x, [...key, i])));
    return walk(v, key);
  });
let section = "";
for (const key of walk(fr)) {
  if (key[0] === "products") continue;
  if (key[0] !== section) {
    section = key[0];
    p();
    p(`### ${section}`);
    p();
    p("| Clé | Français | English |");
    p("|---|---|---|");
  }
  p(`| ${key.slice(1).join(".")} | ${cell(get(fr, key))} | ${cell(get(en, key))} |`);
}
p();
await writeFile(path.join(ROOT, "CONTENU.md"), out.join("\n"));
console.log("CONTENU.md écrit");
