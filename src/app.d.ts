/// <reference types="@sveltejs/kit" />

// Ambient module declarations for Svelte files
declare module '*.svelte' {
	import type { ComponentType } from 'svelte';
	const component: ComponentType;
	export default component;
}
