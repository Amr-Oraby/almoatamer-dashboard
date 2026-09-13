import { serverDelete, serverGet, serverPut, serverPatch, serverPost } from "@/lib/api/serverRoute";

export async function GET(
    request: Request,
    {
        params,
    }: {
        params: Promise<{ module: string; id: string; action: string }>;
    }
) {
    const { module, id, action } = await params;

    const { searchParams } = new URL(request.url);

    const queryString = searchParams.toString();

    const endpoint = queryString
        ? `${module}/${id}/${action}?${queryString}`
        : `${module}/${id}/${action}`;

    return serverGet(endpoint);
}

export async function POST(
    request: Request,
    {
        params,
    }: {
        params: Promise<{ module: string; id: string; action: string }>;
    }
) {
    const { module, id, action } = await params;

    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    const endpoint = queryString
        ? `${module}/${id}/${action}?${queryString}`
        : `${module}/${id}/${action}`;

    const contentType = request.headers.get("content-type") || "";

    const body = contentType.includes("multipart/form-data")
        ? await request.formData()
        : await request.json();

    return serverPost(endpoint, body);
}

export async function DELETE(
    request: Request,
    {
        params,
    }: {
        params: Promise<{ module: string; id: string; action: string }>;
    }
) {
    const { module, id, action } = await params;
    const endpoint = `${module}/${id}/${action}`

    return serverDelete(endpoint);
}

export async function PUT(request: Request,
    {
        params,
    }: {
        params: Promise<{ module: string; id: string; action: string }>;
    }) {
    const { module, id, action } = await params;

    const endpoint = `${module}/${id}/${action}`;

    const contentType = request.headers.get("content-type") || "";

    const body = contentType.includes("multipart/form-data")
        ? await request.formData()
        : (request.headers.get("content-length") !== "0" ? await request.json().catch(() => ({})) : {});

    return serverPut(endpoint, body);
}

export async function PATCH(request: Request,
    {
        params,
    }: {
        params: Promise<{ module: string; id: string; action: string }>;
    }) {
    const { module, id, action } = await params;

    const endpoint = `${module}/${id}/${action}`;

    const contentType = request.headers.get("content-type") || "";

    const body = contentType.includes("multipart/form-data")
        ? await request.formData()
        : (request.headers.get("content-length") !== "0" ? await request.json().catch(() => ({})) : {});

    return serverPatch(endpoint, body);
}
