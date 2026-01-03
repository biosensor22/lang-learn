import Image from "next/image";

export function LearnedBtn({ onLearned }: { onLearned: () => void }) {
  return (
    <button className="cursor-pointer group relative">
      <Image
        onClick={onLearned}
        width={17}
        height={17}
        src="/checkmark.svg"
        alt="delete"
      />
      <div className="text-white opacity-0 group-hover:opacity-100 absolute right-0 -top-6 duration-400">
        Learned
      </div>
    </button>
  );
}
