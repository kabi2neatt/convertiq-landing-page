import { NextRequest, NextResponse } from "next/server";

const PIXEL_ID = process.env.META_PIXEL_ID;
const TOKEN = process.env.META_CAPI_ACCESS_TOKEN;

export async function POST(req: NextRequest) {
  try {
    if (!PIXEL_ID || !TOKEN) {
      return NextResponse.json(
        { error: "Missing Meta environment variables" },
        { status: 500 }
      );
    }

    const body = await req.json();

    const event = {
      event_name: body.event_name,
      event_time: Math.floor(Date.now() / 1000),
      event_id: body.event_id,
      action_source: "website",
      event_source_url: body.event_source_url || req.headers.get("referer") || "",
      user_data: {
        client_user_agent: req.headers.get("user-agent") || undefined,
        client_ip_address:
          req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          req.headers.get("x-real-ip") ||
          undefined,
      },
      custom_data: body.custom_data || {},
    };

    const response = await fetch(
      `https://graph.facebook.com/v20.0/${PIXEL_ID}/events?access_token=${TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [event],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Meta CAPI error:", error);
    return NextResponse.json({ error: "Meta CAPI failed" }, { status: 500 });
  }
}
