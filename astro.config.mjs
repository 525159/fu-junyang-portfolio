// Based on RyanFitzgerald/devportfolio (MIT).
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Set SITE_URL after choosing your public domain; GitHub project pages can set BASE_PATH.
  site: process.env.SITE_URL || undefined,
  base: process.env.BASE_PATH || "/",
  trailingSlash: "always",
  devToolbar: { enabled: false },
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: "omit-disabled-toolbar-prebundles",
        configResolved(config) {
          // The disabled Astro toolbar still requests these browser-only bundles.
          // The portfolio has no hydrated framework components requiring discovery.
          config.optimizeDeps.noDiscovery = true;
          config.optimizeDeps.include = (config.optimizeDeps.include || []).filter(
            (dependency) => !["astro > aria-query", "astro > axobject-query"].includes(dependency),
          );
        },
      },
    ],
  },
});
