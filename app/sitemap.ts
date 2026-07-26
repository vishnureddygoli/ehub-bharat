import type { MetadataRoute } from "next";
import {
  brand,
  chargerCategories,
  governmentSolutions,
  publicPaths,
  siteDate,
} from "./data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set([
    ...publicPaths,
    ...governmentSolutions.map((solution) => `/government/${solution.slug}`),
    ...chargerCategories.map((category) => `/ev-chargers/${category.slug}`),
  ]);

  return Array.from(paths).map((path) => ({
    url: `${brand.url}${path === "/" ? "" : path}`,
    lastModified: siteDate,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.includes("government") ? 0.9 : 0.75,
  }));
}
