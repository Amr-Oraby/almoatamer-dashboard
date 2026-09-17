import { PageContainer } from "@/components/layout/PageContainer";
import { useTranslations } from 'next-intl';
import { PoliciesTable } from '@/features/policies/components/PoliciesTable';
import { PermissionGuard } from '@/components/permissions-provider';

export default function PrivacyPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <PermissionGuard permission="index-policy">
      <PageContainer>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('privacy_page')}</h1>
        </div>
      </div>

      <PoliciesTable />
    </PageContainer>
    </PermissionGuard>
  );
}
