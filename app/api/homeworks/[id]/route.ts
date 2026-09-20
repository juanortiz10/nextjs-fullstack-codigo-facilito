import { getHomeworkByIdLive, updateHomework } from "@/lib/data";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();

    const homework = getHomeworkByIdLive(id);

    if (!homework) {
        return Response.json({ error: "Tarea no encontrada" }, { status: 404 });
    }

    const completed =
        typeof body?.completed === "boolean" ? body.completed : !homework.completed;

    const updated = await updateHomework({ ...homework, completed });

    revalidateTag("getHomeworks", { expire: 0 });
    revalidateTag("getHomeworkById", { expire: 0 });
    revalidatePath("/");

    return Response.json(updated);
}
