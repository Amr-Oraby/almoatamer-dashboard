import { useTranslations } from 'next-intl';

export default function ReservationTimesPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{t('reservation_times_page')}</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        This is the reservation times management page.
      </p>
    </div>
  );
}
