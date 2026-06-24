import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://glitteringkatie.com',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
  ],
  output: 'static',
});
