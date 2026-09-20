"use server";

import { getHomeworkByIdLive, updateHomework } from "@/lib/data";
import { updateTag } from "next/cache";

export async function toggleHomework(id: string, completed: boolean) {
    const homework = getHomeworkByIdLive(id);

    if (!homework) {
        throw new Error("Tarea no encontrada");
    }

    const updated = await updateHomework({ ...homework, completed });

    updateTag("getHomeworks");
    updateTag("getHomeworkById");

    return updated;
}
