import { AddNewWord } from "@/app/hooks/Words/addWord";
import { ListTypes } from "@/app/hooks/Words/wordsList";
import { useEffect, useRef, useState } from "react";
import { mutate } from "swr";

type Props = {
  onClose: () => void;
};

export function AddWordComp({ onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState("");
  const [err, setErr] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  function closeWindow() {
    setMounted(false);
    setTimeout(() => {
      onClose();
      setErr("");
    }, 100);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeWindow();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  async function handleAddWord(value: string) {
    const result = await AddNewWord(value);

    if (!result.success) {
      setErr(result.message);
    } else {
      ["to-learn", "learned", "vocabulary"].forEach((type) =>
        mutate(["words-list", type as ListTypes])
      );
      setErr("");
      closeWindow();
    }
  }

  return (
    <div className="w-full">
      <div
        ref={modalRef}
        className={`w-90 bg-indigo-950/70 boxshadow h-34 absolute top-0 justify-center
           items-center flex flex-col rounded-2xl p-2 duration-100 ease-in-out
          ${
            mounted
              ? "opacity-100 top-24 absolute pointer-events-auto"
              : "opacity-0 top-0 absolute pointer-events-none"
          }`}
      >
        <p className="text-red-500 py-1">{err}</p>
        <input
          placeholder="Enter word"
          className="bg-black flex h-10 w-80 rounded-xl boxshadow text-white px-2 outline-0"
          maxLength={38}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
        />
        <div className="gap-x-4 flex">
          <button
            onClick={() => handleAddWord(value)}
            className="bg-amber-700 text-white px-10 py-2 rounded-2xl mt-4
              cursor-pointer hover:scale-105 duration-100"
          >
            Add
          </button>
          <button
            onClick={() => closeWindow()}
            className="bg-green-900 text-white px-10 py-2 rounded-2xl mt-4
              cursor-pointer hover:scale-105 duration-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
