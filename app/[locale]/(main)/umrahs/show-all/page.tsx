import { UmrahsTable } from '@/features/umrahs/components/UmrahsTable';
import { getTranslations } from 'next-intl/server';
import { PermissionGuard } from '@/components/permissions-provider';

export default async function ShowAllUmrahsPage() {
  const t = await getTranslations('Dashboard');

  return (
    <PermissionGuard permission="index-umrahs">
      <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">{t('umrahs')}</h1>
      </div>
      <div className="mt-8">
        <UmrahsTable />
      </div>
    </div>
    </PermissionGuard>
  );
}
