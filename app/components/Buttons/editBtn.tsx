import Image from "next/image";

export function EditBtn({ onEdit }: { onEdit: () => void }) {
  return (
    <button className="cursor-pointer group relative">
      <Image
        onClick={onEdit}
        width={17}
        height={17}
        src="/edit.svg"
        alt="delete"
      />
      <div className="text-white opacity-0 group-hover:opacity-100 absolute -top-6 duration-400">
        Edit
      </div>
    </button>
  );
}
