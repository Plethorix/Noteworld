import { writable, derived } from 'svelte/store';

export interface Diagrama {
	id: string;
	nombre: string;
	/** Por ahora guardamos una definición en texto (p. ej. Mermaid / JSON propio) */
	definicion: string;
	createdAt: number;
	updatedAt: number;
}

const STORAGE_KEY = 'diagramas-v1';

function crearDiagrama(nombre = 'Nuevo diagrama'): Diagrama {
	const ahora = Date.now();
	return {
		id: crypto.randomUUID(),
		nombre,
		definicion: 'graph TD;\n  A --> B;',
		createdAt: ahora,
		updatedAt: ahora
	};
}

const inicial: Diagrama[] =
	typeof window !== 'undefined'
		? JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
		: [];

export const diagramas = writable<Diagrama[]>(inicial);

diagramas.subscribe(($d) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem(STORAGE_KEY, JSON.stringify($d));
	}
});

export const diagramaActual = writable<string | null>(inicial[0]?.id ?? null);

export const diagramaSeleccionado = derived(
	[diagramas, diagramaActual],
	([$diagramas, $id]) => $diagramas.find((d) => d.id === $id) ?? null
);

export function agregarDiagrama(): Diagrama {
	const diagrama = crearDiagrama();
	diagramas.update((list) => [diagrama, ...list]);
	diagramaActual.set(diagrama.id);
	return diagrama;
}

export function actualizarDiagrama(
	id: string,
	campos: Partial<Pick<Diagrama, 'nombre' | 'definicion'>>
) {
	diagramas.update((list) =>
		list.map((d) => (d.id === id ? { ...d, ...campos, updatedAt: Date.now() } : d))
	);
}

export function eliminarDiagrama(id: string) {
	diagramas.update((list) => list.filter((d) => d.id !== id));
	diagramaActual.update((actual) => (actual === id ? null : actual));
}
