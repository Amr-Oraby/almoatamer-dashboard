import { useTranslations } from 'next-intl';
import { TimingTable } from '@/features/timing/components/TimingTable';

export default function ReservationTimesPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{t('reservation_times_page') || 'Reservation Times'}</h1>
      <TimingTable />
    </div>
  );
}
