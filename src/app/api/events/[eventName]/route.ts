import { NextResponse } from "next/server";
import { getVisitorCookie, persistEvent, visitorResponseHeaders } from "@/lib/serverEvents";

type Params = {
	params: Promise<{ eventName: string }>;
};

export async function POST(request: Request, { params }: Params) {
	const { eventName } = await params;
	const visitorId = getVisitorCookie(request) ?? crypto.randomUUID();
	let body: { props?: Record<string, unknown> } = {};
	try {
		body = (await request.json()) as { props?: Record<string, unknown> };
	} catch {
		return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
	}
	const result = await persistEvent({ eventName, props: body.props ?? {} }, visitorId);
	return NextResponse.json({ ok: true, ...result }, { headers: visitorResponseHeaders(visitorId) });
}
