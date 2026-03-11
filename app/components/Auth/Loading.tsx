export function Loading() {
  return (
    <div className="card flex items-center justify-center px-4 py-8 sm:px-6">
      <div className="surface-panel auth-panel text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-[color:var(--accent-soft)]">
          <div className="h-6 w-6 rounded-full border-4 border-[color:var(--accent)] border-r-transparent animate-spin" />
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--text-soft)]">
          Preparing your deck
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--text-main)] sm:text-3xl">
          Loading your study space...
        </h1>
      </div>
    </div>
  );
}
