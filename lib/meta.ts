export function eventId(name: string) {
  return `${name}_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 15)}`;
}

export async function trackServerEvent(
  event_name: string,
  event_id: string,
  custom_data?: Record<string, unknown>
) {
  try {
    await fetch("/api/meta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_name,
        event_id,
        event_source_url: window.location.href,
        custom_data: custom_data || {},
      }),
    });
  } catch (err) {
    console.error("Meta server event failed:", err);
  }
}