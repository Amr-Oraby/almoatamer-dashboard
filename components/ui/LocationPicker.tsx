"use client";

import dynamic from "next/dynamic";
import { LocationPickerProps } from "./LocationPickerInner";
import { Loader2 } from "lucide-react";

// Dynamically import the map component with SSR disabled
// since react-leaflet requires the window object
const LocationPickerInner = dynamic(
  () => import("./LocationPickerInner"),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full flex justify-center items-center h-[350px] bg-zinc-50 dark:bg-zinc-900 rounded-xl border-2 border-border/50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }
);

export function LocationPicker(props: LocationPickerProps) {
  return <LocationPickerInner {...props} />;
}
