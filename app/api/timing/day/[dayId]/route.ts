import { serverPost } from "@/lib/api/serverRoute";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ dayId: string }> }
) {
    const { dayId } = await params;
    const contentType = request.headers.get("content-type") || "";
    const body = contentType.includes("multipart/form-data")
        ? await request.formData()
        : await request.json();

    return serverPost(`timing/day/${dayId}`, body);
}
