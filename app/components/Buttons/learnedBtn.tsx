import Image from "next/image";

export function LearnedBtn({ onLearned }: { onLearned: () => void }) {
  return (
    <button
      type="button"
      onClick={onLearned}
      className="icon-action"
      aria-label="Move word to learned"
      title="Learned"
    >
      <Image
        width={17}
        height={17}
        src="/checkmark.svg"
        alt="learned"
      />
      <span className="icon-tooltip">Learned</span>
    </button>
  );
}
