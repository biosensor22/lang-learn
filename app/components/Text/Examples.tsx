export function Examples({ examples }: { examples?: string }) {
  const sentences =
    examples
      ?.split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean) || [];

  return (
    <div>
      {sentences.map((sentence, i) => (
        <span key={i} className="block w-full">
          {sentence}
        </span>
      ))}
    </div>
  );
}
