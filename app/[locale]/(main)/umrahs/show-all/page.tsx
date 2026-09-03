import { getTranslations } from 'next-intl/server';
import { UmrahsTable } from './UmrahsTable';

export default async function ShowAllUmrahsPage() {
  const t = await getTranslations('Dashboard');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">{t('umrahs')}</h1>
      </div>
      <div className="mt-8">
        <UmrahsTable />
      </div>
    </div>
  );
}
