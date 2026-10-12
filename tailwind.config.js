/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				// Paleta minimalista oscura
				base: {
					950: '#0a0a0f', // fondo principal
					900: '#111118', // fondos de paneles
					800: '#1a1a24', // superficies elevadas
					700: '#262633', // bordes / separadores
					600: '#3a3a4a' // hover
				},
				accent: {
					DEFAULT: '#7c8aff', // acento índigo suave
					hover: '#9aa5ff'
				},
				muted: '#8b8b9e'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
			}
		}
	},
	plugins: []
};
