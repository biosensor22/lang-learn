import Image from "next/image";

export function PlaySound({ onAudio }: { onAudio: () => void }) {
  return (
    <Image
      onClick={onAudio}
      width={18}
      height={18}
      className="cursor-pointer z-1"
      src="sound.svg"
      alt="sound"
    />
  );
}
