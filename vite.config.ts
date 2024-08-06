import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Vite PWA Project',
        short_name: 'Vite PWA Project',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icon.svg',
            sizes: '64x64',
            type: 'image/svg',
          },
          {
            src: 'icon-192x192.svg',
            sizes: '192x192',
            type: 'image/svg',
          },
          {
            src: 'icon-512x512.svg',
            sizes: '512x512',
            type: 'image/svg',
            purpose: 'any',
          },
        ],
      },
    }),
  ],
});
