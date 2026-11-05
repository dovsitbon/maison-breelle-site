// Photos du site, en deux temps :
//  1. la photo de la fiche Google (assets/raw/maison-breelle_maps_01.jpg : deux plateaux et une salade de pommes de terre)
//     est recadrée une fois dans assets/<catégorie>/ ;
//  2. TOUT ce qui se trouve dans assets/hero, boutique, traiteur, plats, facade est préparé pour le web dans public/media/.
//   npm run media
//
// Ajouter une photo prise sur place : la déposer dans le bon dossier avec le nom attendu
// (voir assets/A-PHOTOGRAPHIER.md), relancer `npm run media`, puis redéployer. Le site la montre à la place
// de l'emplacement vide, sans toucher au code.
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const RAW = path.join(ROOT, "assets/raw/maison-breelle_maps_01.jpg");
const CATS = ["hero", "boutique", "traiteur", "plats", "facade"];

// [catégorie, nom, recadrage (x, y, l, h)]
const PICKS = [
  ["hero", "plateaux-charcuterie", { left: 0, top: 215, width: 1600, height: 560 }],
  ["traiteur", "plateau-jambon", { left: 0, top: 235, width: 790, height: 530 }],
  ["traiteur", "plateau-rosbif", { left: 860, top: 210, width: 740, height: 495 }],
  ["plats", "salade-pommes-de-terre", { left: 330, top: 660, width: 1150, height: 540 }],
];

for (const c of CATS) await mkdir(path.join(ROOT, "assets", c), { recursive: true });

if (existsSync(RAW))
  for (const [cat, name, crop] of PICKS) {
    const out = path.join(ROOT, "assets", cat, `${name}.jpg`);
    if (existsSync(out)) continue; // déjà classée (on ne réécrit pas une photo remplacée à la main)
    // Photo prise sous un éclairage chaud, sur nappe rose : on calme un peu la saturation
    await sharp(RAW).rotate().extract(crop).modulate({ saturation: 0.92, brightness: 1.02 }).jpeg({ quality: 92, mozjpeg: true }).toFile(out);
  }

// 2. Préparation web de tout ce qui est classé
const sizes = {};
for (const cat of CATS) {
  await mkdir(path.join(ROOT, "public/media", cat), { recursive: true });
  for (const f of (await readdir(path.join(ROOT, "assets", cat))).sort()) {
    if (!/\.(jpe?g|png|webp|avif|heic)$/i.test(f)) continue;
    const name = f.replace(/\.\w+$/, "").toLowerCase();
    const max = cat === "hero" ? 2200 : 1600;
    const info = await sharp(path.join(ROOT, "assets", cat, f))
      .rotate()
      .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(path.join(ROOT, "public/media", cat, `${name}.jpg`));
    sizes[`${cat}/${name}`] = [info.width, info.height];
  }
}

// Image de partage (Open Graph) 1200 × 630 : le nom à gauche sur crème, la photo du hero à droite
const heroDir = path.join(ROOT, "assets/hero");
const heroFile = path.join(heroDir, (await readdir(heroDir)).find((f) => /\.(jpe?g|png|webp)$/i.test(f)));
const photo = await sharp(heroFile).rotate().resize({ width: 620, height: 630, fit: "cover" }).toBuffer();
const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="580" height="630">
  <rect x="48" y="170" width="484" height="290" fill="none" stroke="#B8955A" stroke-width="1.5"/>
  <rect x="58" y="180" width="464" height="270" fill="none" stroke="#B8955A" stroke-opacity=".5" stroke-width="1"/>
  <text x="290" y="290" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="50" letter-spacing="5" fill="#6A1F25">MAISON BRÉELLE</text>
  <rect x="262" y="318" width="56" height="1.5" fill="#B8955A"/>
  <text x="290" y="362" text-anchor="middle" font-family="Arial, sans-serif" font-size="17" letter-spacing="5" fill="#1B1816">CHARCUTERIE · TRAITEUR · AMIENS</text>
  <text x="290" y="402" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" letter-spacing="1.5" fill="#4B443E">11 rue Gaulthier de Rumilly · Henriville</text>
</svg>`);
await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#F7F1E6" } })
  .composite([
    { input: text, left: 0, top: 0 },
    { input: photo, left: 580, top: 0 },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(path.join(ROOT, "public/og.jpg"));

await writeFile(path.join(ROOT, "data/media-sizes.json"), JSON.stringify(sizes, null, 1) + "\n");
console.log(`${Object.keys(sizes).length} photos prêtes : ${Object.keys(sizes).join(", ")}`);
