import Image from "next/image";
import { useState, useRef } from "react";

type SearchProps = {
  search: string;
  setSearch: (value: string) => void;
};

export function Search({ search, setSearch }: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => {
          inputRef.current?.focus();
        }}
        className={`absolute border border-white/20 rounded-2xl
           p-2 cursor-pointer hover:border-blue-600 duration-150 z-1
           ${isFocused ? "opacity-0 z-[-2]" : "opacity-100"}
           `}
      >
        <Image width={22} height={22} src="search.svg" alt="search" />
      </button>

      <input
        ref={inputRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`outline-none border border-white/20 rounded-2xl h-full px-4
				 textn-md font-medium pr-10 focus:border-blue-600 duration-200 ease-in-out
         ${isFocused ? "opacity-100 w-50" : "opacity-0 w-0"}
         `}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search"
        value={search}
      />

      <button
        className={`absolute -right-12 border border-white/20 rounded-2xl
           p-2 cursor-pointer hover:border-blue-600 duration-150 

           ${isFocused ? "opacity-100" : "opacity-0"}
           `}
      >
        <Image width={22} height={22} src="search.svg" alt="search" />
      </button>
    </div>
  );
}
