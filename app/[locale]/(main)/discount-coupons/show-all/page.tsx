import { PageContainer } from "@/components/layout/PageContainer";
import { useTranslations } from 'next-intl';
import { CouponsTable } from '@/features/coupons/components/CouponsTable';
import { CreateCouponModal } from '@/features/coupons/components/CreateCouponModal';

export default function CouponsPage() {
  const t = useTranslations('Dashboard');

  return (
    <PageContainer>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{t('coupons_page')}</h1>
        </div>
        <CreateCouponModal />
      </div>

      <CouponsTable />
    </PageContainer>
  );
}
