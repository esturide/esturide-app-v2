import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";


// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'Esturide App Client',
				short_name: 'Esturide Client',
				start_url: '/',
				background_color: '#ffffff',
				theme_color: '#000000',
				icons: [
					{
						src: 'public/images/logo-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'public/images/logo-512x512.png',
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
