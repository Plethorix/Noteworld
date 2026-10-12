import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Preprocesado Svelte (TypeScript, etc.)
	preprocess: vitePreprocess(),

	kit: {
		// Adaptador para desplegar en cualquier plataforma soportada
		adapter: adapter(),

		alias: {
			$components: 'src/lib/components',
			$stores: 'src/lib/stores'
		}
	}
};

export default config;
