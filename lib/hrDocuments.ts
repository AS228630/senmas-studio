export const HR_STORAGE_BUCKET = "hr-confidential";

// These folder keys must match the folders the owner creates when
// uploading real files in the Supabase dashboard (Storage > hr-confidential).
export const HR_CATEGORIES = [
  { key: "identity", label: "Identitätsdokumente" },
  { key: "education", label: "Bildungsnachweise" },
  { key: "recognition", label: "Anerkennung Deutschland" },
  { key: "references", label: "Arbeitszeugnisse" },
  { key: "other", label: "Weitere Nachweise" },
  { key: "certificates_full", label: "Zertifikate (Vollständig)" },
] as const;

export type HrCategoryKey = (typeof HR_CATEGORIES)[number]["key"];

export function isValidCategory(key: string): key is HrCategoryKey {
  return HR_CATEGORIES.some((c) => c.key === key);
}
