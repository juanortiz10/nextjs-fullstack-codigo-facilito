"use server";

import { deleteHomeWork, getHomework, updateHomework } from "@/lib/homeworks";
import { updateTag } from "next/cache";

export async function toggleHomework(id: string, completed: boolean) {
    const homework = await getHomework(id);

    if (!homework) {
        throw new Error("Tarea no encontrada");
    }

    const updated = await updateHomework(homework.id, { completed });

    updateTag("getHomeworks");
    updateTag("getHomeworkById");

    return updated;
}

export async function editHomework(id: string, title: string) {
    const homework = await getHomework(id);

    if (!homework) {
        throw new Error("Tarea no encontrada");
    }

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
        throw new Error("El título no puede estar vacío");
    }

    const updated = await updateHomework(homework.id, { title: trimmedTitle });

    updateTag("getHomeworks");
    updateTag("getHomeworkById");

    return updated;
}

export async function deleteHomework(id: string) {
    const homework = await getHomework(id);

    if (!homework) {
        throw new Error("Tarea no encontrada");
    }

    const deleted = await deleteHomeWork(id);

    updateTag("getHomeworks");
    updateTag("getHomeworkById");

    return deleted;
}
