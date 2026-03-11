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
          className="block w-full rounded-[1rem] bg-[color:var(--warm-soft)] px-2.5 py-1.5 text-[13px] leading-5 sm:text-[0.9rem]"
        >
          {sentence}
        </span>
      ))}
    </div>
  );
}
