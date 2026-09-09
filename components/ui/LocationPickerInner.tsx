"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Search, MapPin, Navigation } from "lucide-react";

// Fix default marker icon issue with webpack/next.js
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export interface LocationPickerProps {
  latitude: string;
  longitude: string;
  locationName: string;
  onLocationChange: (lat: string, lng: string, name: string) => void;
  locale?: string;
}

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

// Sub-component to fly the map to a new center
function FlyToLocation({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 14, { duration: 1.5 });
  }, [lat, lng, map]);
  return null;
}

export default function LocationPickerInner({
  latitude,
  longitude,
  locationName,
  onLocationChange,
  locale = "ar",
}: LocationPickerProps) {
  const [query, setQuery] = useState(locationName || "");
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  // Track whether the query was set by user typing vs selecting a result
  const isUserTypingRef = useRef(false);

  const lat = parseFloat(latitude) || 21.420847;
  const lng = parseFloat(longitude) || 39.826869;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync query with locationName prop when it changes externally
  useEffect(() => {
    if (locationName && !isUserTypingRef.current) setQuery(locationName);
  }, [locationName]);

  // Debounced search: fires 400ms after the user stops typing
  useEffect(() => {
    if (!isUserTypingRef.current) return;

    // Clear previous timer
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      // Abort previous in-flight request
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setIsSearching(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(trimmed)}&limit=6&accept-language=${locale}`,
          { signal: controller.signal }
        );
        const data: NominatimResult[] = await res.json();
        setResults(data);
        setShowDropdown(true);
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          setResults([]);
        }
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, locale]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isUserTypingRef.current = true;
    setQuery(e.target.value);
  };

  const handleSelect = (result: NominatimResult) => {
    isUserTypingRef.current = false;
    onLocationChange(result.lat, result.lon, result.display_name);
    setQuery(result.display_name);
    setShowDropdown(false);
  };

  const isRtl = locale === "ar";

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Section Title */}
      <p className="text-sm font-semibold text-muted-foreground text-end">
        {isRtl ? "اختر الموقع من الخريطة" : "Choose location from map"}
      </p>

      {/* Search Box */}
      <div className="relative w-full" ref={dropdownRef}>
        <div className="relative flex items-center w-full">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={isRtl ? "ابحث عن موقع..." : "Search for a location..."}
            dir={isRtl ? "rtl" : "ltr"}
            className="w-full h-12 rounded-xl border-2 border-primary/60 focus:border-primary bg-background px-4 pe-12 text-sm font-medium text-foreground placeholder:text-muted-foreground outline-none transition-colors"
          />
          <div className="absolute end-3 top-1/2 -translate-y-1/2 text-primary">
            {isSearching ? (
              <span className="block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </div>
        </div>

        {/* Results Dropdown */}
        {showDropdown && results.length > 0 && (
          <div className="absolute top-full mt-1 w-full bg-card border border-border rounded-xl shadow-lg z-[1000] max-h-[240px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
            {results.map((result) => (
              <button
                key={result.place_id}
                type="button"
                onClick={() => handleSelect(result)}
                className="w-full text-start px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/60 transition-colors border-b border-border/40 last:border-b-0 cursor-pointer"
                dir={isRtl ? "rtl" : "ltr"}
              >
                {result.display_name}
              </button>
            ))}
          </div>
        )}

        {showDropdown && results.length === 0 && !isSearching && (
          <div className="absolute top-full mt-1 w-full bg-card border border-border rounded-xl shadow-lg z-[1000] p-4 text-center text-sm text-muted-foreground">
            {isRtl ? "لا توجد نتائج" : "No results found"}
          </div>
        )}
      </div>

      {/* Map */}
      <div className="w-full h-[350px] rounded-xl overflow-hidden border-2 border-border/50 relative z-0">
        <MapContainer
          center={[lat, lng]}
          zoom={14}
          scrollWheelZoom={true}
          dragging={true}
          doubleClickZoom={true}
          zoomControl={true}
          attributionControl={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lng]} icon={defaultIcon} />
          <FlyToLocation lat={lat} lng={lng} />
        </MapContainer>
      </div>

      {/* Lat / Lng Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 bg-background border border-border/60 rounded-xl px-4 py-3">
          <div className="bg-primary/10 text-primary p-2 rounded-lg shrink-0">
            <Navigation className="w-4 h-4" />
          </div>
          <div className="flex flex-col flex-1 text-end">
            <span className="text-xs text-muted-foreground font-semibold">
              {isRtl ? "خط العرض" : "Latitude"}
            </span>
            <span className="text-base font-bold text-foreground" dir="ltr">
              {lat.toFixed(7)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-background border border-border/60 rounded-xl px-4 py-3">
          <div className="bg-primary/10 text-primary p-2 rounded-lg shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="flex flex-col flex-1 text-end">
            <span className="text-xs text-muted-foreground font-semibold">
              {isRtl ? "خط الطول" : "Longitude"}
            </span>
            <span className="text-base font-bold text-foreground" dir="ltr">
              {lng.toFixed(7)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
