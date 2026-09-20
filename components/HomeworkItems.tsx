import type { Homework } from "@/lib/data";
import Link from "next/link";

const HomeworkItems = ({ homeworks }: { homeworks: Homework[] }) => {
  return (
    <ul className="flex flex-col gap-3">
      {homeworks.map((homework) => (
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
          <Link
            href="/"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-base transition-colors group-hover:bg-gray-200 dark:bg-gray-700 dark:group-hover:bg-gray-600"
          >
            {homework.completed ? "✅" : "⬜"}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default HomeworkItems;
