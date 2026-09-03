"use client";

import { useTranslations, useLocale } from 'next-intl';
import { Bell, Moon, Sun, User, Menu } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/layout/SidebarContext';
import { useProfile } from '@/features/profile/hooks';

export function Topbar() {
  const t = useTranslations('Dashboard');
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const { toggle } = useSidebar();
  const { data: profileResponse, isLoading } = useProfile();
  const profile = profileResponse?.data;

  // Quick theme toggle implementation (can be refined later with next-themes if needed)
  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const currentLocale = useLocale();
  const targetLocale = currentLocale === 'en' ? 'ar' : 'en';

  return (
    <header className="h-20 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center md:hidden">
        <Button variant="ghost" size="icon" aria-label="Menu" onClick={toggle}>
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      <div className="hidden md:block">
        {/* Empty space to push items to right */}
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 border-e border-zinc-200 dark:border-zinc-800 pe-6">
          <div className="w-10 h-10 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center overflow-hidden">
            {profile?.image ? (
              <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-6 h-6 text-zinc-500" />
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <div className="h-8 w-24 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded" />
            ) : (
              <>
                <span className="text-sm font-bold">{profile?.name || t('super_admin')}</span>
                <span className="text-xs text-zinc-500">{profile?.email || t('admin_email')}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            <Bell className="w-5 h-5" />
          </button>

          <button onClick={toggleTheme} className="text-zinc-500 hover:text-primary transition-colors">
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <Link href={pathname as any} locale={targetLocale} className="text-primary font-bold flex items-center gap-1 hover:opacity-80 transition-colors">
            <span>{currentLocale === 'en' ? 'AR' : 'EN'}</span>
            <span className="text-xs uppercase">文A</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
