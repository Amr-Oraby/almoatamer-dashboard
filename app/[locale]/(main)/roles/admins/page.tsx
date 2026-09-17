import { PageContainer } from "@/components/layout/PageContainer";
import { useTranslations } from 'next-intl';
import { AdminsTable } from '@/features/admins/components/AdminsTable';
import { CreateAdminModal } from '@/features/admins/components/CreateAdminModal';

import { PermissionGuard } from '@/components/permissions-provider';

export default function AdminsPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <PermissionGuard permission="index-admin">
      <PageContainer>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{t('admins_page')}</h1>
          </div>
          <PermissionGuard permission="create-admin" type="element">
            <CreateAdminModal />
          </PermissionGuard>
        </div>

        <AdminsTable />
      </PageContainer>
    </PermissionGuard>
  );
}
