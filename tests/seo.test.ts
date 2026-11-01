import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const rootRoute = await readFile("src/routes/__root.tsx", "utf8");
const faviconSvg = await readFile("public/favicon.svg", "utf8");
const robots = await readFile("public/robots.txt", "utf8");
const sitemap = await readFile("public/sitemap.xml", "utf8");
const socialCards = await Promise.all(
  ["en", "pt-BR"].map((locale) =>
    readFile(`public/social-card-${locale}.svg`, "utf8"),
  ),
);
const manifests = (await Promise.all(
  ["en", "pt-BR"].map(async (locale) =>
    JSON.parse(await readFile(`public/site-${locale}.webmanifest`, "utf8")),
  ),
)) as Array<{
  lang: string;
  start_url: string;
  icons: Array<{ sizes: string; src: string }>;
}>;

function readPngDimensions(png: Buffer): { width: number; height: number } {
  return {
    width: png.readUInt32BE(16),
    height: png.readUInt32BE(20),
  };
}

describe("portfolio SEO assets", () => {
  it("serves localized search and social metadata from the root route", () => {
    expect(rootRoute).toContain("m.meta_title()");
    expect(rootRoute).toContain("m.meta_description()");
    expect(rootRoute).toContain('const siteUrl = "https://www.brunosrz.com"');
    expect(rootRoute).not.toContain("brunosrz.vercel.app");
    expect(rootRoute).toContain('"/pt-BR/" : "/en/"');
    expect(rootRoute).toContain('hrefLang: "pt-BR"');
    expect(rootRoute).toContain('hrefLang: "x-default"');
    expect(rootRoute).toContain("og:image");
    expect(rootRoute).toContain("twitter:card");
    expect(rootRoute).toContain('href: "/favicon.svg"');
    expect(rootRoute).toContain('"@type": "ProfilePage"');
    expect(rootRoute).toContain('"@type": "Person"');
  });

  it("publishes a crawlable sitemap and robots policy for both locales", () => {
    expect(robots).toContain("Allow: /");
    expect(robots).toContain("https://www.brunosrz.com/sitemap.xml");
    expect(sitemap).toContain("https://www.brunosrz.com/en/");
    expect(sitemap).toContain("https://www.brunosrz.com/pt-BR/");
    expect(robots).not.toContain("brunosrz.vercel.app");
    expect(sitemap).not.toContain("brunosrz.vercel.app");
    expect(sitemap).toContain('hreflang="x-default"');
  });

  it("uses the official domain in both social card sources", () => {
    for (const socialCard of socialCards) {
      expect(socialCard).toContain("brunosrz.com");
      expect(socialCard).not.toContain("brunosrz.vercel.app");
    }
  });

  it("ships square favicon variants and correctly sized social cards", async () => {
    expect(faviconSvg).toContain('viewBox="0 0 64 64"');
    for (const [file, size] of [
      ["public/favicon-16x16.png", 16],
      ["public/favicon-32x32.png", 32],
      ["public/favicon-48x48.png", 48],
      ["public/apple-touch-icon.png", 180],
      ["public/android-chrome-192x192.png", 192],
      ["public/android-chrome-512x512.png", 512],
    ] as const) {
      const dimensions = readPngDimensions(await readFile(file));
      expect(dimensions).toEqual({ width: size, height: size });
    }

    expect(manifests.map(({ lang, start_url }) => [lang, start_url])).toEqual([
      ["en", "/en/"],
      ["pt-BR", "/pt-BR/"],
    ]);
    for (const manifest of manifests) {
      expect(manifest.icons.map((icon) => icon.sizes)).toEqual([
        "192x192",
        "512x512",
      ]);
    }
    expect(
      readPngDimensions(await readFile("public/social-card-en.png")),
    ).toEqual({
      width: 1200,
      height: 630,
    });
    expect(
      readPngDimensions(await readFile("public/social-card-pt-BR.png")),
    ).toEqual({ width: 1200, height: 630 });
    expect((await readFile("public/favicon.ico")).subarray(0, 4)).toEqual(
      Buffer.from([0, 0, 1, 0]),
    );
  });
});
