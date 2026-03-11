import Image from "next/image";

export function ToLearnBtn({ toLearn }: { toLearn: () => void }) {
  return (
    <button
      type="button"
      onClick={toLearn}
      className="icon-action"
      aria-label="Move word back to learn"
      title="Learn"
    >
      <Image
        width={17}
        height={17}
        src="/book.svg"
        alt="learn"
      />
      <span className="icon-tooltip">Learn</span>
    </button>
  );
}
