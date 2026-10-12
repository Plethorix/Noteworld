import { writable, derived } from 'svelte/store';

export interface Nota {
	id: string;
	titulo: string;
	contenido: string;
	createdAt: number;
	updatedAt: number;
}

const STORAGE_KEY = 'notas-v1';

function crearNota(titulo = 'Nueva nota'): Nota {
	const ahora = Date.now();
	return {
		id: crypto.randomUUID(),
		titulo,
		contenido: '',
		createdAt: ahora,
		updatedAt: ahora
	};
}

// Cargar desde localStorage si estamos en el navegador
const inicial: Nota[] =
	typeof window !== 'undefined'
		? JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
		: [];

export const notas = writable<Nota[]>(inicial);

// Persistir cambios
notas.subscribe(($n) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem(STORAGE_KEY, JSON.stringify($n));
	}
});

export const notaActual = writable<string | null>(inicial[0]?.id ?? null);

export const notaSeleccionada = derived(
	[notas, notaActual],
	([$notas, $id]) => $notas.find((n) => n.id === $id) ?? null
);

export function agregarNota(): Nota {
	const nota = crearNota();
	notas.update((list) => [nota, ...list]);
	notaActual.set(nota.id);
	return nota;
}

export function actualizarNota(id: string, campos: Partial<Pick<Nota, 'titulo' | 'contenido'>>) {
	notas.update((list) =>
		list.map((n) => (n.id === id ? { ...n, ...campos, updatedAt: Date.now() } : n))
	);
}

export function eliminarNota(id: string) {
	notas.update((list) => list.filter((n) => n.id !== id));
	notaActual.update((actual) => (actual === id ? null : actual));
}
