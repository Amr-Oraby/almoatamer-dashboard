import { getTranslations } from 'next-intl/server';
import { UpdateCouponForm } from '@/features/coupons/components/UpdateCouponForm';

interface UpdateCouponPageProps {
  params: Promise<{ id: string }>;
}

export default async function UpdateCouponPage({ params }: UpdateCouponPageProps) {
  const { id } = await params;
  const t = await getTranslations('Coupons');

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{t('update')}</h1>
      </div>
      <UpdateCouponForm couponId={id} />
    </div>
  );
}
