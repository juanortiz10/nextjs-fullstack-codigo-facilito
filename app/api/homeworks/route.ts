import { fetchHomework, getHomeworks } from "@/lib/data";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const title = request.nextUrl.searchParams.get("title");

    const homeworks = title ? await fetchHomework(title) : await getHomeworks();

    return Response.json(homeworks);
}

export async function POST() {

}
