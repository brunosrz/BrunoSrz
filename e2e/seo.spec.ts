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
    if (!response) {
      throw new Error(`No document response for ${pageSeo.path}`);
    }
    expect(response.status()).toBe(200);

    const initialHtml = await response.text();
    const htmlTag = initialHtml.match(/<html\b[^>]*>/i)?.[0] ?? "";
    expect(htmlTag).toMatch(new RegExp(`\\blang="${pageSeo.locale}"`));

    const canonicalTag = initialHtml.match(
      /<link\b(?=[^>]*\brel="canonical")[^>]*>/i,
    )?.[0];
    expect(canonicalTag).toContain(
      `href="https://brunosrz.vercel.app${pageSeo.path}"`,
    );

    for (const [locale, path] of [
      ["en", "/en/"],
      ["pt-BR", "/pt-BR/"],
    ] as const) {
      const alternateTag = initialHtml.match(
        new RegExp(`<link\\b(?=[^>]*\\bhreflang="${locale}")[^>]*>`, "i"),
      )?.[0];
      expect(alternateTag).toContain(
        `href="https://brunosrz.vercel.app${path}"`,
      );
    }

    const socialImageTag = initialHtml.match(
      /<meta\b(?=[^>]*\bproperty="og:image")[^>]*>/i,
    )?.[0];
    expect(socialImageTag).toContain(`content="${pageSeo.socialImage}"`);

    const jsonLd = initialHtml.match(
      /<script\b(?=[^>]*\btype="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/i,
    )?.[1];
    expect(jsonLd).toBeDefined();
    expect(JSON.parse(jsonLd ?? "{}")).toMatchObject({
      "@type": "ProfilePage",
      inLanguage: pageSeo.locale,
      mainEntity: {
        "@type": "Person",
        name: "Bruno Soares",
      },
    });

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
