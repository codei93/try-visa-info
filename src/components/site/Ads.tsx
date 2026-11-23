"use client";

import { useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Format = "leaderboard" | "rectangle" | "vertical" | "responsive";

const dimensions: Record<Format, string> = {
  leaderboard: "w-full max-w-[728px] h-[50px] sm:h-[90px]",
  rectangle: "w-full max-w-[300px] h-[250px]",
  vertical: "w-[160px] h-[600px]",
  responsive: "w-full min-h-[90px]",
};

// Set to your AdSense publisher ID to serve real ads in production.
const AD_CLIENT = "";

export function AdBanner({
  slot,
  format,
  className,
}: {
  slot: string;
  format: Format;
  className?: string;
}) {
  const { t } = useI18n();
  const live = typeof window !== "undefined" && process.env.NODE_ENV === "production" && AD_CLIENT;

  useEffect(() => {
    if (!live) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {
      /* never break layout */
    }
  }, [live]);

  return (
    <div className={cn("mx-auto my-6 overflow-hidden", dimensions[format], className)}>
      {live ? (
        <ins
          className="adsbygoogle block"
          data-ad-client={AD_CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex size-full items-center justify-center rounded-md border-2 border-dashed border-input bg-muted text-center font-mono text-xs text-muted-foreground">
          <div>
            <p className="font-semibold uppercase">{t("ad.label")}</p>
            <p className="opacity-70">
              {format} · {slot}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function AdSidebar({ slot }: { slot: string }) {
  return <AdBanner slot={slot} format="rectangle" className="my-0" />;
}
