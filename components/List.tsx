import { getHomeworks } from "@/lib/data";
import HomeworkItems from "./HomeworkItems";

const HomeworkList = async () => {
  const homeworks = await getHomeworks();

  return <HomeworkItems homeworks={homeworks} />;
};

export default HomeworkList;
