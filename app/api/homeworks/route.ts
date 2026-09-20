import { createHomework, fetchHomework, getHomeworks } from "@/lib/data";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const title = request.nextUrl.searchParams.get("title");

    const homeworks = title ? await fetchHomework(title) : await getHomeworks();

    return Response.json(homeworks);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const title = typeof body?.title === "string" ? body.title.trim() : "";

    if (!title) {
        return Response.json({ error: "El titulo es requerido" }, { status: 400 });
    }

    const homework = await createHomework(title);

    revalidateTag("getHomeworks", { expire: 0 });
    revalidatePath("/");

    return Response.json(homework, { status: 201 });
}
