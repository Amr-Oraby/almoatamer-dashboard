import { PageContainer } from "@/components/layout/PageContainer";
import { useTranslations } from 'next-intl';
import { ClientMessagesTable } from '@/features/client-messages/components/ClientMessagesTable';
import { PermissionGuard } from '@/components/permissions-provider';

export default function ClientMessagesPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <PermissionGuard permission="index-client-messages">
      <PageContainer>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('contact_messages_page')}</h1>
        </div>
      </div>

      <ClientMessagesTable />
    </PageContainer>
    </PermissionGuard>
  );
}
