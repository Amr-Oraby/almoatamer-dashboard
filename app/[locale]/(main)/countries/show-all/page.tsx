import { PageContainer } from "@/components/layout/PageContainer";
import { useTranslations, useLocale } from 'next-intl';
import { CountriesTable } from '@/features/countries/components/CountriesTable';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { PermissionGuard } from '@/components/permissions-provider';

export default function CountriesPage() {
  const t = useTranslations('Dashboard');
  const locale = useLocale();
  
  return (
    <PermissionGuard permission="index-countries">
      <PageContainer>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('countries_page')}</h1>
        </div>
        <PermissionGuard permission="create-countries" type="element">
          <Link href={`/${locale}/countries/create`} className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 rounded-xl">
              <Plus className="w-4 h-4" /> {t('create_new')}
          </Link>
        </PermissionGuard>
      </div>

      <CountriesTable />
    </PageContainer>
    </PermissionGuard>
  );
}
