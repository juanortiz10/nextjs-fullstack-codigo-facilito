"use client";

import { Homework } from "@/lib/data";
import { ReactNode, Suspense, useState, useTransition } from "react";
import HomeworkItems from "./HomeworkItems";

const MyHomeworks = ({ children }: { children: ReactNode }) => {
  const [searchText, setSearchText] = useState("");

  const [isPendingSearch, startSearchTransition] = useTransition();
  const [isAdding, startAddingTransition] = useTransition();

  const [results, setResults] = useState<Homework[] | null>(null);
  const [nextItem, setNextItem] = useState("");

  const handleSearchClick = () => {
    startSearchTransition(async () => await refreshResults());
  };

  const handleNextItemChange = (event) => {
    setNextItem(event.target.value);
  };

  const refreshResults = async () => {
    const response = await fetch(`/api/homeworks?title=${searchText}`);
    const data: Homework[] = await response.json();

    setResults(data);
  };

  const handleAddClick = () => {
    try {
      startAddingTransition(async () => {
        await fetch("/api/homeworks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: nextItem }),
        });

        setNextItem("");
        await refreshResults();
      });
    } catch (error) {
      // TODO manejar errores de la pantalla
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex gap-3 mb-8">
        <input
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-black shadow-sm outline-none transition-colors focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-sky-900"
        />
        <button
          className="cursor-pointer rounded-lg bg-sky-500 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
          disabled={!searchText.length}
          onClick={handleSearchClick}
        >
          Buscar
        </button>
      </div>
      {isPendingSearch ? (
        <div className="animate-pulse text-sm text-gray-400">Cargando...</div>
      ) : results !== null ? (
        <HomeworkItems homeworks={results} />
      ) : (
        <Suspense
          fallback={
            <div className="animate-pulse text-sm text-gray-400">
              Cargando...
            </div>
          }
        >
          {children}
        </Suspense>
      )}
      {isAdding ? (
        <div className="animate-pulse text-sm text-gray-400 mt-4">
          Agregando elemento...
        </div>
      ) : (
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-dashed border-gray-300 p-4 dark:border-gray-700">
          <input
            type="text"
            value={nextItem}
            onChange={handleNextItemChange}
            placeholder="+ Nueva tarea"
            className="flex-1 border-none bg-transparent text-sm text-black outline-none placeholder:text-gray-400 dark:text-white"
          />
          <button
            disabled={!nextItem.length}
            onClick={handleAddClick}
            className="cursor-pointer rounded-lg bg-emerald-500 px-4 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
          >
            Agregar
          </button>
        </div>
      )}
    </div>
  );
};

export default MyHomeworks;
