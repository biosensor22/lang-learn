"use client";

import { BUTTONS } from "@/app/lib/constants/headerBtn";
import { AddWordComp } from "./AddWordComp";
import { usePathname, useRouter } from "next/navigation";
import { SignOutBtn } from "../Buttons/signOutBtn";
import { ThemeSwitcher } from "../Buttons/ThemeSwitcher";
import { Languages, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

type AnchorPosition = {
  top: number;
  left: number;
  width: number;
};

interface MainHeaderProps {
  onSwitch?: () => void;
}

function getActionPath(action: string) {
  switch (action) {
    case "learn":
      return "/";
    case "vocabulary":
      return "/vocabulary";
    case "learned":
      return "/learned";
    default:
      return null;
  }
}

export function MainHeader({ onSwitch }: MainHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAddWordOpen, setAddWordOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addWordAnchor, setAddWordAnchor] = useState<AnchorPosition | null>(null);

  const visibleButtons = BUTTONS.filter(
    (btn) => btn.action !== "blur-word" || Boolean(onSwitch),
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  function handleAction(
    action: string,
    anchor?: AnchorPosition,
  ) {
    setMobileMenuOpen(false);

    switch (action) {
      case "learn":
        router.push("/");
        break;
      case "vocabulary":
        router.push("/vocabulary");
        break;
      case "learned":
        router.push("/learned");
        break;
      case "add-word":
        if (anchor) {
          setAddWordAnchor(anchor);
        }
        setAddWordOpen(true);
        break;
      case "blur-word":
        onSwitch?.();
        break;
    }
  }

  function renderNavButton(action: { name: string; action: string }, mobile = false) {
    const href = getActionPath(action.action);
    const isActive = href ? pathname === href : false;

    return (
      <button
        key={`${action.name}-${mobile ? "mobile" : "desktop"}`}
        type="button"
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();

          handleAction(action.action, {
            top: rect.bottom,
            left: rect.left,
            width: rect.width,
          });
        }}
        className={`header-nav-btn ${isActive ? "is-active" : ""} ${
          mobile ? "w-full justify-start text-left" : ""
        }`}
      >
        {action.name}
      </button>
    );
  }

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
        <header className="surface-panel page-panel mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              router.push("/");
            }}
            className="flex min-w-0 items-center gap-3 text-left"
          >
            <span className="brand-badge">
              <Languages size={20} />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--text-soft)]">
                Study deck
              </span>
              <span className="block truncate text-lg font-semibold tracking-tight text-[color:var(--text-main)] sm:text-xl">
                Lang Learn
              </span>
            </span>
          </button>

          <nav className="hidden flex-1 items-center justify-center gap-2 md:flex">
            {visibleButtons.map((action) => renderNavButton(action))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeSwitcher />
            <div className="hidden md:flex">
              <SignOutBtn />
            </div>
            <button
              type="button"
              className="mobile-menu-btn md:hidden"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </header>
      </div>

      {isMobileMenuOpen && (
        <div
          className="drawer-backdrop md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="surface-panel mobile-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--text-soft)]">
                  Navigation
                </p>
                <p className="mt-1 text-lg font-semibold tracking-tight text-[color:var(--text-main)]">
                  Quick actions
                </p>
              </div>
              <button
                type="button"
                className="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close mobile menu"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {visibleButtons.map((action) => renderNavButton(action, true))}
            </nav>

            <div className="mt-4 border-t border-[color:var(--border-soft)] pt-4">
              <SignOutBtn />
            </div>
          </div>
        </div>
      )}

      {isAddWordOpen && addWordAnchor && (
        <AddWordComp
          anchor={addWordAnchor}
          onClose={() => {
            setAddWordOpen(false);
            setAddWordAnchor(null);
          }}
        />
      )}
    </>
  );
}
