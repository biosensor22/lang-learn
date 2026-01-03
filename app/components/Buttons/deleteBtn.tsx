import Image from "next/image";

export function DeleteBtn({ onDelete }: { onDelete: () => void }) {
  return (
    <button className="cursor-pointer group relative">
      <Image
        onClick={onDelete}
        width={17}
        height={17}
        src="/delete.svg"
        alt="delete"
      />
      <div className="text-white opacity-0 group-hover:opacity-100 absolute -top-6 duration-400">
        Delete
      </div>
    </button>
  );
}
