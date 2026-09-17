// Server component
import { getHomeworks } from "@/lib/data";

export default async function Home() {
  const homeworks = await getHomeworks();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center justify-center bg-white dark:bg-black">
        <ul>
          {homeworks.map((homework) => (
            <li
              key={`homework-item-${homework.id}`}
              className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded"
            >
              {homework.title}
              <span className="ml-4">{homework.completed ? "✅" : "⬜"}</span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
