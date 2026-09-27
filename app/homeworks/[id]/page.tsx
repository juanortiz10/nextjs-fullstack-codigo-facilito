import { getHomework } from "@/lib/homeworks";

const HomeworkDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const homework = await getHomework(id);

  return (
    <div>
      <h2>{homework?.title}</h2>
      <span>Completed: {String(homework?.completed)}</span>
    </div>
  );
};

export default HomeworkDetail;
