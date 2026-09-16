import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { BASE_URL } from "@/lib/api/fetcher";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const sender_id = searchParams.get("sender_id");
    
    if (!sender_id) {
        return new NextResponse("Missing sender_id", { status: 400 });
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const response = await fetch(`${BASE_URL}export-coupon-codes?sender_id=${sender_id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "text/html,application/xhtml+xml,application/xml"
            }
        });

        if (!response.ok) {
            return new NextResponse(`Failed to fetch: ${response.statusText}`, { status: response.status });
        }

        const arrayBuffer = await response.arrayBuffer();
        
        return new NextResponse(arrayBuffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `inline; filename="coupons_${sender_id}.pdf"`
            }
        });
    } catch (error) {
        console.error("Export coupon codes error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
