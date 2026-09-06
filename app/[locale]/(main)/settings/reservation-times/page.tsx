import { useTranslations } from 'next-intl';
import { EndpointBadge } from '@/components/ui/endpoint-badge';

export default function ReservationTimesPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{t('reservation_times_page')}</h1>
      <EndpointBadge>timing</EndpointBadge>
      <EndpointBadge>period-histories</EndpointBadge>
      <p className="text-zinc-600 dark:text-zinc-400">
        This is the reservation times management page.
      </p>
      <p className="text-sm font-medium text-blue-600 mt-2">
        Text changer
      </p>
    </div>
  );
}
