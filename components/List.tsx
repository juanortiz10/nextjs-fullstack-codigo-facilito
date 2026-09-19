import { getHomeworks } from "@/lib/data";
import Link from "next/link";

const HomeworkList = async () => {
  const homeworks = await getHomeworks();

  return (
    <ul>
      {homeworks.map((homework) => (
        <li
          key={`homework-item-${homework.id}`}
          className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded"
        >
          {homework.title}
          <Link href="/" className="ml-4">
            {homework.completed ? "✅" : "⬜"}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default HomeworkList;
