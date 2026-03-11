import Image from "next/image";

export function DeleteBtn({ onDelete }: { onDelete: () => void }) {
  return (
    <button
      type="button"
      onClick={onDelete}
      className="icon-action"
      aria-label="Delete word"
      title="Delete"
    >
      <Image
        width={17}
        height={17}
        src="/delete.svg"
        alt="delete"
      />
      <span className="icon-tooltip">Delete</span>
    </button>
  );
}
