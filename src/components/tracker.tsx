"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getCategories, LAST_DATA_UPDATE, type Item } from "@/data/checklist";
import { DICT, localePath, type Dict, type Lang } from "@/lib/i18n";
import { progress, useProgress } from "@/lib/progress";

type Filter = "tous" | "a-faire" | "faits";

function pct(done: number, total: number) {
  return total ? Math.round((done / total) * 100) : 0;
}

function Bar({ value }: { value: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-night">
      <div className="h-full rounded-full bg-gradient-to-r from-sun to-pink transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}

export function Tracker({ lang, active }: { lang: Lang; active: string }) {
  const t = DICT[lang];
  const CATEGORIES = useMemo(() => getCategories(lang), [lang]);
  const p = useProgress();
  const [filter, setFilter] = useState<Filter>("tous");
  const [query, setQuery] = useState("");
  const [newItem, setNewItem] = useState("");

  // Objectifs visibles par catégorie : liste officielle (moins ceux masqués) + objectifs perso.
  const lists = useMemo(() => {
    const out: Record<string, (Item & { custom: boolean })[]> = {};
    for (const c of CATEGORIES) {
      out[c.id] = [
        ...c.items.filter((i) => !p.hidden[i.id]).map((i) => ({ ...i, custom: false })),
        ...(p.custom[c.id] ?? []).map((i) => ({ ...i, custom: true })),
      ];
    }
    return out;
  }, [p, CATEGORIES]);

  const all = Object.values(lists).flat();
  const totalDone = all.filter((i) => p.done[i.id]).length;
  const category = CATEGORIES.find((c) => c.id === active)!;
  const items = lists[active];
  const shown = items.filter(
    (i) =>
      (filter === "tous" || (filter === "faits") === Boolean(p.done[i.id])) &&
      i.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  function add(e: React.FormEvent) {
    e.preventDefault();
    const name = newItem.trim();
    if (!name) return;
    progress.addCustom(active, name.slice(0, 120));
    setNewItem("");
  }

  return (
    <div className="space-y-6">
      <section className="panel p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm text-dim">{t.overall}</p>
            <p className="font-display text-4xl">
              <span className="glow-text">{pct(totalDone, all.length)}%</span>
            </p>
          </div>
          <p className="text-sm text-dim">
            {totalDone} / {all.length} {t.goals}
          </p>
        </div>
        <div className="mt-4">
          <Bar value={pct(totalDone, all.length)} />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Catégories : liste verticale sur ordinateur, défilement horizontal sur mobile */}
        <nav className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
          {CATEGORIES.map((c) => {
            const list = lists[c.id];
            const d = list.filter((i) => p.done[i.id]).length;
            const isActive = c.id === active;
            return (
              <Link
                key={c.id}
                href={localePath(lang, `/suivi/${c.id}`)}
                scroll={false}
                aria-current={isActive ? "page" : undefined}
                className={`shrink-0 rounded-xl border px-4 py-3 text-left transition lg:w-full ${
                  isActive ? "border-pink bg-panel-2" : "border-edge bg-panel hover:border-dim"
                }`}
              >
                <span className="flex items-center justify-between gap-3 text-sm font-semibold">
                  <span className="whitespace-nowrap">{c.icon} {c.name}</span>
                  <span className="text-xs font-normal text-dim">{list.length ? `${d}/${list.length}` : t.soon}</span>
                </span>
                <span className="mt-2 hidden lg:block">
                  <Bar value={pct(d, list.length)} />
                </span>
              </Link>
            );
          })}
        </nav>

        <section className="panel min-w-0 p-5 sm:p-6">
          <h2 className="text-xl font-semibold">{category.icon} {category.name}</h2>
          <p className="mt-1 text-sm text-dim">{category.description}</p>

          {category.items.length === 0 && category.id !== "perso" && (
            <p className="mt-4 rounded-xl border border-sun/30 bg-sun/10 px-4 py-3 text-sm">
              {t.emptyList}
            </p>
          )}

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search}
              className="field sm:max-w-xs"
              aria-label={t.searchLabel}
            />
            <div className="flex rounded-xl border border-edge bg-night p-1 text-sm">
              {(["tous", "a-faire", "faits"] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 rounded-lg px-3 py-1.5 whitespace-nowrap ${filter === f ? "bg-panel-2 text-text" : "text-dim"}`}
                >
                  {t.filters[f]}
                </button>
              ))}
            </div>
          </div>

          <ul className="mt-4 divide-y divide-edge">
            {shown.map((item) => {
              const done = Boolean(p.done[item.id]);
              return (
                <li key={item.id} className="group flex items-center gap-3 py-3">
                  <button
                    onClick={() => progress.toggle(item.id)}
                    aria-pressed={done}
                    aria-label={`${done ? t.uncheck : t.check} : ${item.name}`}
                    className={`grid size-7 shrink-0 place-items-center rounded-lg border-2 text-sm font-bold transition ${
                      done ? "border-teal bg-teal text-night" : "border-edge hover:border-teal"
                    }`}
                  >
                    {done && "✓"}
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className={`break-words ${done ? "text-dim line-through" : ""}`}>{item.name}</p>
                    {item.hint && <p className="text-xs text-dim">{item.hint}</p>}
                  </div>
                  {(item.custom || category.id === "perso") && (
                    <button
                      onClick={() => progress.remove(category.id, item.id, item.custom)}
                      className="text-xs text-dim opacity-100 hover:text-pink sm:opacity-0 sm:group-hover:opacity-100"
                      aria-label={`${t.remove} : ${item.name}`}
                    >
                      {t.remove}
                    </button>
                  )}
                </li>
              );
            })}
            {shown.length === 0 && items.length > 0 && <li className="py-6 text-center text-sm text-dim">{t.noResult}</li>}
          </ul>

          <form onSubmit={add} className="mt-4 flex gap-2">
            <input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder={t.addPlaceholder}
              className="field"
              maxLength={120}
              aria-label={t.addLabel}
            />
            <button className="btn-ghost shrink-0" type="submit">{t.add}</button>
          </form>

          <p className="mt-6 text-xs text-dim">{t.updated} {LAST_DATA_UPDATE[lang]}.</p>
        </section>
      </div>

      <SaveTools t={t.save} />
    </div>
  );
}

function SaveTools({ t }: { t: Dict["save"] }) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  async function copyCode() {
    const c = progress.exportCode();
    setCode(c);
    try {
      await navigator.clipboard.writeText(c);
      setMessage(t.copied);
    } catch {
      setMessage(t.copyBelow);
    }
  }

  function importCode() {
    try {
      progress.importCode(code);
      setMessage(t.imported);
    } catch {
      setMessage(t.invalid);
    }
  }

  return (
    <details className="panel p-5 sm:p-6">
      <summary className="cursor-pointer font-semibold">{t.title}</summary>
      <p className="mt-3 text-sm text-dim">
        {t.text}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={copyCode} className="btn-ghost">{t.copy}</button>
        <button onClick={importCode} className="btn-ghost" disabled={!code.trim()}>{t.import}</button>
        <button
          onClick={() => {
            if (confirm(t.confirmReset)) progress.reset();
          }}
          className="btn-ghost text-pink"
        >
          {t.reset}
        </button>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={3}
        placeholder={t.placeholder}
        className="field mt-3 font-mono text-xs"
        aria-label={t.label}
      />
      {message && <p className="mt-2 text-sm text-teal">{message}</p>}
    </details>
  );
}
