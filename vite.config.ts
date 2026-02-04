import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

import * as path from 'path';
import staticAssetsPlugin from 'vite-static-assets-plugin';
import { qrcode } from 'vite-plugin-qrcode';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  publicDir: 'public',

  assetsInclude: ['**/*.gif', '**/*.png', '**/*.ttf', '***/*.webp'],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '~': path.resolve(__dirname, 'src/app'),
      $libs: path.resolve(__dirname, 'src/libs'),
    },
  },

  plugins: [
    qrcode(),

    tailwindcss(),

    react(),

    staticAssetsPlugin({
      directory: 'public',
      outputFile: 'src/static-assets.ts',
      ignore: ['.DS_Store'],
      debounce: 200,
      enableDirectoryTypes: true,
      maxDirectoryDepth: 5,
      allowEmptyDirectories: false,
      addLeadingSlash: true,
    }),

    VitePWA({
      injectRegister: 'auto',
      registerType: 'prompt',
      manifest: {
        id: 'esturide-app',
        name: 'Esturide Client',
        short_name: 'Esturide',
        description:
          'It is an application to collectivize transportation in a way that is accessible and easy for users.',
        orientation: 'portrait',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        lang: 'es',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/images/logo-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/images/logo-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        shortcuts: [
          {
            name: 'Home',
            url: '/',
          },
        ],
        categories: ['social', 'travel'],
        display_override: [
          'standalone',
          'fullscreen',
          'browser',
          'window-controls-overlay',
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
    }),
  ],

  build: {
    target: 'ES2024',
    minify: 'esbuild',
  },

  server: {
    host: true, // Set host to true to make the server accessible over the local network
    // Optional: set a custom port
    // port: 3000,
    // Optional: open the browser automatically
    // open: true,
  },
});
