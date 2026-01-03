import Image from "next/image";

export function ToLearnBtn({ toLearn }: { toLearn: () => void }) {
  return (
    <button className="cursor-pointer group relative">
      <Image
        onClick={toLearn}
        width={17}
        height={17}
        src="/book.svg"
        alt="delete"
      />
      <div className="text-white opacity-0 group-hover:opacity-100 absolute -top-6 duration-400">
        Learn
      </div>
    </button>
  );
}
