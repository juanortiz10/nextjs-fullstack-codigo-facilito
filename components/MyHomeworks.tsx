"use client";

import { Suspense, useState, useTransition, type ReactNode } from "react";
import type { Homework } from "@/lib/data";
import HomeworkItems from "@/components/HomeworkItems";

const MyHomeworks = ({ children }: { children: ReactNode }) => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<Homework[] | null>(null);
  const [isPending, startTransition] = useTransition();
  const [newTitle, setNewTitle] = useState("");
  const [isAdding, startAddTransition] = useTransition();

  const refreshResults = async () => {
    const response = await fetch(
      `/api/homeworks?title=${encodeURIComponent(searchText)}`
    );
    const data: Homework[] = await response.json();
    setResults(data);
  };

  const handleSearchClick = () => {
    startTransition(refreshResults);
  };

  const handleClearClick = () => {
    setSearchText("");
    setResults(null);
  };

  const handleAddClick = () => {
    const title = newTitle.trim();
    if (!title) return;

    startAddTransition(async () => {
      await fetch("/api/homeworks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      setNewTitle("");
      await refreshResults();
    });
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
      {!isPending && (
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-dashed border-gray-300 p-4 dark:border-gray-700">
          <input
            type="text"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && handleAddClick()}
            placeholder="+ Nueva tarea..."
            className="flex-1 border-none bg-transparent text-sm text-black outline-none placeholder:text-gray-400 dark:text-white"
          />
          <button
            className="cursor-pointer rounded-lg bg-emerald-500 px-4 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
            disabled={!newTitle.trim().length || isAdding}
            onClick={handleAddClick}
          >
            {isAdding ? "Agregando..." : "Agregar"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MyHomeworks;
