"use client";

import { Suspense, useState, useTransition, type ReactNode } from "react";
import type { Homework } from "@/lib/data";
import HomeworkItems from "@/components/HomeworkItems";

const MyHomeworks = ({ children }: { children: ReactNode }) => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<Homework[] | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSearchClick = () => {
    startTransition(async () => {
      const response = await fetch(
        `/api/homeworks?title=${encodeURIComponent(searchText)}`
      );
      const data: Homework[] = await response.json();
      setResults(data);
    });
  };

  const handleClearClick = () => {
    setSearchText("");
    setResults(null);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8 flex gap-3">
        <input
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Buscar tarea..."
          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-black shadow-sm outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-sky-900"
        />
        <button
          className="cursor-pointer rounded-lg bg-sky-500 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
          disabled={!searchText.length && results === null}
          onClick={results === null ? handleSearchClick : handleClearClick}
        >
          {results === null ? "Buscar" : "Limpiar"}
        </button>
      </div>
      {isPending ? (
        <div className="animate-pulse text-sm text-gray-400">Loading...</div>
      ) : results !== null ? (
        <HomeworkItems homeworks={results} />
      ) : (
        <Suspense
          fallback={
            <div className="animate-pulse text-sm text-gray-400">Loading...</div>
          }
        >
          {children}
        </Suspense>
      )}
    </div>
  );
};

export default MyHomeworks;
