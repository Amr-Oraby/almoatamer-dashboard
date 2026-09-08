import { Settings } from "lucide-react";
import { ReactNode } from "react";

interface FormLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function FormLayout({ title, description, children }: FormLayoutProps) {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-full bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden transition-all hover:shadow-md">
        <div className="p-6 md:p-8 border-b border-zinc-100 dark:border-zinc-800/60 bg-gradient-to-r from-zinc-50 to-white dark:from-zinc-900/40 dark:to-zinc-950">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white dark:bg-zinc-900 shadow-sm rounded-xl text-zinc-700 dark:text-zinc-300 border border-zinc-100 dark:border-zinc-800">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                {title}
              </h2>
              <p className="mt-1 text-base text-zinc-500 dark:text-zinc-400">
                {description}
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
