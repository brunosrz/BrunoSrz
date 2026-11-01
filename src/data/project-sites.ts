export function secureSiteUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

export const projectSiteUrls = {
  ability: secureSiteUrl(import.meta.env.VITE_ABILITY_SYSTEM_SITE_URL),
  delivery: secureSiteUrl(import.meta.env.VITE_DELIVERY_EXPRESS_SITE_URL),
};
