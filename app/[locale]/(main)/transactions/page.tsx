import { PageContainer } from "@/components/layout/PageContainer";
import { useTranslations } from 'next-intl';
import { TransactionsTable } from '@/features/transactions/components/TransactionsTable';
import { PermissionGuard } from '@/components/permissions-provider';

export default function TransactionsPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <PermissionGuard permission="index-transactions">
      <PageContainer>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('transactions_page')}</h1>
        </div>
      </div>

      <TransactionsTable />
    </PageContainer>
    </PermissionGuard>
  );
}
