import { UseFormRegister } from "react-hook-form";

interface LocalizedTextareasProps {
  register: UseFormRegister<any>;
}

const LANGUAGES = [
  { code: 'en', label: 'English', color: 'bg-blue-500' },
  { code: 'ar', label: 'Arabic', color: 'bg-emerald-500' },
  { code: 'fa', label: 'Persian', color: 'bg-amber-500' },
  { code: 'ms', label: 'Malay', color: 'bg-rose-500' },
  { code: 'tr', label: 'Turkish', color: 'bg-purple-500' },
  { code: 'iid', label: 'Indonesian', color: 'bg-cyan-500' },
] as const;

export function LocalizedTextareas({ register }: LocalizedTextareasProps) {
  return (
    <>
      {LANGUAGES.map((lang) => (
        <div key={lang.code} className="flex flex-col gap-3 group col-span-1">
          <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            <span className={`w-2 h-2 rounded-full ${lang.color} transition-all group-hover:scale-125`} />
            {lang.label} Info
          </label>
          <textarea
            className="w-full h-32 bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none hover:border-zinc-300 dark:hover:border-zinc-700 placeholder:text-zinc-400/70"
            placeholder={`Enter ${lang.label} information here...`}
            {...register(`${lang.code as "en" | "ar" | "fa" | "ms" | "tr" | "iid"}.info`)}
          />
        </div>
      ))}
    </>
  );
}
