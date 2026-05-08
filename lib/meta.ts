export function eventId(name: string) {
  return `${name}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export async function trackServerEvent(event_name: string, event_id: string) {
  await fetch("/api/meta", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_name,
      event_id,
      event_source_url: window.location.href,
    }),
  });
}