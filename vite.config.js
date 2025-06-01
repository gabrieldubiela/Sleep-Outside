import { resolve } from "path";
import { defineConfig } from "vite";

const GITHUB_REPO_NAME = 'sleepoutside';

export default defineConfig(({ command, mode }) => {
  let baseConfig = '/';

  if (process.env.NETLIFY === 'true') {
    baseConfig = '/';
  } else if (process.env.GITHUB_PAGES === 'true') {
    baseConfig = `/${GITHUB_REPO_NAME}/`;
  } else if (process.env.NODE_ENV === 'production' && process.env.CI_ENVIRONMENT === 'github_pages') {
      baseConfig = `/${GITHUB_REPO_NAME}/`;
  } else if (command === 'build') {
    baseConfig = '/';
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