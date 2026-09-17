import { PageContainer } from "@/components/layout/PageContainer";
import { useTranslations } from 'next-intl';
import { PermissionsTable } from '@/features/permissions/components/PermissionsTable';
import { CreatePermissionModal } from '@/features/permissions/components/CreatePermissionModal';

export default function PermissionsPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <PageContainer>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('permissions_page')}</h1>
        </div>
        <CreatePermissionModal />
      </div>

      <PermissionsTable />
    </PageContainer>
  );
}
