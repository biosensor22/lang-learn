export function Examples({ examples }: { examples?: string }) {
  const sentences =
    examples
      ?.split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean) || [];

  return (
    <div className="space-y-2">
      {sentences.map((sentence, i) => (
        <span
          key={i}
          className="block w-full rounded-2xl bg-[color:var(--warm-soft)] px-3 py-2 text-sm leading-6 sm:text-[0.95rem]"
        >
          {sentence}
        </span>
      ))}
    </div>
  );
}
