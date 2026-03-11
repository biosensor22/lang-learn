import Image from "next/image";

export function EditBtn({ onEdit }: { onEdit: () => void }) {
  return (
    <button
      type="button"
      onClick={onEdit}
      className="icon-action"
      aria-label="Edit word"
      title="Edit"
    >
      <Image
        width={17}
        height={17}
        src="/edit.svg"
        alt="edit"
      />
      <span className="icon-tooltip">Edit</span>
    </button>
  );
}
