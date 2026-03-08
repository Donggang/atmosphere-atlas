import Link from "next/link";

import { getEnvValidation } from "@/lib/env";

export default function Home() {
  const envValidation = getEnvValidation();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 px-6 py-12 sm:px-10">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Atmosphere Atlas</p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">Sprint 1 Foundation</h1>
        <p className="max-w-2xl text-base text-zinc-700">
          One-city-first platform for discovering overlooked places through ambient audio and photos.
        </p>
      </header>

      <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
        <h2 className="text-lg font-medium text-zinc-900">Runtime Configuration</h2>
        <p className="mt-2 text-sm text-zinc-700">
          Status:{" "}
          {envValidation.ok ? (
            <span className="font-semibold text-emerald-700">ready</span>
          ) : (
            <span className="font-semibold text-amber-700">missing values</span>
          )}
        </p>

        {!envValidation.ok ? (
          <p className="mt-2 text-sm text-zinc-600">
            Add values in <code className="rounded bg-white px-1 py-0.5">web/.env.local</code> using
            <code className="ml-1 rounded bg-white px-1 py-0.5">web/.env.example</code>. Invalid keys:{" "}
            {envValidation.invalidKeys.join(", ")}.
          </p>
        ) : null}
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium text-zinc-900">Next Build Targets</h2>
        <ul className="list-disc space-y-2 pl-5 text-zinc-700">
          <li>Connect local Postgres + PostGIS and apply schema.</li>
          <li>Implement <code>/api/v1/places</code> viewport read path.</li>
          <li>Ship the public <code>/map</code> page with pins.</li>
        </ul>
      </section>

      <footer className="text-sm text-zinc-600">
        Health endpoint: <Link className="underline" href="/api/v1/health">/api/v1/health</Link>
      </footer>
    </main>
  );
}
