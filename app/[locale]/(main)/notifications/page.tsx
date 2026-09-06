import { useTranslations } from 'next-intl';
import { NotificationsTable } from '@/features/notifications/components/NotificationsTable';

export default function NotificationsPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('notifications_page')}</h1>
        </div>
      </div>

      <NotificationsTable />
    </div>
  );
}
