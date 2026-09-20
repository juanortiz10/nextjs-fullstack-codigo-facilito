"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { Homework } from "@/lib/data";
import { toggleHomework } from "@/lib/actions";

const HomeworkItems = ({
  homeworks,
  onToggle,
}: {
  homeworks: Homework[];
  onToggle?: (id: string, completed: boolean) => void;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [prevHomeworks, setPrevHomeworks] = useState(homeworks);
  const [items, setItems] = useState(homeworks);

  if (homeworks !== prevHomeworks) {
    setPrevHomeworks(homeworks);
    setItems(homeworks);
  }

  const handleToggle = (homework: Homework) => {
    const completed = !homework.completed;

    setItems((prev) =>
      prev.map((item) => (item.id === homework.id ? { ...item, completed } : item))
    );

    startTransition(async () => {
      await toggleHomework(homework.id, completed);

      if (onToggle) {
        onToggle(homework.id, completed);
      } else {
        router.refresh();
      }
    });
  };

  return (
    <ul className="flex flex-col gap-3">
      {items.map((homework) => (
        <li
          key={`homework-item-${homework.id}`}
          className="group flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
          <span
            className={`text-sm font-medium text-gray-800 transition-colors dark:text-gray-100 ${
              homework.completed ? "text-gray-400 line-through dark:text-gray-500" : ""
            }`}
          >
            {homework.title}
          </span>
          <button
            type="button"
            disabled={isPending}
            onClick={() => handleToggle(homework)}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-base transition-colors group-hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gray-700 dark:group-hover:bg-gray-600"
          >
            {homework.completed ? "✅" : "⬜"}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default HomeworkItems;
