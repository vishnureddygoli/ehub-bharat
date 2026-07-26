import type { MetadataRoute } from "next";
import { brand } from "./data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/docs/"],
      },
    ],
    sitemap: `${brand.url}/sitemap.xml`,
    host: brand.url,
  };
}
