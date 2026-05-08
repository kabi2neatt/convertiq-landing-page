import { NextRequest, NextResponse } from "next/server";

const PIXEL_ID = process.env.META_PIXEL_ID;
const TOKEN = process.env.META_CAPI_ACCESS_TOKEN;

export async function POST(req: NextRequest) {
  const body = await req.json();

  const event = {
    event_name: body.event_name,
    event_time: Math.floor(Date.now() / 1000),
    event_id: body.event_id,
    action_source: "website",
    event_source_url: body.event_source_url,
    user_data: {
      client_user_agent: req.headers.get("user-agent"),
      client_ip_address:
        req.headers.get("x-forwarded-for")?.split(",")[0] ||
        req.headers.get("x-real-ip"),
    },
    custom_data: body.custom_data || {},
  };

  const res = await fetch(
    `https://graph.facebook.com/v20.0/${PIXEL_ID}/events?access_token=${TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
  data: [event],
    }),

  const data = await res.json();
  return NextResponse.json(data);
}
}