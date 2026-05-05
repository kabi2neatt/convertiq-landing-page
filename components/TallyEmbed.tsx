// components/TallyEmbed.tsx
"use client";

import { useEffect, useRef } from "react";

export function TallyEmbed({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).Tally) {
      (window as any).Tally.loadEmbeds();
    }
  }, []);

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-black">
      <iframe
        ref={ref}
        data-tally-src={`${src}?hideTitle=1&dynamicHeight=1`}
        loading="lazy"
        width="100%"
        height="1200"
        frameBorder="0"
        title={title}
        className="w-full"
      />
    </div>
  );
}