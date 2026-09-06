import { useTranslations } from 'next-intl';
import { TransactionsTable } from '@/features/transactions/components/TransactionsTable';

export default function TransactionsPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('transactions_page')}</h1>
        </div>
      </div>

      <TransactionsTable />
    </div>
  );
}
