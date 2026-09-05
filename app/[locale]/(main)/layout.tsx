import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { SidebarProvider } from '@/components/layout/SidebarContext';
import { getTranslations } from 'next-intl/server';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations('Dashboard');
  const currentYear = t('copyright_year');
  const brandName = t('brand_name');
  const rights = t('rights');

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950">
        <Sidebar />

        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Topbar />

          <main className="flex-1 overflow-y-auto  px-4 pt-4">
            <div className="max-w-7xl mx-auto min-h-[calc(100vh-160px)] relative">
              {children}
            </div>

            <footer className=" mt-8 text-center text-xs text-zinc-500 py-4 border-t border-zinc-200 dark:border-zinc-800">
              {rights} <span className="text-primary font-bold">{brandName}</span> &copy;{currentYear}
            </footer>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
