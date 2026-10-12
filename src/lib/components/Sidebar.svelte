<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	const links = [
		{ href: `${base}/`, label: 'Inicio', icon: '⌂' },
		{ href: `${base}/notas`, label: 'Notas', icon: '✎' },
		{ href: `${base}/diagramas`, label: 'Diagramas', icon: '◈' }
	];
</script>

<aside class="flex h-screen w-56 shrink-0 flex-col border-r border-base-700 bg-base-900">
	<!-- Marca -->
	<div class="flex items-center gap-2 px-5 py-6">
		<span class="text-accent text-xl font-bold">●</span>
		<h1 class="text-sm font-semibold tracking-widest text-gray-300 uppercase">Notas & Diagramas</h1>
	</div>

	<!-- Navegación -->
	<nav class="mt-2 flex flex-1 flex-col gap-1 px-3">
		{#each links as link (link.href)}
			<a
				href={link.href}
				class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors
					{$page.url.pathname === link.href
						? 'bg-base-800 text-white font-medium'
						: 'text-muted hover:bg-base-800/60 hover:text-gray-200'}"
			>
				<span class="w-5 text-center">{link.icon}</span>
				{link.label}
			</a>
		{/each}
	</nav>

	<!-- Pie de la sidebar -->
	<div class="border-t border-base-700 px-5 py-4">
		<p class="text-xs text-muted">Tema oscuro · v0.1</p>
	</div>
</aside>
