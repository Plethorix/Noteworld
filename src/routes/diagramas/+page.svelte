<script lang="ts">
	import {
		diagramas,
		diagramaSeleccionado,
		diagramaActual,
		agregarDiagrama,
		actualizarDiagrama,
		eliminarDiagrama
	} from '$stores/diagramas';
</script>

<div class="flex h-full gap-6">
	<!-- Lista de diagramas -->
	<section class="flex w-72 shrink-0 flex-col">
		<div class="mb-3 flex items-center justify-between">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-muted">Diagramas</h2>
			<button
				class="rounded-md bg-accent px-2.5 py-1 text-xs font-medium text-base-950 transition-colors hover:bg-accent-hover"
				on:click={agregarDiagrama}
			>
				+ Nuevo
			</button>
		</div>

		<ul class="flex-1 space-y-1.5 overflow-y-auto pr-1">
			{#each $diagramas as diagrama (diagrama.id)}
				<li>
					<button
						class="w-full rounded-lg border px-3 py-2 text-left transition-colors
							{$diagramaActual === diagrama.id
								? 'border-base-600 bg-base-800'
								: 'border-transparent bg-base-900 hover:bg-base-800/60'}"
						on:click={() => diagramaActual.set(diagrama.id)}
					>
						<span class="block truncate text-sm text-gray-200">{diagrama.nombre}</span>
					</button>
				</li>
			{:else}
				<li class="rounded-lg bg-base-900 p-4 text-center text-xs text-muted">
					Aún no hay diagramas. Crea el primero.
				</li>
			{/each}
		</ul>
	</section>

	<!-- Editor de definición -->
	<section class="flex min-w-0 flex-1 flex-col rounded-xl border border-base-700 bg-base-900 p-5">
		{#if $diagramaSeleccionado}
			<div class="mb-3 flex items-center gap-3">
				<input
					class="flex-1 rounded-md bg-transparent px-2 py-1 text-lg font-medium text-gray-100 outline-none focus:bg-base-800"
					value={$diagramaSeleccionado.nombre}
					on:input={(e) =>
						actualizarDiagrama($diagramaSeleccionado.id, { nombre: e.currentTarget.value })}
				/>
				<button
					class="rounded-md border border-base-700 px-2.5 py-1 text-xs text-muted transition-colors hover:border-red-500/50 hover:text-red-400"
					on:click={() => eliminarDiagrama($diagramaSeleccionado.id)}
				>
					Eliminar
				</button>
			</div>
			<textarea
				class="flex-1 resize-none rounded-md bg-transparent p-2 font-mono text-sm leading-relaxed text-gray-300 outline-none focus:bg-base-800"
				placeholder="graph TD;&#10;  A --> B;"
				value={$diagramaSeleccionado.definicion}
				on:input={(e) =>
					actualizarDiagrama($diagramaSeleccionado.id, { definicion: e.currentTarget.value })}
			></textarea>
			<p class="mt-2 text-xs text-muted">
				Lienzo de diagramas · la vista de renderizado llegará en una próxima iteración ◈
			</p>
		{:else}
			<div class="flex flex-1 items-center justify-center text-sm text-muted">
				Selecciona o crea un diagrama para empezar ◈
			</div>
		{/if}
	</section>
</div>
