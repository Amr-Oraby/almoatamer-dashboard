import { useTranslations } from 'next-intl';
import { PermissionsTable } from '@/features/permissions/components/PermissionsTable';

export default function PermissionsPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('permissions_page')}</h1>
        </div>
      </div>

      <PermissionsTable />
    </div>
  );
}
