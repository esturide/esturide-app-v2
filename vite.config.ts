import { defineConfig } from 'vite'
import { VitePWA } from "vite-plugin-pwa";
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy';
import terser from '@rollup/plugin-terser';

import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
	base: './',

	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},

	plugins: [
		react(),

		legacy({
			targets: ['defaults', 'not IE 11'],
			additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
		}),

		terser({
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
			mangle: true,
		}),

		VitePWA({
			registerType: 'prompt',
			manifest: {
				name: 'Esturide App Client',
				short_name: 'Esturide Client',
				description: 'It is an application to collectivize transportation in a way that is accessible and easy for users.',
				orientation: 'any',
				display: 'standalone',
				id: 'esturide-app',
				start_url: '/',
				scope: '/',
				lang: 'es',
				background_color: '#ffffff',
				theme_color: '#000000',
				icons: [
					{
						src: '/images/logo-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/images/logo-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg}']
			}
		}),
	],
})
