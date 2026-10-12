<script lang="ts">
	import {
		notas,
		notaSeleccionada,
		notaActual,
		agregarNota,
		actualizarNota,
		eliminarNota
	} from '$stores/notas';

	function formatear(ts: number): string {
		return new Date(ts).toLocaleDateString('es', {
			day: 'numeric',
			month: 'short',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<div class="flex h-full gap-6">
	<!-- Lista de notas -->
	<section class="flex w-72 shrink-0 flex-col">
		<div class="mb-3 flex items-center justify-between">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-muted">Notas</h2>
			<button
				class="rounded-md bg-accent px-2.5 py-1 text-xs font-medium text-base-950 transition-colors hover:bg-accent-hover"
				on:click={agregarNota}
			>
				+ Nueva
			</button>
		</div>

		<ul class="flex-1 space-y-1.5 overflow-y-auto pr-1">
			{#each $notas as nota (nota.id)}
				<li>
					<button
						class="w-full rounded-lg border px-3 py-2 text-left transition-colors
							{$notaActual === nota.id
								? 'border-base-600 bg-base-800'
								: 'border-transparent bg-base-900 hover:bg-base-800/60'}"
						on:click={() => notaActual.set(nota.id)}
					>
						<span class="block truncate text-sm text-gray-200">{nota.titulo}</span>
						<span class="block text-xs text-muted">{formatear(nota.updatedAt)}</span>
					</button>
				</li>
			{:else}
				<li class="rounded-lg bg-base-900 p-4 text-center text-xs text-muted">
					No hay notas todavía. Crea la primera.
				</li>
			{/each}
		</ul>
	</section>

	<!-- Editor de la nota seleccionada -->
	<section class="flex min-w-0 flex-1 flex-col rounded-xl border border-base-700 bg-base-900 p-5">
		{#if $notaSeleccionada}
			<div class="mb-3 flex items-center gap-3">
				<input
					class="flex-1 rounded-md bg-transparent px-2 py-1 text-lg font-medium text-gray-100 outline-none focus:bg-base-800"
					value={$notaSeleccionada.titulo}
					on:input={(e) => actualizarNota($notaSeleccionada.id, { titulo: e.currentTarget.value })}
				/>
				<button
					class="rounded-md border border-base-700 px-2.5 py-1 text-xs text-muted transition-colors hover:border-red-500/50 hover:text-red-400"
					on:click={() => eliminarNota($notaSeleccionada.id)}
				>
					Eliminar
				</button>
			</div>
			<textarea
				class="flex-1 resize-none rounded-md bg-transparent p-2 font-mono text-sm leading-relaxed text-gray-300 outline-none focus:bg-base-800"
				placeholder="Escribe tu nota aquí…"
				value={$notaSeleccionada.contenido}
				on:input={(e) => actualizarNota($notaSeleccionada.id, { contenido: e.currentTarget.value })}
			></textarea>
		{:else}
			<div class="flex flex-1 items-center justify-center text-sm text-muted">
				Selecciona o crea una nota para empezar ✎
			</div>
		{/if}
	</section>
</div>
