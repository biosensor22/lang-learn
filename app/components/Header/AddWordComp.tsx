"use client";

import { AddNewWord } from "@/app/hooks/Words/addWord";
import { useEffect, useState, useCallback } from "react";
import { useClickOutside } from "@/app/hooks/User/useClickOutside";
import { mutateClient } from "@/app/lib/utils/formatters";
import { Plus, X } from "lucide-react";

type Props = {
  onClose: () => void;
};

export function AddWordComp({ onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState("");
  const [err, setErr] = useState("");

  const closeWindow = useCallback(() => {
    setMounted(false);

    setTimeout(() => {
      onClose();
      setErr("");
    }, 120);
  }, [onClose]);

  const modalRef = useClickOutside(closeWindow);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(id);
  }, []);

  async function handleAddWord(word: string) {
    const result = await AddNewWord(word);

    if (!result.success) {
      setErr(result.message);
    } else {
      mutateClient();
      setErr("");
      closeWindow();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/25 px-4 pb-6 pt-24 backdrop-blur-sm">
      <div
        ref={modalRef}
        className={`modal-panel transition duration-200 ease-out ${
          mounted
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-3 scale-[0.98] opacity-0 pointer-events-none"
        }`}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--text-soft)]">
              Dictionary
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-[color:var(--text-main)]">
              Add a new word
            </h2>
            <p className="mt-2 text-sm leading-6 text-[color:var(--text-soft)]">
              The app will fetch pronunciation, examples and translation
              automatically.
            </p>
          </div>

          <button
            type="button"
            onClick={closeWindow}
            className="mobile-menu-btn shrink-0"
            aria-label="Close add word modal"
          >
            <X size={18} />
          </button>
        </div>

        {err && (
          <div className="mb-4 rounded-3xl border border-[color:var(--border-soft)] bg-[color:var(--danger-soft)] px-4 py-3 text-sm text-[color:var(--text-main)]">
            {err}
          </div>
        )}

        <input
          placeholder="Enter an English word"
          className="input-edit bg-transparent"
          maxLength={38}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
        />

        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={closeWindow}
            className="action-pill justify-center"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleAddWord(value)}
            className="action-pill justify-center border-transparent bg-[color:var(--accent)] text-[color:var(--text-inverse)] hover:bg-[color:var(--accent-strong)]"
          >
            <Plus size={16} />
            Add word
          </button>
        </div>
      </div>
    </div>
  );
}
