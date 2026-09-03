"use client";

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Home, Users, X, Calendar } from 'lucide-react';
import Image from 'next/image';
import { useSidebar } from '@/components/layout/SidebarContext';

export function Sidebar() {
  const t = useTranslations('Dashboard');
  const pathname = usePathname();
  const { isOpen, setIsOpen } = useSidebar();

  const navItems = [
    { href: '/', icon: Home, label: t('home') },
    { href: '/umrahs/show-all', icon: Calendar, label: t('umrahs') },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`fixed inset-y-0 start-0 z-50 w-64 bg-white dark:bg-zinc-950 border-e border-zinc-200 dark:border-zinc-800 flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : 'max-md:-translate-x-full max-md:rtl:translate-x-full'
          }`}
      >
        <div className="p-6 flex flex-col items-center justify-center border-b border-zinc-200 dark:border-zinc-800 relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 end-4 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="py-2">
            <Image
              src="/logo.svg"
              alt="Brand Logo"
              width={120}
              height={120}
              className="w-auto h-16 object-contain"
              priority
            />
          </div>
        </div>

        <nav className="flex-1 py-4">
          <ul className="space-y-2 px-4">
            {navItems.map((item) => {
              // A more exact check for root path to avoid / matching everything
              const isExactlyActive = item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isExactlyActive
                      ? 'bg-primary text-primary-foreground font-medium shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
