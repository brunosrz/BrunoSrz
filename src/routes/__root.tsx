import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { getLocale } from "../paraglide/runtime.js";
import * as m from "../paraglide/messages.js";
import Footer from "../components/Footer";
import Header from "../components/Header";
import appCss from "../styles.css?url";

const siteUrl = "https://brunosrz.vercel.app";

export const Route = createRootRoute({
  head: () => {
    const locale = getLocale();
    const canonicalPath = locale === "pt-BR" ? "/pt-BR/" : "/en/";
    const canonicalUrl = new URL(canonicalPath, siteUrl).href;
    const socialCard = `${siteUrl}/social-card-${locale}.png`;
    const socialImageAlt =
      locale === "pt-BR"
        ? "brunosrz — Bruno Soares, engenheiro de software"
        : "brunosrz — Bruno Soares, software engineer";

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: m.meta_title() },
        { name: "description", content: m.meta_description() },
        { name: "theme-color", content: "#111113" },
        { name: "author", content: "Bruno Soares" },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:type", content: "profile" },
        { property: "og:site_name", content: "brunosrz" },
        { property: "profile:first_name", content: "Bruno" },
        { property: "profile:last_name", content: "Soares" },
        { property: "profile:username", content: "brunosrz" },
        { property: "og:title", content: m.meta_title() },
        { property: "og:description", content: m.meta_description() },
        { property: "og:url", content: canonicalUrl },
        { property: "og:image", content: socialCard },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:type", content: "image/png" },
        { property: "og:image:alt", content: socialImageAlt },
        {
          property: "og:locale",
          content: locale === "pt-BR" ? "pt_BR" : "en_US",
        },
        {
          property: "og:locale:alternate",
          content: locale === "pt-BR" ? "en_US" : "pt_BR",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: m.meta_title() },
        { name: "twitter:description", content: m.meta_description() },
        { name: "twitter:image", content: socialCard },
        { name: "twitter:image:alt", content: socialImageAlt },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "canonical", href: canonicalUrl },
        { rel: "alternate", hrefLang: "en", href: `${siteUrl}/en/` },
        { rel: "alternate", hrefLang: "pt-BR", href: `${siteUrl}/pt-BR/` },
        { rel: "alternate", hrefLang: "x-default", href: `${siteUrl}/en/` },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600;700;800&display=swap",
        },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "@id": `${canonicalUrl}#profile`,
            url: canonicalUrl,
            name: m.meta_title(),
            description: m.meta_description(),
            inLanguage: locale,
            mainEntity: {
              "@type": "Person",
              "@id": `${siteUrl}/#person`,
              name: "Bruno Soares",
              alternateName: "brunosrz",
              url: siteUrl,
              image: socialCard,
              jobTitle:
                locale === "pt-BR"
                  ? "Engenheiro de software independente"
                  : "Independent software engineer",
              sameAs: ["https://github.com/brunosrz"],
            },
          }),
        },
      ],
    };
  },
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang={getLocale()}>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-[#111113] font-sans text-[#fafafa] antialiased selection:bg-[#3399ff]/30">
        <Header />
        {children}
        <Footer />
        <TanStackDevtools
          config={{ position: "bottom-right" }}
          plugins={[
            {
              name: "TanStack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
