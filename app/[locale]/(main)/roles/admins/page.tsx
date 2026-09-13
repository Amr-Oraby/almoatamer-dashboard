import { useTranslations } from 'next-intl';
import { AdminsTable } from '@/features/admins/components/AdminsTable';

import { PermissionGuard } from '@/components/permissions-provider';

export default function AdminsPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <PermissionGuard permission="index-admin">
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{t('admins_page')}</h1>
          </div>
        </div>

        <AdminsTable />
      </div>
    </PermissionGuard>
  );
}
