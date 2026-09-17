"use client";

import Image from "next/image";
import { useTranslations, useLocale } from 'next-intl';
import { Bell, Moon, Sun, User, Menu, ChevronDown, LogOut } from 'lucide-react';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/layout/SidebarContext';
import { useProfile } from '@/features/profile/hooks';
import { useLogout } from '@/features/auth/hooks';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NotificationsDropdown } from "@/components/layout/NotificationsDropdown";

export function Topbar() {
  const t = useTranslations('Dashboard');
  const pathname = usePathname();
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const { toggle } = useSidebar();
  const { data: profileResponse, isLoading } = useProfile();
  const profile = profileResponse?.data;
  
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();

  // Quick theme toggle implementation (can be refined later with next-themes if needed)
  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
    <header className="h-20 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-3 md:px-6 shrink-0 gap-2">
      <div className="flex items-center md:hidden">
        <Button variant="ghost" size="icon" aria-label="Menu" onClick={toggle}>
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      <div className="hidden md:block">
        {/* Empty space to push items to right */}
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="border-e border-zinc-200 dark:border-zinc-800 pe-3 md:pe-6">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 md:gap-3 outline-none group cursor-pointer">
              <div className="w-10 h-10 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                {profile?.image ? (
                  <Image width={400} height={400} src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-zinc-500" />
                )}
              </div>
              <div className="flex flex-col items-start text-start max-w-[120px] sm:max-w-[200px]">
                {isLoading ? (
                  <div className="h-8 w-24 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded" />
                ) : (
                  <>
                    <span className="text-sm font-bold truncate w-full">{profile?.name || t('super_admin')}</span>
                    <span className="text-xs text-zinc-500 truncate w-full hidden md:block">{profile?.email || t('admin_email')}</span>
                  </>
                )}
              </div>
              <ChevronDown className="w-4 h-4 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors ms-1 md:ms-2 shrink-0" />
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl">
              <DropdownMenuItem onClick={() => router.push('/profile')} className="flex items-center justify-between cursor-pointer p-3 rounded-lg">
                <span className="font-semibold text-[15px]">{t('view_profile')}</span>
                <User className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem onClick={() => setIsLogoutDialogOpen(true)} className="flex items-center justify-between cursor-pointer p-3 rounded-lg text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950/50">
                <span className="font-semibold text-[15px]">{t('logout')}</span>
                <LogOut className="w-5 h-5" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <NotificationsDropdown />

          <button onClick={toggleTheme} className="text-zinc-500 hover:text-primary transition-colors">
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <Link href={pathname as any} locale={targetLocale} className="text-primary font-bold flex items-center gap-1 hover:opacity-80 transition-colors">
            <span>{currentLocale === 'en' ? 'AR' : 'EN'}</span>
            <span className="text-xs uppercase">文A</span>
          </Link>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        onConfirm={async () => {
          try {
            await logout();
            setIsLogoutDialogOpen(false);
            router.push('/login');
          } catch (error) {
            // Error is handled in the hook
          }
        }}
        isLoading={isLoggingOut}
        title={t('confirm_logout', { fallback: 'Confirm Logout' })}
        description={t('confirm_logout_desc', { fallback: 'Are you sure you want to log out?' })}
        confirmText={t('logout', { fallback: 'Logout' })}
        cancelText={t('cancel', { fallback: 'Cancel' })}
        confirmButtonColor="bg-red-500 hover:bg-red-600 text-white"
      />
    </header>
  );
}
