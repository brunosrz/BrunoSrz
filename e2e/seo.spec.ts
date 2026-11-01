import { expect, test } from "@playwright/test";

const localizedPages = [
  {
    locale: "en",
    path: "/en/",
    title: /Software Engineer/,
    socialImage: "https://brunosrz.vercel.app/social-card-en.png",
  },
  {
    locale: "pt-BR",
    path: "/pt-BR/",
    title: /Engenheiro de Software/,
    socialImage: "https://brunosrz.vercel.app/social-card-pt-BR.png",
  },
] as const;

for (const pageSeo of localizedPages) {
  test(`serves SSR SEO metadata for ${pageSeo.locale}`, async ({ page }) => {
    const response = await page.goto(pageSeo.path);
    expect(response?.status()).toBe(200);

    await expect(page.locator("html")).toHaveAttribute("lang", pageSeo.locale);
    await expect(page).toHaveTitle(pageSeo.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /.+/,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://brunosrz.vercel.app${pageSeo.path}`,
    );
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
      "href",
      "https://brunosrz.vercel.app/en/",
    );
    await expect(page.locator('link[hreflang="pt-BR"]')).toHaveAttribute(
      "href",
      "https://brunosrz.vercel.app/pt-BR/",
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      pageSeo.socialImage,
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
    await expect(page.locator('link[rel="manifest"]')).toHaveAttribute(
      "href",
      `/site-${pageSeo.locale}.webmanifest`,
    );

    const profileData = await page
      .locator('script[type="application/ld+json"]')
      .evaluate((node) => JSON.parse(node.textContent ?? "{}"));
    expect(profileData).toMatchObject({
      "@type": "ProfilePage",
      inLanguage: pageSeo.locale,
      mainEntity: {
        "@type": "Person",
        name: "Bruno Soares",
      },
    });

    const manifest = await page.request.get(
      `/site-${pageSeo.locale}.webmanifest`,
    );
    expect(manifest.status()).toBe(200);
    await expect(manifest.json()).resolves.toMatchObject({
      lang: pageSeo.locale,
      start_url: pageSeo.path,
    });
  });
}
