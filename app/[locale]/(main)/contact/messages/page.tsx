import { useTranslations } from 'next-intl';
import { ClientMessagesTable } from '@/features/client-messages/components/ClientMessagesTable';

export default function ClientMessagesPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('client_messages_page')}</h1>
        </div>
      </div>

      <ClientMessagesTable />
    </div>
  );
}
