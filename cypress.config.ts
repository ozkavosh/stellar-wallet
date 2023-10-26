import { defineConfig } from "cypress";
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

config({ path: `${dirname}/.env.local` });

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: process.env.CYPRESS_BASE_URL,
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
