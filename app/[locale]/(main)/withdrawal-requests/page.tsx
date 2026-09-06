import { useTranslations } from 'next-intl';
import { WithdrawalRequestsTable } from '@/features/withdrawal-requests/components/WithdrawalRequestsTable';

export default function WithdrawalRequestsPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('withdrawal_requests_page')}</h1>
        </div>
      </div>

      <WithdrawalRequestsTable />
    </div>
  );
}
