import Link from "next/link";

export function Brand() {
  return (
    <Link href="/" className="font-display text-lg tracking-tight">
      Objectif <span className="glow-text">100%</span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
      <Brand />
      <Link href="/suivi/histoire" className="btn-primary">Ma progression</Link>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-edge px-4 py-8 text-center text-xs text-dim">
      <p className="mx-auto max-w-2xl">
        Site de fans non officiel. Objectif 100 % n&apos;est ni affilié, ni approuvé, ni sponsorisé par
        Rockstar Games ou Take-Two Interactive. Grand Theft Auto et GTA sont des marques de Take-Two
        Interactive Software, Inc.
      </p>
      <p className="mt-3">
        <Link href="/mentions-legales" className="underline hover:text-text">Mentions légales</Link>
      </p>
    </footer>
  );
}
