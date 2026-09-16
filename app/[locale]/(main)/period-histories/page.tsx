import { useTranslations } from 'next-intl';
import { PeriodHistoriesTable } from '@/features/period-histories/components/PeriodHistoriesTable';


export default function PeriodHistoriesPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{t('period_histories', { fallback: "سجل الفترات" })}</h1>
          </div>
        </div>

        <PeriodHistoriesTable />
    </div>
  );
}
