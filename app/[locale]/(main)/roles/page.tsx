import { useTranslations } from 'next-intl';
import { RolesTable } from '@/features/roles/components/RolesTable';

export default function RolesPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('roles_page')}</h1>
        </div>
      </div>

      <RolesTable />
    </div>
  );
}
