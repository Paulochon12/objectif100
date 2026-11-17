"use client";

import { useSyncExternalStore } from "react";
import type { Item } from "@/data/checklist";

/**
 * Progression du joueur, enregistrée dans son navigateur (pas de compte nécessaire).
 * Elle peut être exportée sous forme de code pour la transférer sur un autre appareil.
 */
export type Progress = {
  done: Record<string, true>;
  /** Objectifs ajoutés par le joueur, par catégorie. */
  custom: Record<string, Item[]>;
  /** Objectifs par défaut que le joueur a masqués. */
  hidden: Record<string, true>;
};

const KEY = "objectif100:v1";
const EMPTY: Progress = { done: {}, custom: {}, hidden: {} };
const listeners = new Set<() => void>();
let cache: Progress | null = null;

function read(): Progress {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache!;
}

function write(next: Progress) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Navigation privée ou stockage plein : la progression reste en mémoire pour cette visite.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useProgress() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export const progress = {
  toggle(id: string) {
    const p = read();
    const done = { ...p.done };
    if (done[id]) delete done[id];
    else done[id] = true;
    write({ ...p, done });
  },
  addCustom(categoryId: string, name: string) {
    const p = read();
    const item = { id: `c-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`, name };
    write({ ...p, custom: { ...p.custom, [categoryId]: [...(p.custom[categoryId] ?? []), item] } });
  },
  remove(categoryId: string, id: string, isCustom: boolean) {
    const p = read();
    const done = { ...p.done };
    delete done[id];
    if (isCustom) {
      write({ ...p, done, custom: { ...p.custom, [categoryId]: (p.custom[categoryId] ?? []).filter((i) => i.id !== id) } });
    } else {
      write({ ...p, done, hidden: { ...p.hidden, [id]: true } });
    }
  },
  reset() {
    write(EMPTY);
  },
  exportCode() {
    return btoa(unescape(encodeURIComponent(JSON.stringify(read()))));
  },
  importCode(code: string) {
    const data = JSON.parse(decodeURIComponent(escape(atob(code.trim())))) as Progress;
    if (typeof data !== "object" || !data || typeof data.done !== "object") throw new Error("Code invalide");
    write({ done: data.done ?? {}, custom: data.custom ?? {}, hidden: data.hidden ?? {} });
  },
};
