import Image from "next/image";

export function PlaySound({ onAudio }: { onAudio: () => void }) {
  return (
    <button
      type="button"
      onClick={onAudio}
      className="icon-action shrink-0"
      aria-label="Play pronunciation"
      title="Play pronunciation"
    >
      <Image width={18} height={18} src="/sound.svg" alt="sound" />
      <span className="icon-tooltip">Sound</span>
    </button>
  );
}
