import { useTranslations } from 'next-intl';
import { TermsTable } from '@/features/terms/components/TermsTable';
import { PermissionGuard } from '@/components/permissions-provider';

export default function TermsPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <PermissionGuard permission="index-terms">
      <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('terms_page')}</h1>
        </div>
      </div>

      <TermsTable />
    </div>
    </PermissionGuard>
  );
}
