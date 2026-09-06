import { useTranslations } from 'next-intl';
import { ReferralLinksTable } from '@/features/referral-links/components/ReferralLinksTable';

export default function ReferralLinksPage() {
  const t = useTranslations('Dashboard');
  
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('referral_links_page')}</h1>
        </div>
      </div>

      <ReferralLinksTable />
    </div>
  );
}
