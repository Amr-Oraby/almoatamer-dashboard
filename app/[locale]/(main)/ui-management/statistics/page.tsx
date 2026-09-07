import { useTranslations } from 'next-intl';
import { StatisticsForm } from '@/features/statistics/components/StatisticsForm';

export default function StatisticsPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <div className="flex-1 w-full p-4 md:p-8 h-full bg-gray-50/50 dark:bg-zinc-900/50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {t('statistics_ui_title', { fallback: 'Statistics UI Management' })}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            {t('statistics_ui_subtitle', { fallback: 'Update your website\'s main statistics and counters.' })}
          </p>
        </div>
        
        <StatisticsForm />
      </div>
    </div>
  );
}
