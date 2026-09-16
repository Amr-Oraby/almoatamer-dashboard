import { serverPut } from "@/lib/api/serverRoute";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ dayId: string }> }
) {
    const { dayId } = await params;
    return serverPut(`timing/day/${dayId}/toggle`, {});
}
