import { createHomework, getHomeworkByTitle, getHomeworks } from "@/lib/data";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        // ?title=something
        const title = request.nextUrl.searchParams.get('title');
        const homeworks = title ? await getHomeworkByTitle(title) : await getHomeworks();

        return Response.json(homeworks);
    } catch (error) {
        
    }
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const title = typeof body?.title === 'string' ? body.title.trim() : "";

    if (!title?.length || !title) {
        return Response.json({ error: "El titulo es requerido" }, { status: 400 });
    }

    const homework = await createHomework(title);

    if (homework) {
        revalidateTag("getHomeworks", { expire: 0 });
        revalidatePath("/");

        return Response.json(homework, { status: 201 });
    }

    return Response.json({ error: 'No se ha creado la tarea' }, { status: 400 });
}