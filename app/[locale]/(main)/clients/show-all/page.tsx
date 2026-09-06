import { useTranslations } from 'next-intl';
import { ClientsTable } from '@/features/clients/components/ClientsTable';

export default function ClientsPage() {
  const t = useTranslations('Dashboard');

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('clients_page')}</h1>
        </div>
      </div>

      <ClientsTable />
    </div>
  );
}
