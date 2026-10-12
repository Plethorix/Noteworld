import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Preprocesado Svelte (TypeScript, etc.)
	preprocess: vitePreprocess(),

	kit: {
		// Adaptador estático para GitHub Pages (SPA sin servidor)
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: false
		}),

		paths: {
			base: process.argv.includes('dev') ? '' : '/Noteworld'
		},

		alias: {
			$components: 'src/lib/components',
			$stores: 'src/lib/stores'
		}
	}
};

export default config;
