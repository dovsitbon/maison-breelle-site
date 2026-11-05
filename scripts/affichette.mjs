// Affichette A5 imprimable (148 × 210 mm) avec QR code vers le site : print/affichette-a5.pdf
//   npm run affichette
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";
import site from "../data/site.json" with { type: "json" };

const ROOT = path.resolve(import.meta.dirname, "..");
const mm = (v) => (v * 72) / 25.4;
const W = mm(148);
const H = mm(210);
const hex = (h) => rgb(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
const C = { bordeaux: hex("#6A1F25"), cream: hex("#F7F1E6"), ink: hex("#1B1816"), muted: hex("#4B443E"), gold: hex("#B8955A"), green: hex("#2E4A3B") };

const pdf = await PDFDocument.create();
pdf.setTitle("Maison Bréelle – affichette A5");
const page = pdf.addPage([W, H]);
const serif = await pdf.embedFont(StandardFonts.TimesRoman);
const sans = await pdf.embedFont(StandardFonts.Helvetica);
const sansB = await pdf.embedFont(StandardFonts.HelveticaBold);
const center = (text, y, font, size, color, spacing = 0) => {
  const w = font.widthOfTextAtSize(text, size) + spacing * (text.length - 1);
  let x = (W - w) / 2;
  if (!spacing) return page.drawText(text, { x, y, size, font, color });
  for (const ch of text) {
    page.drawText(ch, { x, y, size, font, color });
    x += font.widthOfTextAtSize(ch, size) + spacing;
  }
};

page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: C.cream });
// Double filet doré, comme une enseigne
page.drawRectangle({ x: mm(7), y: mm(7), width: W - mm(14), height: H - mm(14), borderColor: C.gold, borderWidth: 0.9 });
page.drawRectangle({ x: mm(9), y: mm(9), width: W - mm(18), height: H - mm(18), borderColor: C.gold, borderOpacity: 0.55, borderWidth: 0.5 });

// Cochon au trait (mêmes tracés que le logo, viewBox 8 7 52 28)
const pig = [
  "M16 15C22 9.2 39.5 9 46.6 13.6C50.6 14.6 53.9 16.8 56.2 19.2L58.4 19.6V23.2C55.3 24.2 52.6 24.3 50.2 25.2C46.4 28.2 27 29.2 18.6 27.3C13.4 26.1 12 18.4 16 15Z",
  "M48.4 14.2L50.9 10.3L51.9 16",
  "M21.6 27.6V33.4M25.6 28.1V33.4M42.4 27.8V33.4M46.4 26.6V33.4",
  "M14.6 18.2C11.6 17 10.3 19.9 12.3 20.9C14.3 21.9 13.3 24.2 10.6 23.6",
];
const s = 0.62;
for (const d of pig) page.drawSvgPath(d, { x: W / 2 - 34 * s, y: H - mm(16), scale: s, borderColor: C.bordeaux, borderWidth: 1.1 });

center("MAISON BRÉELLE", H - mm(38), serif, 27, C.bordeaux, 2.2);
page.drawRectangle({ x: W / 2 - mm(8), y: H - mm(43), width: mm(16), height: 0.8, color: C.gold });
center("CHARCUTERIE · TRAITEUR · AMIENS", H - mm(49), sans, 8, C.ink, 1.6);

center("Le goût du fait maison,", H - mm(70), serif, 21, C.ink);
center("au coin de la rue.", H - mm(79), serif, 21, C.ink);
center("Commandez en ligne, retirez en boutique.", H - mm(89), sans, 9.5, C.muted);
center("Plats du jour · plateaux · buffets · fêtes", H - mm(95), sans, 9.5, C.muted);

// QR code
const qr = QRCode.create(`${site.url}/fr`, { errorCorrectionLevel: "M" });
const n = qr.modules.size;
const box = mm(44);
const cellSize = box / (n + 8);
const qx = (W - box) / 2;
const qy = H - mm(148);
page.drawRectangle({ x: qx - 1.5, y: qy - 1.5, width: box + 3, height: box + 3, borderColor: C.gold, borderWidth: 0.7 });
page.drawRectangle({ x: qx, y: qy, width: box, height: box, color: rgb(1, 1, 1) });
for (let r = 0; r < n; r++)
  for (let c = 0; c < n; c++) if (qr.modules.get(r, c)) page.drawRectangle({ x: qx + (c + 4) * cellSize, y: qy + box - (r + 5) * cellSize, width: cellSize + 0.05, height: cellSize + 0.05, color: C.ink });
center("Scannez pour commander ou demander un devis", qy - mm(6), sansB, 9, C.bordeaux);
center(site.url.replace("https://", ""), qy - mm(11), sans, 8, C.muted);

// Pied : adresse, horaires, téléphone
page.drawLine({ start: { x: mm(18), y: mm(36) }, end: { x: W - mm(18), y: mm(36) }, thickness: 0.6, color: C.gold });
center(`${site.address.street}, ${site.address.postalCode} ${site.address.city}`, mm(29), sans, 9, C.ink);
center("Lun. 9 h – 13 h 30 / 15 h – 20 h · Mar. – ven. 8 h – 13 h 30 / 15 h – 20 h", mm(23.5), sans, 7.6, C.muted);
center("Sam. 8 h – 18 h · Fermé le dimanche", mm(19), sans, 7.6, C.muted);
center(site.phone, mm(12), serif, 15, C.bordeaux, 0.8);

await mkdir(path.join(ROOT, "print"), { recursive: true });
await writeFile(path.join(ROOT, "print/affichette-a5.pdf"), await pdf.save());
console.log("print/affichette-a5.pdf écrit");
