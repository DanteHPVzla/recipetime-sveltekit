import { writable } from "svelte/store";


export const activeSesion = writable(0);
export const nombreUsuario = writable('');
export const correoUsuario = writable('');
export const creacionUsuario = writable('');
export const photoURL = writable('');
export const recetasUser = writable([]);
export const recetasTotal = writable([]);
export const usuarios = writable([]);
