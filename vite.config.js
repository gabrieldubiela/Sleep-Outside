import { resolve } from "path";
import { defineConfig } from "vite";

const GITHUB_REPO_NAME = 'sleepoutside'; // Confirmed correct from your URL

export default defineConfig(({ command, mode }) => {
  let baseConfig = '/';

  // If building on Netlify (indicated by environment variable)
  if (process.env.NETLIFY === 'true') {
    baseConfig = '/';
  }
  // If it's a build command (e.g., 'npm run build') and not Netlify, assume GitHub Pages
  else if (command === 'build') {
    baseConfig = `/${GITHUB_REPO_NAME}/`;
  }

  return {
    root: "src/",
    base: baseConfig,

    build: {
      outDir: "../dist",
      rollupOptions: {
        input: {
          main: resolve(__dirname, "src/index.html"),
          cart: resolve(__dirname, "src/cart/index.html"),
          checkout: resolve(__dirname, "src/checkout/index.html"),
          product: resolve(__dirname, "src/product_pages/index.html"),
          product_listing: resolve(__dirname, "src/product_listing/index.html"),
        },
      },
    },
  };
});