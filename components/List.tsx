import { getHomeworks } from "@/lib/homeworks";
import HomeworkItems from "@/components/HomeworkItems";

const HomeworkList = async () => {
  const homeworks = await getHomeworks();

  return <HomeworkItems homeworks={homeworks} />;
};

export default HomeworkList;
