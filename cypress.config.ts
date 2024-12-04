import { defineConfig } from 'cypress';
import viteConfig from './vite.config';

export default defineConfig({
  component: {
    port: 5173,
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig,
    },
  },

  e2e: {
    baseUrl: 'https://github-actions-ci-cd-pipline.onrender.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
