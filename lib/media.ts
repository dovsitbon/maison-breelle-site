import sizes from "@/data/media-sizes.json";

export type Img = { key: string; src: string; width: number; height: number };

/**
 * Photo de public/media d'après sa clé « categorie/nom » (générée par npm run media).
 * null si la photo n'a pas encore été déposée : le site affiche alors un emplacement sobre.
 */
export function photo(key: string | null | undefined): Img | null {
  if (!key) return null;
  const s = (sizes as Record<string, number[]>)[key];
  return s ? { key, src: `/media/${key}.jpg`, width: s[0], height: s[1] } : null;
}
