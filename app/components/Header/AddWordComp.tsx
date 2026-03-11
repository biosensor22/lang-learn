"use client";

import { AddNewWord } from "@/app/hooks/Words/addWord";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useClickOutside } from "@/app/hooks/User/useClickOutside";
import { mutateClient } from "@/app/lib/utils/formatters";
import { Plus, X } from "lucide-react";
import { createPortal } from "react-dom";

type AnchorPosition = {
  top: number;
  left: number;
  width: number;
};

type Props = {
  anchor: AnchorPosition;
  onClose: () => void;
};

const DESKTOP_WIDTH = 360;
const MOBILE_WIDTH = 320;
const VIEWPORT_GAP = 12;

export function AddWordComp({ anchor, onClose }: Props) {
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

  const modalStyle = useMemo(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const modalWidth = window.innerWidth < 640 ? MOBILE_WIDTH : DESKTOP_WIDTH;
    const maxLeft = Math.max(
      VIEWPORT_GAP,
      window.innerWidth - modalWidth - VIEWPORT_GAP,
    );
    const centeredLeft = anchor.left + anchor.width / 2 - modalWidth / 2;
    const safeLeft = Math.min(Math.max(centeredLeft, VIEWPORT_GAP), maxLeft);

    return {
      top: `${anchor.top + 10}px`,
      left: `${safeLeft}px`,
      width: `min(calc(100vw - ${VIEWPORT_GAP * 2}px), ${modalWidth}px)`,
    };
  }, [anchor]);

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

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        ref={modalRef}
        style={modalStyle}
        className={`pointer-events-auto fixed z-120 rounded-[1.35rem] border border-(--border-soft) bg-(--surface-strong) p-4 shadow-[0_24px_70px_rgba(10,20,28,0.18)] backdrop-blur-xl transition duration-200 ease-out ${
          mounted
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-2 scale-[0.98] opacity-0"
        }`}
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-(--text-soft)">
              Quick add
            </p>
            <h2 className="mt-1 text-base font-semibold tracking-tight text-(--text-main)">
              Add a new word
            </h2>
          </div>

          <button
            type="button"
            onClick={closeWindow}
            className="icon-action h-8 w-8 shrink-0"
            aria-label="Close add word modal"
          >
            <X size={14} />
          </button>
        </div>

        {err && (
          <div className="mb-3 rounded-2xl border border-(--border-soft) bg-(--danger-soft) px-3 py-2 text-xs text-(--text-main)">
            {err}
          </div>
        )}

        <input
          placeholder="Enter an English word"
          className="input-edit mt-0 bg-transparent"
          maxLength={38}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
        />

        <div className="mt-3 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={closeWindow}
            className="action-pill px-3 py-2 text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleAddWord(value)}
            className="action-pill border-transparent bg-(--accent) px-3 py-2 text-sm text-(--text-inverse) hover:bg-(--accent-strong)"
          >
            <Plus size={14} />
            Add
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
